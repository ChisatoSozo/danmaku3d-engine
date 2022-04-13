varying vec3 vPositionW;
varying vec3 vNormalW;
uniform vec3 cameraPosition;
uniform float alpha;

void main() {

    vec3 color = vec3(1., 1., 1.);
    vec3 toColor = vec3(1., 0., 0.);

    vec3 vNormalW2 = vNormalW;

    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    float fresnelTerm = dot(viewDirectionW, vNormalW2);
    fresnelTerm = clamp(1. - fresnelTerm, 0., 1.0);

    color = mix(color, toColor, fresnelTerm);

    gl_FragColor = vec4(color, alpha);
}
