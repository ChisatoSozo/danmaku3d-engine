import { Effect } from "@babylonjs/core";
import { glsl } from "../../utils/BabylonUtils";

console.log("loaded");

export const MAX_VALUES_PER_FRAME = 16;

Effect.ShadersStore["WFVRlinearBehaviourPositionPixelShader"] = glsl`
    uniform float delta;
    uniform float minZ;
    uniform float maxZ;
    uniform vec2 resolution;
    uniform sampler2D selfSampler;
    uniform sampler2D velocitySampler;

    uniform float setValues;
    uniform float setValuesFloats[${MAX_VALUES_PER_FRAME * 3}];
    uniform float setValuesStart;
    uniform float setValuesLength;

    void main()	{
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float id = (gl_FragCoord.x - 0.5) + ((gl_FragCoord.y - 0.5) * resolution.x);

        vec4 position = texture2D( selfSampler, uv );
        vec4 velocity = texture2D( velocitySampler, uv );

        vec4 outPosition =  vec4(position.xyz + (velocity.xyz * delta), position.w + delta);

        if(setValues > 0.0 && id >= setValuesStart && id < setValuesStart + setValuesLength) {
            int startIndex = int(id - setValuesStart) * 3;
            outPosition = vec4(setValuesFloats[startIndex], setValuesFloats[startIndex + 1], setValuesFloats[startIndex + 2], 0.);
        }

        if(outPosition.z < minZ) {
            outPosition.z += maxZ - minZ;
        }
        
        gl_FragColor = outPosition;
    }
`;

const makeVelocityPixelShader = (velocityModifier: string, uniforms = ""): string => glsl`
    uniform float delta;
    uniform vec2 resolution;
    uniform sampler2D positionSampler;
    uniform sampler2D selfSampler;
    uniform vec3 gravity;

    ${uniforms}
    
    uniform float setValues;
    uniform float setValuesFloats[${MAX_VALUES_PER_FRAME * 3}];
    uniform float setValuesStart;
    uniform float setValuesLength;

    void main()	{
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float id = (gl_FragCoord.x - 0.5) + ((gl_FragCoord.y - 0.5) * resolution.x);

        vec4 position = texture2D( positionSampler, uv );
        vec4 velocity = texture2D( selfSampler, uv );

        ${velocityModifier}
        outVelocity = outVelocity + vec4(gravity * delta, 0.);

        if(setValues > 0.0 && id >= setValuesStart && id < setValuesStart + setValuesLength) {
            int startIndex = int(id - setValuesStart) * 3;
            outVelocity = vec4(setValuesFloats[startIndex], setValuesFloats[startIndex + 1], setValuesFloats[startIndex + 2], 0.);
        }
        
        gl_FragColor = outVelocity;
    }
`;

Effect.ShadersStore["WFVRlinearBehaviourVelocityPixelShader"] = makeVelocityPixelShader(glsl`
    vec4 outVelocity =  velocity;
`);

Effect.ShadersStore["WFVRtargetBehaviourVelocityPixelShader"] = makeVelocityPixelShader(
    glsl`
    vec3 newVelocity = velocity.xyz;

    vec3 target = texture2D(targetSampler, uv).xyz;
    vec3 direction = normalize(target - position.xyz);
    float dPosition = length(target - position.xyz);

    float drag = clamp(1./(dPosition + 0.000000000000000001), .4, 10000.);

    float multiplier = 1.0 - drag * delta;
    multiplier = clamp(multiplier, 0.0, 1.0);
    newVelocity = newVelocity * multiplier;

    newVelocity = newVelocity + (direction * delta * 1.0);

    vec4 outVelocity =  vec4(dPosition > 0.0000000000000000001 ? newVelocity : vec3(0., 0., 0.), velocity.w);
`,
    glsl`
    uniform sampler2D targetSampler;
`
);

Effect.ShadersStore.particleFragmentShader = glsl`
    precision highp float;
    varying vec2 vUV;
    varying vec4 vPosition;
    varying float lifeLeft;
    varying float instance;
    uniform sampler2D textureSampler;
    uniform vec3 color;
    uniform float time;

    // A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.
    uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
    }



    // Compound versions of the hashing algorithm I whipped together.
    uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
    uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
    uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }



    // Construct a float with half-open range [0:1] using low 23 bits.
    // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
    float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32

        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0

        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
    }



    // Pseudo-random value in half-open range [0:1].
    float random( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }

    void main(void) {
        float x = vUV.x * 2.0 - 1.0;
        float y = vUV.y * 2.0 - 1.0;

        float alpha = float(vPosition.x > -100000.) * (1.0 - (x * x + y * y));
        alpha = clamp(alpha, 0.0, 1.0);
        float cLifeLeft = clamp(lifeLeft, 0.0, 1.0);
        vec4 colorOut = texture2D(textureSampler, vUV);
        colorOut.a *= cLifeLeft * float(vPosition.x > -100000.) * ((sin(time*2. + instance)/2.0) + 0.5);
        colorOut.rgb *= color * 1.2;
        gl_FragColor = colorOut;
    }
`;

Effect.ShadersStore.particleVertexShader = glsl`    
    #include<instancesDeclaration>
    // Attributes
    attribute vec3 position;
    attribute vec2 uv;
    // Uniforms
    uniform sampler2D positionSampler;
    uniform sampler2D maxLifespansSampler;
    uniform mat4 worldViewProjection;
    uniform mat4 view;

    uniform float maxSize;
    uniform float minSize;
    uniform float minLifespan;
    uniform float maxLifespan;

    // Varying
    varying vec2 vUV;
    varying vec4 vPosition;
    varying float instance;
    varying float lifeLeft;

    void makeRotation(in vec3 direction, out mat3 rotation)
    {
        vec3 xaxis = cross(vec3(0., 1., 0.), direction);
        xaxis = normalize(xaxis);

        vec3 yaxis = cross(direction, xaxis);
        yaxis = normalize(yaxis);

        rotation = mat3(xaxis, yaxis, direction);
    }

    // A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.
    uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
    }


    float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
    
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
    
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
    }

    float random( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }

    float randomRange( float seed, float minNum, float maxNum ) { 
        return random( seed ) * ( maxNum - minNum ) + minNum;
    }

    void main(void) {
        int instance_i = gl_InstanceID;
        instance = float(instance_i);
        int width = textureSize(positionSampler, 0).x;
        int x = instance_i % width;
        int y = instance_i / width;                            // integer division
        float u = (float(x) + 0.5) / float(width);           // map into 0-1 range
        float v = (float(y) + 0.5) / float(width);
        vec4 instPos = texture(positionSampler, vec2(u, v));

        float maxLife = randomRange(instance, minLifespan, maxLifespan + 0.000000000000000001);
        float size = randomRange(instance, minSize, maxSize + 0.000000000000000001);

        vec4 outPosition = worldViewProjection * vec4(position * size + instPos.xyz, 1.0);
        gl_Position = outPosition;
        vPosition = outPosition;
        lifeLeft = float(maxLifespan > 0.) * (maxLife - instPos.w) + float(maxLifespan < 0.) * 10.;
        vUV = uv;
    }
`;
