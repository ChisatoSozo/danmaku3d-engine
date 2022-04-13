import { Matrix, Mesh, Quaternion, TransformNode, Vector3 } from "@babylonjs/core";
import { MAX_BOMBS, MAX_BULLETS_PER_GROUP } from "./EngineConstants";

export const glsl = (template: TemplateStringsArray, ...args: (string | number)[]) => {
    let str = "";
    for (let i = 0; i < args.length; i++) {
        str += template[i] + String(args[i]);
    }
    return str + template[template.length - 1];
};

type PixelShaderType = "position" | "velocity";

const uniforms = glsl`
    uniform vec2 resolution;
    uniform float delta;
    uniform float timeSinceStart;
    uniform float warningTime;  
    uniform sampler2D positionSampler;
    uniform sampler2D velocitySampler;
    uniform sampler2D collisionSampler;
    uniform sampler2D initialPositionSampler;
    uniform sampler2D initialVelocitySampler;
    uniform sampler2D timingsSampler;
    uniform sampler2D endTimingsSampler;

    uniform float bulletRadius;
    uniform float bombPositions[${MAX_BOMBS * 3}];
    uniform float bombRadii[${MAX_BOMBS}];
    uniform vec3 bulletTypePack1;
    uniform vec3 bulletTypePack2;
    uniform vec3 playerPosition;
    uniform vec3 arenaMin;
    uniform vec3 arenaMax;
`;

export const constructPixelShader = (main: string, type: PixelShaderType) => {
    return glsl`
    ${uniforms}
    void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float id = (gl_FragCoord.x - 0.5) + ((gl_FragCoord.y - 0.5) * resolution.x);
        vec4 timingPosition = texture2D( timingsSampler, uv );
        
        vec3 initialPosition = texture2D( initialPositionSampler, uv ).xyz;
        vec3 position = texture2D( positionSampler, uv ).xyz;
        vec4 initialVelocity = texture2D( initialVelocitySampler, uv );
        vec4 currentVelocity = texture2D( velocitySampler, uv );
        
        vec4 collision = texture2D( collisionSampler, uv );
        float timing = timingPosition.w;
        mat4 parentRotationMatrix = (mat4(1.0) * (1.0 - rotationFromParent)) + (parentRotation * rotationFromParent);
        initialPosition = initialPosition * mat3(parentRotationMatrix) + translationFromParent * parentPosition;
        initialVelocity = initialVelocity * parentRotationMatrix;
        float dTiming = timeSinceStart - timing;
        float shouldAssignInitialStates = float(dTiming > 0.) * (1. - currentVelocity.w);
        float shouldPositionReset = float(dTiming > 0. && dTiming < warningTime) * float(parentPosition != vec3(0.,0.,0.));
        position = mix(position, initialPosition, shouldPositionReset);
        currentVelocity = mix(currentVelocity, initialVelocity, shouldAssignInitialStates);
        vec3 velocity = currentVelocity.xyz;
        float velocityW = currentVelocity.w;
        vec3 startPosition = position;
        vec3 startVelocity = velocity;
        vec3 updatedValue = vec3(1.0, 1.0, 1.0);

        ${main}

        ${
            type === "position"
                ? glsl`
            float collidedWithAnything = clamp(collision.w, 0.0, 1.0);
            float noCollision = 1. - collidedWithAnything;
            updatedValue = (collidedWithAnything * vec3(-510., -510., -510.)) + (noCollision * updatedValue);

            gl_FragColor = vec4(updatedValue, 1.0);
        `
                : glsl`
            gl_FragColor = vec4(updatedValue, velocityW);
        `
        }
        
    }
`;
};

const getLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};

const bufferMatricesPreCompute = new Float32Array(MAX_BULLETS_PER_GROUP * 16);

export const makeInstances = (mesh: Mesh, num: number) => {
    if (num > MAX_BULLETS_PER_GROUP)
        throw new Error("MAX_BULLETS_PER_GROUP is " + MAX_BULLETS_PER_GROUP + " You have " + num);
    mesh.thinInstanceSetBuffer("matrix", bufferMatricesPreCompute.slice(0, num * 16), 16, true);
};

export const findMeshChild = (node: TransformNode) => {
    const meshes = node.getChildMeshes();
    return meshes.length > 0 ? (meshes[0] as Mesh) : undefined;
};

export const textOnCtx = (
    ctx: CanvasRenderingContext2D,
    text: string,
    size: number,
    x: number,
    y: number,
    fill = "white",
    stroke = "black",
    strokeWidth = 8,
    centered = false
) => {
    ctx.font = `${size * ctx.canvas.height}px tuhu`;
    ctx.textAlign = centered ? "center" : "left";

    const lines = centered ? [text] : getLines(ctx, text, (1 - x * 2) * ctx.canvas.width);

    lines.forEach((line, i) => {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(line, x * ctx.canvas.width, y * ctx.canvas.height + i * (size * ctx.canvas.height * 1.1));

        ctx.fillStyle = fill;
        ctx.fillText(line, x * ctx.canvas.width, y * ctx.canvas.height + i * (size * ctx.canvas.height * 1.1));
    });
};

export const arcOnCtx = (ctx: CanvasRenderingContext2D, from: number, to: number, color = "#FF0000") => {
    ctx.beginPath();
    ctx.arc(
        ctx.canvas.width / 2,
        ctx.canvas.height / 2,
        ctx.canvas.width / 4,
        (Math.PI * 3) / 2 + Math.PI * 2 * from,
        (Math.PI * 3) / 2 + Math.PI * 2 * to
    );
    ctx.strokeStyle = color;
    ctx.stroke();
};

export const rotateVector = (vec: Vector3, yaw = 0, pitch = 0, roll = 0) => {
    const rotationQuaternion = Quaternion.RotationYawPitchRoll(yaw, pitch, roll);
    const rotationMatrix = new Matrix();
    rotationQuaternion.toRotationMatrix(rotationMatrix);
    return Vector3.TransformCoordinates(vec, rotationMatrix);
};

export const getRotationMatrix = (transformNode: TransformNode) => {
    const quaternion = transformNode.rotationQuaternion;
    const result = new Matrix();
    if (!quaternion) {
        throw new Error("No rotation quaternion found");
    }
    quaternion.toRotationMatrix(result);
    return result;
};

export const clampVectorInPlace = (vec: Vector3, min: Vector3, max: Vector3, padding = 0) => {
    vec.x = Math.max(min.x + padding, Math.min(max.x - padding, vec.x));
    vec.y = Math.max(min.y + padding, Math.min(max.y - padding, vec.y));
    vec.z = Math.max(min.z + padding, Math.min(max.z - padding, vec.z));
};
