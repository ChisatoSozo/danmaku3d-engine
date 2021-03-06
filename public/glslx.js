/*eslint-disable*/

(function () {
    var ch =
        Object.create ||
        function (a) {
            return { __proto__: a };
        };
    function rh(a, b) {
        (a.prototype = ch(b.prototype)), (a.prototype.constructor = a);
    }
    var sh =
        Math.imul ||
        function (a, b) {
            return (((a * (b >>> 16)) << 16) + a * (b & 65535)) | 0;
        };
    var Ze;
    function th(a) {
        return typeof a === "string";
    }
    function uh(a) {
        return a === null ? a : a + "";
    }
    function We(c, a, b) {
        return (c.a = a), (c.b = b), (c.c = a.length), c;
    }
    function Xe(c) {
        if (c.b >= c.c) return -1;
        var a = c.a.charCodeAt(((c.b = (c.b + 1) | 0) - 1) | 0);
        if ((a & 64512) ^ 55296) return a;
        if (c.b >= c.c) return -1;
        var b = c.a.charCodeAt(((c.b = (c.b + 1) | 0) - 1) | 0);
        return ((((a << 10) + b) | 0) - 56613888) | 0;
    }
    function tc(a) {
        return (a.c = (a.c + 1) | 0), a.c;
    }
    function Sc(v, a) {
        switch (a) {
            case 0:
                var b = {};
                return (
                    Array.from(v.b.keys()).forEach(function (c) {
                        b[c] = v.b.get(c);
                    }),
                    JSON.stringify(
                        {
                            shaders: v.a
                                ? v.a.map(function (d) {
                                      return { name: d.a, contents: d.b };
                                  })
                                : null,
                            renaming: b,
                        },
                        null,
                        2
                    ) + "\n"
                );
            case 1:
                if (v.a) {
                    for (var e = "", q = 0, E = v.a, F = E.length; q < F; q = (q + 1) | 0) {
                        var f = E[q];
                        e +=
                            "export const GLSLX_SOURCE_" +
                            f.a.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                            " = " +
                            JSON.stringify(f.b) +
                            "\n";
                    }
                    if (v.b && Array.from(v.b.keys()).length) {
                        e += "\n";
                        for (var H = 0, O = Array.from(v.b.keys()), ha = O.length; H < ha; H = (H + 1) | 0) {
                            var h = O[H];
                            e +=
                                "export const GLSLX_NAME_" +
                                h.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                                " = " +
                                JSON.stringify(v.b.get(h)) +
                                "\n";
                        }
                    }
                    return e;
                }
                break;
            case 2:
                if (v.a) {
                    var m = "";
                    (m += "#ifndef GLSLX_STRINGS_H\n"), (m += "#define GLSLX_STRINGS_H\n"), (m += "\n");
                    for (var L = 0, ia = v.a, Z = ia.length; L < Z; L = (L + 1) | 0) {
                        var l = ia[L];
                        m +=
                            "static const char *GLSLX_SOURCE_" +
                            l.a.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                            " = " +
                            JSON.stringify(l.b) +
                            ";\n";
                    }
                    if (((m += "\n"), v.b)) {
                        for (var $ = 0, ca = Array.from(v.b.keys()), ua = ca.length; $ < ua; $ = ($ + 1) | 0) {
                            var g = ca[$];
                            m +=
                                "static const char *GLSLX_NAME_" +
                                g.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                                " = " +
                                JSON.stringify(v.b.get(g)) +
                                ";\n";
                        }
                        m += "\n";
                    }
                    return (m += "#endif\n"), m;
                }
                break;
            case 3:
                if (v.a) {
                    for (var i = "", aa = 0, ka = v.a, va = ka.length; aa < va; aa = (aa + 1) | 0) {
                        var n = ka[aa];
                        i +=
                            "const GLSLX_SOURCE_" +
                            n.a.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                            " = " +
                            JSON.stringify(n.b) +
                            "\n";
                    }
                    if (v.b && Array.from(v.b.keys()).length) {
                        i += "\n";
                        for (var Ua = 0, la = Array.from(v.b.keys()), rb = la.length; Ua < rb; Ua = (Ua + 1) | 0) {
                            var k = la[Ua];
                            i +=
                                "const GLSLX_NAME_" +
                                k.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                                " = " +
                                JSON.stringify(v.b.get(k)) +
                                "\n";
                        }
                    }
                    return i;
                }
                break;
            case 4:
                if (v.a) {
                    for (var p = "", La = 0, Va = v.a, wa = Va.length; La < wa; La = (La + 1) | 0) {
                        var t = Va[La];
                        p +=
                            "pub static GLSLX_SOURCE_" +
                            t.a.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                            ": &str = " +
                            JSON.stringify(t.b) +
                            ";\n";
                    }
                    if (v.b && Array.from(v.b.keys()).length) {
                        p += "\n";
                        for (var xa = 0, eb = Array.from(v.b.keys()), Ia = eb.length; xa < Ia; xa = (xa + 1) | 0) {
                            var w = eb[xa];
                            p +=
                                "pub static GLSLX_NAME_" +
                                w.replace(new RegExp("([a-z0-9])([A-Z])", "g"), "$1_$2").toUpperCase() +
                                ": &str = " +
                                JSON.stringify(v.b.get(w)) +
                                ";\n";
                        }
                    }
                    return p;
                }
                break;
        }
        return null;
    }
    function af(a, b, c) {
        if (a.d) return null;
        b.unshift(
            new Zh(
                "<api>",
                "\nimport {\n  // The variable `gl_Position` is available only in the vertex language and is intended for writing the\n  // homogeneous vertex position. This value will be used by primitive assembly, clipping, culling, and other\n  // fixed functionality operations that operate on primitives after vertex processing has occurred.\n  //\n  // All executions of a well-formed vertex shader should write a value into this variable. It can be\n  // written at any time during shader execution. It may also be read back by the shader after being written.\n  // Compilers may generate a diagnostic message if they detect `gl_Position` is not written, or read before\n  // being written, but not all such cases are detectable. The value of `gl_Position` is undefined if a vertex\n  // shader is executed and does not write `gl_Position`.\n  highp vec4 gl_Position;\n\n  // The variable `gl_PointSize` is available only in the vertex language and is intended for\n  // a vertex shader to write the size of the point to be rasterized. It is measured in pixels.\n  mediump float gl_PointSize;\n\n  const int gl_MaxVertexAttribs;\n  const int gl_MaxVertexUniformVectors;\n  const int gl_MaxVaryingVectors;\n  const int gl_MaxVertexTextureImageUnits;\n  const int gl_MaxCombinedTextureImageUnits;\n  const int gl_MaxTextureImageUnits;\n  const int gl_MaxFragmentUniformVectors;\n  const int gl_MaxDrawBuffers;\n\n  // The fragment shader has access to the read-only built-in variable `gl_FrontFacing` whose value is `true` if\n  // the fragment belongs to a front-facing primitive. One use of this is to emulate two-sided lighting by\n  // selecting one of two colors calculated by the vertex shader.\n  const bool gl_FrontFacing;\n\n  // The fragment shader has access to the read-only built-in variable `gl_PointCoord`. The values in\n  // `gl_PointCoord` are two-dimensional coordinates indicating where within a point primitive the current\n  // fragment is located. They range from 0.0 to 1.0 across the point. If the current primitive is not a\n  // point, then the values read from `gl_PointCoord` are undefined.\n  const mediump vec2 gl_PointCoord;\n\n  // The variable `gl_FragCoord` is available as a read-only variable from within fragment shaders and it holds\n  // the window relative coordinates `x`, `y`, `z`, and `1/w` values for the fragment. This value is the result\n  // of the fixed functionality that interpolates primitives after vertex processing to generate fragments. The `z`\n  // component is the depth value that will be used for the fragment's depth.\n  const mediump vec4 gl_FragCoord;\n\n  // Writing to `gl_FragColor` specifies the fragment color that will be used by the subsequent fixed\n  // functionality pipeline.\n  //\n  // If subsequent fixed functionality consumes fragment color and an execution of a fragment shader\n  // does not write a value to `gl_FragColor` then the fragment color consumed is undefined.\n  mediump vec4 gl_FragColor;\n\n  // The variable `gl_FragData` is an array. Writing to `gl_FragData[n]` specifies the fragment data that will be\n  // used by the subsequent fixed functionality pipeline for data `n`.\n  //\n  // If subsequent fixed functionality consumes fragment data and an execution of a fragment shader does not write\n  // a value to it, then the fragment data consumed is undefined.\n  mediump vec4 gl_FragData[gl_MaxDrawBuffers];\n\n  // Depth range in window coordinates\n  struct gl_DepthRangeParameters {\n    float near;\n    float far;\n    // Equal to `far - near`\n    float diff;\n  };\n\n  uniform gl_DepthRangeParameters gl_DepthRange;\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Angle and Trigonometry Functions\n\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  float radians(float degrees);\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  vec2 radians(vec2 degrees);\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  vec3 radians(vec3 degrees);\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  vec4 radians(vec4 degrees);\n\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  float degrees(float radians);\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  vec2 degrees(vec2 radians);\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  vec3 degrees(vec3 radians);\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  vec4 degrees(vec4 radians);\n\n  // The standard trigonometric sine function.\n  float sin(float angle);\n  // The standard trigonometric sine function.\n  vec2 sin(vec2 angle);\n  // The standard trigonometric sine function.\n  vec3 sin(vec3 angle);\n  // The standard trigonometric sine function.\n  vec4 sin(vec4 angle);\n\n  // The standard trigonometric cosine function.\n  float cos(float angle);\n  // The standard trigonometric cosine function.\n  vec2 cos(vec2 angle);\n  // The standard trigonometric cosine function.\n  vec3 cos(vec3 angle);\n  // The standard trigonometric cosine function.\n  vec4 cos(vec4 angle);\n\n  // The standard trigonometric tangent.\n  float tan(float angle);\n  // The standard trigonometric tangent.\n  vec2 tan(vec2 angle);\n  // The standard trigonometric tangent.\n  vec3 tan(vec3 angle);\n  // The standard trigonometric tangent.\n  vec4 tan(vec4 angle);\n\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  float asin(float x);\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  vec2 asin(vec2 x);\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  vec3 asin(vec3 x);\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  vec4 asin(vec4 x);\n\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  float acos(float x);\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  vec2 acos(vec2 x);\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  vec3 acos(vec3 x);\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  vec4 acos(vec4 x);\n\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  float atan(float y, float x);\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  vec2 atan(vec2 y, vec2 x);\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  vec3 atan(vec3 y, vec3 x);\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  vec4 atan(vec4 y, vec4 x);\n\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  float atan(float y_over_x);\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  vec2 atan(vec2 y_over_x);\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  vec3 atan(vec3 y_over_x);\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  vec4 atan(vec4 y_over_x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Exponential Functions\n\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  float pow(float x, float y);\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  vec2 pow(vec2 x, vec2 y);\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  vec3 pow(vec3 x, vec3 y);\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  vec4 pow(vec4 x, vec4 y);\n\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  float exp(float x);\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  vec2 exp(vec2 x);\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  vec3 exp(vec3 x);\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  vec4 exp(vec4 x);\n\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  float log(float x);\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  vec2 log(vec2 x);\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  vec3 log(vec3 x);\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  vec4 log(vec4 x);\n\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  float exp2(float x);\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  vec2 exp2(vec2 x);\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  vec3 exp2(vec3 x);\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  vec4 exp2(vec4 x);\n\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  float log2(float x);\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  vec2 log2(vec2 x);\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  vec3 log2(vec3 x);\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  vec4 log2(vec4 x);\n\n  // Returns `???x`. Results are undefined if `x < 0`.\n  float sqrt(float x);\n  // Returns `???x`. Results are undefined if `x < 0`.\n  vec2 sqrt(vec2 x);\n  // Returns `???x`. Results are undefined if `x < 0`.\n  vec3 sqrt(vec3 x);\n  // Returns `???x`. Results are undefined if `x < 0`.\n  vec4 sqrt(vec4 x);\n\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  float inversesqrt(float x);\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  vec2 inversesqrt(vec2 x);\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  vec3 inversesqrt(vec3 x);\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  vec4 inversesqrt(vec4 x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Common Functions\n\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  float abs(float x);\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  vec2 abs(vec2 x);\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  vec3 abs(vec3 x);\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  vec4 abs(vec4 x);\n\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  float sign(float x);\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  vec2 sign(vec2 x);\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  vec3 sign(vec3 x);\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  vec4 sign(vec4 x);\n\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  float floor(float x);\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  vec2 floor(vec2 x);\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  vec3 floor(vec3 x);\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  vec4 floor(vec4 x);\n\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  float ceil(float x);\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  vec2 ceil(vec2 x);\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  vec3 ceil(vec3 x);\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  vec4 ceil(vec4 x);\n\n  // Returns `x - floor(x)`\n  float fract(float x);\n  // Returns `x - floor(x)`\n  vec2 fract(vec2 x);\n  // Returns `x - floor(x)`\n  vec3 fract(vec3 x);\n  // Returns `x - floor(x)`\n  vec4 fract(vec4 x);\n\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  float mod(float x, float y);\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  vec2 mod(vec2 x, float y);\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  vec3 mod(vec3 x, float y);\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  vec4 mod(vec4 x, float y);\n\n  // Modulus. Returns `x - y * floor(x/y)`\n  vec2 mod(vec2 x, vec2 y);\n  // Modulus. Returns `x - y * floor(x/y)`\n  vec3 mod(vec3 x, vec3 y);\n  // Modulus. Returns `x - y * floor(x/y)`\n  vec4 mod(vec4 x, vec4 y);\n\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  float min(float x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec2 min(vec2 x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec2 min(vec2 x, vec2 y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec3 min(vec3 x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec3 min(vec3 x, vec3 y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec4 min(vec4 x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec4 min(vec4 x, vec4 y);\n\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  float max(float x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec2 max(vec2 x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec2 max(vec2 x, vec2 y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec3 max(vec3 x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec3 max(vec3 x, vec3 y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec4 max(vec4 x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec4 max(vec4 x, vec4 y);\n\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  float clamp(float x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec2 clamp(vec2 x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec3 clamp(vec3 x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec4 clamp(vec4 x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal);\n\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  float mix(float x, float y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec2 mix(vec2 x, vec2 y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec2 mix(vec2 x, vec2 y, vec2 a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec3 mix(vec3 x, vec3 y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec3 mix(vec3 x, vec3 y, vec3 a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec4 mix(vec4 x, vec4 y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec4 mix(vec4 x, vec4 y, vec4 a);\n\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  float step(float edge, float x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec2 step(float edge, vec2 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec2 step(vec2 edge, vec2 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec3 step(float edge, vec3 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec3 step(vec3 edge, vec3 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec4 step(float edge, vec4 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec4 step(vec4 edge, vec4 x);\n\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  float smoothstep(float edge0, float edge1, float x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec2 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec2 smoothstep(float edge0, float edge1, vec2 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec2 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec3 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec3 smoothstep(float edge0, float edge1, vec3 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec3 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec4 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec4 smoothstep(float edge0, float edge1, vec4 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec4 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Geometric Functions\n\n  // Returns the length of vector `x`, i.e. `???x??`\n  float length(float x);\n  // Returns the length of vector `x`, i.e. `???x[0]?? + x[1]??`\n  float length(vec2 x);\n  // Returns the length of vector `x`, i.e. `???x[0]?? + x[1]?? + x[2]??`\n  float length(vec3 x);\n  // Returns the length of vector `x`, i.e. `???x[0]?? + x[1]?? + x[2]?? + x[3]??`\n  float length(vec4 x);\n\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(float p0, float p1);\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(vec2 p0, vec2 p1);\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(vec3 p0, vec3 p1);\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(vec4 p0, vec4 p1);\n\n  // Returns the dot product of `x` and `y`, i.e. `x*y`\n  float dot(float x, float y);\n  // Returns the dot product of `x` and `y`, i.e. `x[0]*y[0] + x[1]*y[1]`\n  float dot(vec2 x, vec2 y);\n  // Returns the dot product of `x` and `y`, i.e. `x[0]*y[0] + x[1]*y[1] + x[2]*y[2]`\n  float dot(vec3 x, vec3 y);\n  // Returns the dot product of `x` and `y`, i.e. `x[0]*y[0] + x[1]*y[1] + x[2]*y[2] + x[3]*y[3]`\n  float dot(vec4 x, vec4 y);\n\n  // Returns the cross product of `x` and `y`, i.e.\n  //\n  // ```glslx\n  // vec3(\n  //   x[1]*y[2] - y[1]*x[2],\n  //   x[2]*y[0] - y[2]*x[0],\n  //   x[0]*y[1] - y[0]*x[1])\n  // ```\n  vec3 cross(vec3 x, vec3 y);\n\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  float normalize(float x);\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  vec2 normalize(vec2 x);\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  vec3 normalize(vec3 x);\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  vec4 normalize(vec4 x);\n\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  float faceforward(float N, float I, float Nref);\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  vec2 faceforward(vec2 N, vec2 I, vec2 Nref);\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  vec3 faceforward(vec3 N, vec3 I, vec3 Nref);\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  vec4 faceforward(vec4 N, vec4 I, vec4 Nref);\n\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  float reflect(float I, float N);\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  vec2 reflect(vec2 I, vec2 N);\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  vec3 reflect(vec3 I, vec3 N);\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  vec4 reflect(vec4 I, vec4 N);\n\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return float(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  float refract(float I, float N, float eta);\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return vec2(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  vec2 refract(vec2 I, vec2 N, float eta);\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return vec3(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  vec3 refract(vec3 I, vec3 N, float eta);\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return vec4(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  vec4 refract(vec4 I, vec4 N, float eta);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Matrix Functions\n\n  // Multiply matrix `x` by matrix `y` component-wise, i.e., `result[i][j]` is the scalar product of `x[i][j]` and `y[i][j]`.\n  // Note: to get linear algebraic matrix multiplication, use the multiply operator (`*`).\n  mat2 matrixCompMult(mat2 x, mat2 y);\n  // Multiply matrix `x` by matrix `y` component-wise, i.e., `result[i][j]` is the scalar product of `x[i][j]` and `y[i][j]`.\n  // Note: to get linear algebraic matrix multiplication, use the multiply operator (`*`).\n  mat3 matrixCompMult(mat3 x, mat3 y);\n  // Multiply matrix `x` by matrix `y` component-wise, i.e., `result[i][j]` is the scalar product of `x[i][j]` and `y[i][j]`.\n  // Note: to get linear algebraic matrix multiplication, use the multiply operator (`*`).\n  mat4 matrixCompMult(mat4 x, mat4 y);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Vector Relational Functions\n\n  // Returns the component-wise compare of `x < y`.\n  bvec2 lessThan(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec2 lessThan(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec3 lessThan(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec3 lessThan(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec4 lessThan(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec4 lessThan(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x <= y`.\n  bvec2 lessThanEqual(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec2 lessThanEqual(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec3 lessThanEqual(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec3 lessThanEqual(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec4 lessThanEqual(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec4 lessThanEqual(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x > y`.\n  bvec2 greaterThan(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec2 greaterThan(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec3 greaterThan(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec3 greaterThan(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec4 greaterThan(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec4 greaterThan(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x >= y`.\n  bvec2 greaterThanEqual(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec2 greaterThanEqual(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec3 greaterThanEqual(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec3 greaterThanEqual(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec4 greaterThanEqual(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec4 greaterThanEqual(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x == y`.\n  bvec2 equal(bvec2 x, bvec2 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec2 equal(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec2 equal(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec3 equal(bvec3 x, bvec3 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec3 equal(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec3 equal(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec4 equal(bvec4 x, bvec4 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec4 equal(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec4 equal(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x != y`.\n  bvec2 notEqual(bvec2 x, bvec2 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec2 notEqual(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec2 notEqual(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec3 notEqual(bvec3 x, bvec3 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec3 notEqual(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec3 notEqual(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec4 notEqual(bvec4 x, bvec4 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec4 notEqual(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec4 notEqual(vec4 x, vec4 y);\n\n  // Returns true if any component of `x` is `true`.\n  bool any(bvec2 x);\n  // Returns true if any component of `x` is `true`.\n  bool any(bvec3 x);\n  // Returns true if any component of `x` is `true`.\n  bool any(bvec4 x);\n\n  // Returns true only if all components of `x` are `true`.\n  bool all(bvec2 x);\n  // Returns true only if all components of `x` are `true`.\n  bool all(bvec3 x);\n  // Returns true only if all components of `x` are `true`.\n  bool all(bvec4 x);\n\n  // Returns the component-wise logical complement of `x`.\n  bvec2 not(bvec2 x);\n  // Returns the component-wise logical complement of `x`.\n  bvec3 not(bvec3 x);\n  // Returns the component-wise logical complement of `x`.\n  bvec4 not(bvec4 x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Texture Lookup Functions\n\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  vec4 texture2D(sampler2D sampler, vec2 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  vec4 texture2D(sampler2D sampler, vec2 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  vec4 texture2DLod(sampler2D sampler, vec2 coord, float lod);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`.\n  vec4 texture2DProj(sampler2D sampler, vec3 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`.\n  vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`.\n  vec4 texture2DProjLod(sampler2D sampler, vec3 coord, float lod);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`. The third component of `coord` is ignored.\n  vec4 texture2DProj(sampler2D sampler, vec4 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`. The third component of `coord` is ignored.\n  vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`. The third component of `coord` is ignored.\n  vec4 texture2DProjLod(sampler2D sampler, vec4 coord, float lod);\n\n  // Use the texture coordinate `coord` to do a texture lookup in the cube map texture currently bound to `sampler`.\n  // The direction of `coord` is used to select which face to do a 2-dimensional texture lookup in.\n  vec4 textureCube(samplerCube sampler, vec3 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the cube map texture currently bound to `sampler`.\n  // The direction of `coord` is used to select which face to do a 2-dimensional texture lookup in.\n  vec4 textureCube(samplerCube sampler, vec3 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the cube map texture currently bound to `sampler`.\n  // The direction of `coord` is used to select which face to do a 2-dimensional texture lookup in.\n  vec4 textureCubeLod(samplerCube sampler, vec3 coord, float lod);\n\n  #extension GL_OES_standard_derivatives {\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    float dFdx(float v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec2 dFdx(vec2 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec3 dFdx(vec3 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec4 dFdx(vec4 v);\n\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    float dFdy(float v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec2 dFdy(vec2 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec3 dFdy(vec3 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec4 dFdy(vec4 v);\n\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    float fwidth(float v);\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    vec2 fwidth(vec2 v);\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    vec3 fwidth(vec3 v);\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    vec4 fwidth(vec4 v);\n  }\n\n  #extension GL_EXT_frag_depth {\n    // Available only in the fragment language, `gl_FragDepthEXT` is an output variable that is used to establish the depth value for the current fragment.\n    // If depth buffering is enabled and no shader writes to `gl_FragDepthEXT`, then the fixed function value for depth will be used (this value is contained\n    // in the `z` component of `gl_FragCoord`) otherwise, the value written to `gl_FragDepthEXT` is used.\n    //\n    // If a shader statically assigns to `gl_FragDepthEXT`, then the value of the fragment's depth may be undefined for executions of the shader that take\n    // that path. That is, if the set of linked fragment shaders statically contain a write to `gl_FragDepthEXT`, then it is responsible for always writing it.\n    float gl_FragDepthEXT;\n  }\n\n  #extension GL_EXT_shader_texture_lod {\n    vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy);\n    vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod);\n    vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy);\n    vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy);\n    vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod);\n    vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod);\n    vec4 textureCubeGradEXT(samplerCube sampler, vec3 P, vec3 dPdx, vec3 dPdy);\n    vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod);\n  }\n}\n"
            )
        );
        for (var n = 0, k = b.length; n < k; n = (n + 1) | 0) {
            var d = b[n];
            d.c = Kc(a, d, 0);
        }
        for (
            var e = new Lh(0), f = new Xh(1, null), h = new wh(c.e), m = new Vh(a, h), l = [], p = 0, t = b.length;
            p < t;
            p = (p + 1) | 0
        ) {
            var g = b[p],
                i = jd(a, g.c, e, h, f, m);
            $e(l, i.a);
        }
        return nd(m, e), new yh(e, l);
    }
    function Id(a, b, c) {
        if (a.d) return null;
        b.unshift(
            new Zh(
                "<api>",
                "\nimport {\n  // The variable `gl_Position` is available only in the vertex language and is intended for writing the\n  // homogeneous vertex position. This value will be used by primitive assembly, clipping, culling, and other\n  // fixed functionality operations that operate on primitives after vertex processing has occurred.\n  //\n  // All executions of a well-formed vertex shader should write a value into this variable. It can be\n  // written at any time during shader execution. It may also be read back by the shader after being written.\n  // Compilers may generate a diagnostic message if they detect `gl_Position` is not written, or read before\n  // being written, but not all such cases are detectable. The value of `gl_Position` is undefined if a vertex\n  // shader is executed and does not write `gl_Position`.\n  highp vec4 gl_Position;\n\n  // The variable `gl_PointSize` is available only in the vertex language and is intended for\n  // a vertex shader to write the size of the point to be rasterized. It is measured in pixels.\n  mediump float gl_PointSize;\n\n  const int gl_MaxVertexAttribs;\n  const int gl_MaxVertexUniformVectors;\n  const int gl_MaxVaryingVectors;\n  const int gl_MaxVertexTextureImageUnits;\n  const int gl_MaxCombinedTextureImageUnits;\n  const int gl_MaxTextureImageUnits;\n  const int gl_MaxFragmentUniformVectors;\n  const int gl_MaxDrawBuffers;\n\n  // The fragment shader has access to the read-only built-in variable `gl_FrontFacing` whose value is `true` if\n  // the fragment belongs to a front-facing primitive. One use of this is to emulate two-sided lighting by\n  // selecting one of two colors calculated by the vertex shader.\n  const bool gl_FrontFacing;\n\n  // The fragment shader has access to the read-only built-in variable `gl_PointCoord`. The values in\n  // `gl_PointCoord` are two-dimensional coordinates indicating where within a point primitive the current\n  // fragment is located. They range from 0.0 to 1.0 across the point. If the current primitive is not a\n  // point, then the values read from `gl_PointCoord` are undefined.\n  const mediump vec2 gl_PointCoord;\n\n  // The variable `gl_FragCoord` is available as a read-only variable from within fragment shaders and it holds\n  // the window relative coordinates `x`, `y`, `z`, and `1/w` values for the fragment. This value is the result\n  // of the fixed functionality that interpolates primitives after vertex processing to generate fragments. The `z`\n  // component is the depth value that will be used for the fragment's depth.\n  const mediump vec4 gl_FragCoord;\n\n  // Writing to `gl_FragColor` specifies the fragment color that will be used by the subsequent fixed\n  // functionality pipeline.\n  //\n  // If subsequent fixed functionality consumes fragment color and an execution of a fragment shader\n  // does not write a value to `gl_FragColor` then the fragment color consumed is undefined.\n  mediump vec4 gl_FragColor;\n\n  // The variable `gl_FragData` is an array. Writing to `gl_FragData[n]` specifies the fragment data that will be\n  // used by the subsequent fixed functionality pipeline for data `n`.\n  //\n  // If subsequent fixed functionality consumes fragment data and an execution of a fragment shader does not write\n  // a value to it, then the fragment data consumed is undefined.\n  mediump vec4 gl_FragData[gl_MaxDrawBuffers];\n\n  // Depth range in window coordinates\n  struct gl_DepthRangeParameters {\n    float near;\n    float far;\n    // Equal to `far - near`\n    float diff;\n  };\n\n  uniform gl_DepthRangeParameters gl_DepthRange;\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Angle and Trigonometry Functions\n\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  float radians(float degrees);\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  vec2 radians(vec2 degrees);\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  vec3 radians(vec3 degrees);\n  // Converts `degrees` to radians, i.e. `?? / 180 * degrees`\n  vec4 radians(vec4 degrees);\n\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  float degrees(float radians);\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  vec2 degrees(vec2 radians);\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  vec3 degrees(vec3 radians);\n  // Converts `radians` to degrees, i.e. `180 / ?? * radians`\n  vec4 degrees(vec4 radians);\n\n  // The standard trigonometric sine function.\n  float sin(float angle);\n  // The standard trigonometric sine function.\n  vec2 sin(vec2 angle);\n  // The standard trigonometric sine function.\n  vec3 sin(vec3 angle);\n  // The standard trigonometric sine function.\n  vec4 sin(vec4 angle);\n\n  // The standard trigonometric cosine function.\n  float cos(float angle);\n  // The standard trigonometric cosine function.\n  vec2 cos(vec2 angle);\n  // The standard trigonometric cosine function.\n  vec3 cos(vec3 angle);\n  // The standard trigonometric cosine function.\n  vec4 cos(vec4 angle);\n\n  // The standard trigonometric tangent.\n  float tan(float angle);\n  // The standard trigonometric tangent.\n  vec2 tan(vec2 angle);\n  // The standard trigonometric tangent.\n  vec3 tan(vec3 angle);\n  // The standard trigonometric tangent.\n  vec4 tan(vec4 angle);\n\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  float asin(float x);\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  vec2 asin(vec2 x);\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  vec3 asin(vec3 x);\n  // Arc sine. Returns an angle whose sine is `x`. The range of values returned by this function is `[-??/2, ??/2]`. Results are undefined if `???x???>1`.\n  vec4 asin(vec4 x);\n\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  float acos(float x);\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  vec2 acos(vec2 x);\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  vec3 acos(vec3 x);\n  // Arc cosine. Returns an angle whose cosine is `x`. The range of values returned by this function is `[0, ??]`. Results are undefined if `???x???>1`.\n  vec4 acos(vec4 x);\n\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  float atan(float y, float x);\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  vec2 atan(vec2 y, vec2 x);\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  vec3 atan(vec3 y, vec3 x);\n  // Arc tangent. Returns an angle whose tangent is `y/x`. The signs of `x` and `y` are used to determine what quadrant the\n  // angle is in. The range of values returned by this function is `[?????,??]`. Results are undefined if `x` and `y` are both 0.\n  vec4 atan(vec4 y, vec4 x);\n\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  float atan(float y_over_x);\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  vec2 atan(vec2 y_over_x);\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  vec3 atan(vec3 y_over_x);\n  // Arc tangent. Returns an angle whose tangent is `y_over_x`. The range of values returned by this function is `[-??/2, ??/2]`.\n  vec4 atan(vec4 y_over_x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Exponential Functions\n\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  float pow(float x, float y);\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  vec2 pow(vec2 x, vec2 y);\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  vec3 pow(vec3 x, vec3 y);\n  // Returns `x` raised to the `y` power, i.e., `x??`. Results are undefined if `x < 0`. Results are undefined if `x = 0` and `y <= 0`.\n  vec4 pow(vec4 x, vec4 y);\n\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  float exp(float x);\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  vec2 exp(vec2 x);\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  vec3 exp(vec3 x);\n  // Returns the natural exponentiation of `x`, i.e., `e??`\n  vec4 exp(vec4 x);\n\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  float log(float x);\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  vec2 log(vec2 x);\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  vec3 log(vec3 x);\n  // Returns the natural logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = e??`. Results are undefined if `x <= 0`.\n  vec4 log(vec4 x);\n\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  float exp2(float x);\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  vec2 exp2(vec2 x);\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  vec3 exp2(vec3 x);\n  // Returns 2 raised to the `x` power, i.e., `2??`.\n  vec4 exp2(vec4 x);\n\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  float log2(float x);\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  vec2 log2(vec2 x);\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  vec3 log2(vec3 x);\n  // Returns the base 2 logarithm of `x`, i.e., returns the value `y` which satisfies the equation `x = 2??`. Results are undefined if `x <= 0`.\n  vec4 log2(vec4 x);\n\n  // Returns `???x`. Results are undefined if `x < 0`.\n  float sqrt(float x);\n  // Returns `???x`. Results are undefined if `x < 0`.\n  vec2 sqrt(vec2 x);\n  // Returns `???x`. Results are undefined if `x < 0`.\n  vec3 sqrt(vec3 x);\n  // Returns `???x`. Results are undefined if `x < 0`.\n  vec4 sqrt(vec4 x);\n\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  float inversesqrt(float x);\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  vec2 inversesqrt(vec2 x);\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  vec3 inversesqrt(vec3 x);\n  // Returns `1 / ???x`. Results are undefined if `x <= 0`.\n  vec4 inversesqrt(vec4 x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Common Functions\n\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  float abs(float x);\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  vec2 abs(vec2 x);\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  vec3 abs(vec3 x);\n  // Returns `x` if `x >= 0`, otherwise it returns `-x`.\n  vec4 abs(vec4 x);\n\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  float sign(float x);\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  vec2 sign(vec2 x);\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  vec3 sign(vec3 x);\n  // Returns `1.0` if `x > 0`, `0.0` if `x = 0`, or `-1.0` if `x < 0`\n  vec4 sign(vec4 x);\n\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  float floor(float x);\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  vec2 floor(vec2 x);\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  vec3 floor(vec3 x);\n  // Returns a value equal to the nearest integer that is less than or equal to `x`\n  vec4 floor(vec4 x);\n\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  float ceil(float x);\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  vec2 ceil(vec2 x);\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  vec3 ceil(vec3 x);\n  // Returns a value equal to the nearest integer that is greater than or equal to `x`\n  vec4 ceil(vec4 x);\n\n  // Returns `x - floor(x)`\n  float fract(float x);\n  // Returns `x - floor(x)`\n  vec2 fract(vec2 x);\n  // Returns `x - floor(x)`\n  vec3 fract(vec3 x);\n  // Returns `x - floor(x)`\n  vec4 fract(vec4 x);\n\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  float mod(float x, float y);\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  vec2 mod(vec2 x, float y);\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  vec3 mod(vec3 x, float y);\n  // Modulus (modulo). Returns `x - y * floor(x/y)`\n  vec4 mod(vec4 x, float y);\n\n  // Modulus. Returns `x - y * floor(x/y)`\n  vec2 mod(vec2 x, vec2 y);\n  // Modulus. Returns `x - y * floor(x/y)`\n  vec3 mod(vec3 x, vec3 y);\n  // Modulus. Returns `x - y * floor(x/y)`\n  vec4 mod(vec4 x, vec4 y);\n\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  float min(float x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec2 min(vec2 x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec2 min(vec2 x, vec2 y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec3 min(vec3 x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec3 min(vec3 x, vec3 y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec4 min(vec4 x, float y);\n  // Returns `y` if `y < x`, otherwise it returns `x`\n  vec4 min(vec4 x, vec4 y);\n\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  float max(float x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec2 max(vec2 x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec2 max(vec2 x, vec2 y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec3 max(vec3 x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec3 max(vec3 x, vec3 y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec4 max(vec4 x, float y);\n  // Returns `y` if `x < y`, otherwise it returns `x`\n  vec4 max(vec4 x, vec4 y);\n\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  float clamp(float x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec2 clamp(vec2 x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec3 clamp(vec3 x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec3 clamp(vec3 x, vec3 minVal, vec3 maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec4 clamp(vec4 x, float minVal, float maxVal);\n  // Returns `min(max(x, minVal), maxVal)`. Results are undefined if `minVal > maxVal`.\n  vec4 clamp(vec4 x, vec4 minVal, vec4 maxVal);\n\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  float mix(float x, float y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec2 mix(vec2 x, vec2 y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec2 mix(vec2 x, vec2 y, vec2 a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec3 mix(vec3 x, vec3 y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec3 mix(vec3 x, vec3 y, vec3 a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec4 mix(vec4 x, vec4 y, float a);\n  // Returns the linear blend of `x` and `y`, i.e. `x * (1-a) + y * a`\n  vec4 mix(vec4 x, vec4 y, vec4 a);\n\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  float step(float edge, float x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec2 step(float edge, vec2 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec2 step(vec2 edge, vec2 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec3 step(float edge, vec3 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec3 step(vec3 edge, vec3 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec4 step(float edge, vec4 x);\n  // Returns `0.0` if `x < edge`, otherwise it returns `1.0`\n  vec4 step(vec4 edge, vec4 x);\n\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  float smoothstep(float edge0, float edge1, float x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec2 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec2 smoothstep(float edge0, float edge1, vec2 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec2 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec3 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec3 smoothstep(float edge0, float edge1, vec3 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec3 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec3 smoothstep(vec3 edge0, vec3 edge1, vec3 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec4 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec4 smoothstep(float edge0, float edge1, vec4 x);\n  // Returns `0.0` if `x <= edge0` and `1.0` if `x >= edge1` and performs smooth Hermite interpolation between 0 and 1 when `edge0 < x < edge1`.\n  // This is useful in cases where you would want a threshold function with a smooth transition. This is equivalent to:\n  //\n  // ```glslx\n  // vec4 t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);\n  // return t * t * (3.0 - 2.0 * t);\n  // ```\n  //\n  // Results are undefined if `edge0 >= edge1`.\n  vec4 smoothstep(vec4 edge0, vec4 edge1, vec4 x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Geometric Functions\n\n  // Returns the length of vector `x`, i.e. `???x??`\n  float length(float x);\n  // Returns the length of vector `x`, i.e. `???x[0]?? + x[1]??`\n  float length(vec2 x);\n  // Returns the length of vector `x`, i.e. `???x[0]?? + x[1]?? + x[2]??`\n  float length(vec3 x);\n  // Returns the length of vector `x`, i.e. `???x[0]?? + x[1]?? + x[2]?? + x[3]??`\n  float length(vec4 x);\n\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(float p0, float p1);\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(vec2 p0, vec2 p1);\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(vec3 p0, vec3 p1);\n  // Returns the distance between `p0` and `p1`, i.e. `length(p0 - p1)`\n  float distance(vec4 p0, vec4 p1);\n\n  // Returns the dot product of `x` and `y`, i.e. `x*y`\n  float dot(float x, float y);\n  // Returns the dot product of `x` and `y`, i.e. `x[0]*y[0] + x[1]*y[1]`\n  float dot(vec2 x, vec2 y);\n  // Returns the dot product of `x` and `y`, i.e. `x[0]*y[0] + x[1]*y[1] + x[2]*y[2]`\n  float dot(vec3 x, vec3 y);\n  // Returns the dot product of `x` and `y`, i.e. `x[0]*y[0] + x[1]*y[1] + x[2]*y[2] + x[3]*y[3]`\n  float dot(vec4 x, vec4 y);\n\n  // Returns the cross product of `x` and `y`, i.e.\n  //\n  // ```glslx\n  // vec3(\n  //   x[1]*y[2] - y[1]*x[2],\n  //   x[2]*y[0] - y[2]*x[0],\n  //   x[0]*y[1] - y[0]*x[1])\n  // ```\n  vec3 cross(vec3 x, vec3 y);\n\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  float normalize(float x);\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  vec2 normalize(vec2 x);\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  vec3 normalize(vec3 x);\n  // Returns a vector in the same direction as `x` but with a length of 1.\n  vec4 normalize(vec4 x);\n\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  float faceforward(float N, float I, float Nref);\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  vec2 faceforward(vec2 N, vec2 I, vec2 Nref);\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  vec3 faceforward(vec3 N, vec3 I, vec3 Nref);\n  // If `dot(Nref, I) < 0` return `N`, otherwise return `-N`\n  vec4 faceforward(vec4 N, vec4 I, vec4 Nref);\n\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  float reflect(float I, float N);\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  vec2 reflect(vec2 I, vec2 N);\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  vec3 reflect(vec3 I, vec3 N);\n  // For the incident vector `I` and surface orientation `N`, returns the reflection direction: `I - 2 * dot(N, I) * N`.\n  // `N` must already be normalized in order to achieve the desired result.\n  vec4 reflect(vec4 I, vec4 N);\n\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return float(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  float refract(float I, float N, float eta);\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return vec2(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  vec2 refract(vec2 I, vec2 N, float eta);\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return vec3(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  vec3 refract(vec3 I, vec3 N, float eta);\n  // For the incident vector `I` and surface normal `N`, and the ratio of indices of refraction `eta`, return the refraction vector.\n  // The result is computed by:\n  //\n  // ```glslx\n  // float k = 1.0 - eta * eta * (1.0 - dot(N, I) * dot(N, I));\n  // if (k < 0.0) return vec4(0.0);\n  // else return eta * I - (eta * dot(N, I) + sqrt(k)) * N;\n  // ```\n  //\n  // The input parameters for the incident vector `I` and the surface normal `N`.\n  vec4 refract(vec4 I, vec4 N, float eta);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Matrix Functions\n\n  // Multiply matrix `x` by matrix `y` component-wise, i.e., `result[i][j]` is the scalar product of `x[i][j]` and `y[i][j]`.\n  // Note: to get linear algebraic matrix multiplication, use the multiply operator (`*`).\n  mat2 matrixCompMult(mat2 x, mat2 y);\n  // Multiply matrix `x` by matrix `y` component-wise, i.e., `result[i][j]` is the scalar product of `x[i][j]` and `y[i][j]`.\n  // Note: to get linear algebraic matrix multiplication, use the multiply operator (`*`).\n  mat3 matrixCompMult(mat3 x, mat3 y);\n  // Multiply matrix `x` by matrix `y` component-wise, i.e., `result[i][j]` is the scalar product of `x[i][j]` and `y[i][j]`.\n  // Note: to get linear algebraic matrix multiplication, use the multiply operator (`*`).\n  mat4 matrixCompMult(mat4 x, mat4 y);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Vector Relational Functions\n\n  // Returns the component-wise compare of `x < y`.\n  bvec2 lessThan(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec2 lessThan(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec3 lessThan(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec3 lessThan(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec4 lessThan(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x < y`.\n  bvec4 lessThan(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x <= y`.\n  bvec2 lessThanEqual(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec2 lessThanEqual(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec3 lessThanEqual(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec3 lessThanEqual(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec4 lessThanEqual(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x <= y`.\n  bvec4 lessThanEqual(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x > y`.\n  bvec2 greaterThan(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec2 greaterThan(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec3 greaterThan(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec3 greaterThan(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec4 greaterThan(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x > y`.\n  bvec4 greaterThan(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x >= y`.\n  bvec2 greaterThanEqual(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec2 greaterThanEqual(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec3 greaterThanEqual(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec3 greaterThanEqual(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec4 greaterThanEqual(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x >= y`.\n  bvec4 greaterThanEqual(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x == y`.\n  bvec2 equal(bvec2 x, bvec2 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec2 equal(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec2 equal(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec3 equal(bvec3 x, bvec3 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec3 equal(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec3 equal(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec4 equal(bvec4 x, bvec4 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec4 equal(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x == y`.\n  bvec4 equal(vec4 x, vec4 y);\n\n  // Returns the component-wise compare of `x != y`.\n  bvec2 notEqual(bvec2 x, bvec2 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec2 notEqual(ivec2 x, ivec2 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec2 notEqual(vec2 x, vec2 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec3 notEqual(bvec3 x, bvec3 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec3 notEqual(ivec3 x, ivec3 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec3 notEqual(vec3 x, vec3 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec4 notEqual(bvec4 x, bvec4 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec4 notEqual(ivec4 x, ivec4 y);\n  // Returns the component-wise compare of `x != y`.\n  bvec4 notEqual(vec4 x, vec4 y);\n\n  // Returns true if any component of `x` is `true`.\n  bool any(bvec2 x);\n  // Returns true if any component of `x` is `true`.\n  bool any(bvec3 x);\n  // Returns true if any component of `x` is `true`.\n  bool any(bvec4 x);\n\n  // Returns true only if all components of `x` are `true`.\n  bool all(bvec2 x);\n  // Returns true only if all components of `x` are `true`.\n  bool all(bvec3 x);\n  // Returns true only if all components of `x` are `true`.\n  bool all(bvec4 x);\n\n  // Returns the component-wise logical complement of `x`.\n  bvec2 not(bvec2 x);\n  // Returns the component-wise logical complement of `x`.\n  bvec3 not(bvec3 x);\n  // Returns the component-wise logical complement of `x`.\n  bvec4 not(bvec4 x);\n\n  ////////////////////////////////////////////////////////////////////////////////\n  // Texture Lookup Functions\n\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  vec4 texture2D(sampler2D sampler, vec2 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  vec4 texture2D(sampler2D sampler, vec2 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  vec4 texture2DLod(sampler2D sampler, vec2 coord, float lod);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`.\n  vec4 texture2DProj(sampler2D sampler, vec3 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`.\n  vec4 texture2DProj(sampler2D sampler, vec3 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`.\n  vec4 texture2DProjLod(sampler2D sampler, vec3 coord, float lod);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`. The third component of `coord` is ignored.\n  vec4 texture2DProj(sampler2D sampler, vec4 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`. The third component of `coord` is ignored.\n  vec4 texture2DProj(sampler2D sampler, vec4 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the 2D texture currently bound to `sampler`.\n  // The texture coordinate `(coord.s, coord.t)` is divided by the last component of `coord`. The third component of `coord` is ignored.\n  vec4 texture2DProjLod(sampler2D sampler, vec4 coord, float lod);\n\n  // Use the texture coordinate `coord` to do a texture lookup in the cube map texture currently bound to `sampler`.\n  // The direction of `coord` is used to select which face to do a 2-dimensional texture lookup in.\n  vec4 textureCube(samplerCube sampler, vec3 coord);\n  // Use the texture coordinate `coord` to do a texture lookup in the cube map texture currently bound to `sampler`.\n  // The direction of `coord` is used to select which face to do a 2-dimensional texture lookup in.\n  vec4 textureCube(samplerCube sampler, vec3 coord, float bias);\n  // Use the texture coordinate `coord` to do a texture lookup in the cube map texture currently bound to `sampler`.\n  // The direction of `coord` is used to select which face to do a 2-dimensional texture lookup in.\n  vec4 textureCubeLod(samplerCube sampler, vec3 coord, float lod);\n\n  #extension GL_OES_standard_derivatives {\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    float dFdx(float v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec2 dFdx(vec2 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec3 dFdx(vec3 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `x` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdx(dFdx(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec4 dFdx(vec4 v);\n\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    float dFdy(float v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec2 dFdy(vec2 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec3 dFdy(vec3 v);\n    // Available only in the fragment shader, this function returns the partial derivative of expression `p` with respect to the window `y` coordinate.\n    //\n    // Expressions that imply higher order derivatives such as `dFdy(dFdy(n))` have undefined results, as do mixed-order derivatives such as\n    // `dFdx(dFdy(n))`. It is assumed that the expression `p` is continuous and therefore, expressions evaluated via non-uniform control flow may be undefined.\n    vec4 dFdy(vec4 v);\n\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    float fwidth(float v);\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    vec2 fwidth(vec2 v);\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    vec3 fwidth(vec3 v);\n    // Returns the sum of the absolute derivative in `x` and `y` using local differencing for the input argument `p`, i.e. `abs(dFdx(p)) + abs(dFdy(p))`\n    vec4 fwidth(vec4 v);\n  }\n\n  #extension GL_EXT_frag_depth {\n    // Available only in the fragment language, `gl_FragDepthEXT` is an output variable that is used to establish the depth value for the current fragment.\n    // If depth buffering is enabled and no shader writes to `gl_FragDepthEXT`, then the fixed function value for depth will be used (this value is contained\n    // in the `z` component of `gl_FragCoord`) otherwise, the value written to `gl_FragDepthEXT` is used.\n    //\n    // If a shader statically assigns to `gl_FragDepthEXT`, then the value of the fragment's depth may be undefined for executions of the shader that take\n    // that path. That is, if the set of linked fragment shaders statically contain a write to `gl_FragDepthEXT`, then it is responsible for always writing it.\n    float gl_FragDepthEXT;\n  }\n\n  #extension GL_EXT_shader_texture_lod {\n    vec4 texture2DGradEXT(sampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy);\n    vec4 texture2DLodEXT(sampler2D sampler, vec2 coord, float lod);\n    vec4 texture2DProjGradEXT(sampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy);\n    vec4 texture2DProjGradEXT(sampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy);\n    vec4 texture2DProjLodEXT(sampler2D sampler, vec3 coord, float lod);\n    vec4 texture2DProjLodEXT(sampler2D sampler, vec4 coord, float lod);\n    vec4 textureCubeGradEXT(samplerCube sampler, vec3 P, vec3 dPdx, vec3 dPdy);\n    vec4 textureCubeLodEXT(samplerCube sampler, vec3 coord, float lod);\n  }\n}\n"
            )
        );
        for (var O = 0, ha = b.length; O < ha; O = (O + 1) | 0) {
            var d = b[O];
            d.c = Kc(a, d, 0);
        }
        for (
            var e = new Lh(0), f = new Xh(1, null), h = new wh(c.e), m = new Vh(a, h), L = 0, ia = b.length;
            L < ia;
            L = (L + 1) | 0
        ) {
            var l = b[L];
            jd(a, l.c, e, h, f, m);
        }
        if ((nd(m, e), a.d)) return null;
        for (var g = [], i = [], ca = 0, ua = bf(f), aa = ua.length; ca < aa; ca = (ca + 1) | 0) {
            for (
                var n = ua[ca],
                    k = new Lh(0),
                    p = new Xh(1, null),
                    t = new wh(c.e),
                    w = new Kh(),
                    v = new Vh(w, t),
                    Z = 0,
                    $ = b.length;
                Z < $;
                Z = (Z + 1) | 0
            ) {
                var q = b[Z];
                jd(w, q.c, k, t, p, v);
            }
            nd(v, k), cf(p, n), Bg(k, t, c), i.push(k), g.push(n.c);
        }
        for (var E = [], F = qg(new Th(c.c), i), H = 0, ka = g.length; H < ka; H = (H + 1) | 0)
            E.push(new Zh(g[H], new Ah(i[H], c).a));
        return new xh(E, F);
    }
    function bf(a) {
        for (var b = [], d = 0, e = Array.from(a.c.values()), f = e.length; d < f; d = (d + 1) | 0) {
            var c = e[d];
            c instanceof oc && c.e & 1024 && b.push(c);
        }
        return b;
    }
    function cf(a, b) {
        for (var e = 0, f = Array.from(a.c.values()), h = f.length; e < h; e = (e + 1) | 0) {
            var c = f[e];
            if (c.a ^ b.a) c.e &= -1025;
            else {
                c.c = "main";
                var d = c.w;
                d && (d.c = c.c);
            }
        }
    }
    function df(c, a) {
        var b = a.l;
        c.b.push(c.b.length == 0 || Rc(c.b)), b && ee(b.b) && c.a.push(!1);
    }
    function ef(d, a) {
        var b = a.l,
            c = d.b.pop();
        c && (a.p = !0),
            b &&
                ee(b.b) &&
                !d.a.pop() &&
                ((b.b == 19 && Ra(b.g)) || (b.b == 7 && Ra(b.i)) || (b.b == 10 && (!Ca(b) || Ra(Ca(b))))) &&
                hb(d.b, !1);
    }
    function Jd(e, a) {
        if (Rc(e.b))
            switch (a.b) {
                case 4:
                    e.a.length && hb(e.a, !0), hb(e.b, !1);
                    break;
                case 15:
                case 6:
                case 5:
                    hb(e.b, !1);
                    break;
                case 12:
                    var b = a.g,
                        c = a.g.k,
                        d = a.g.k.k;
                    Ra(b)
                        ? c.p || hb(e.b, !1)
                        : Cb(b) && d
                        ? d.p || hb(e.b, !1)
                        : c && d && !c.p && !d.p && hb(e.b, !1);
                    break;
            }
    }
    function ff(a, b) {
        return Kd(a) || Kd(b) || (a.b != b.b && (a.b == 14 || b.b == 14 || a.b == 9 || b.b == 9));
    }
    function Kd(a) {
        return a.b == 11 && a.e.p != null;
    }
    function Ld(a, b) {
        var c = a.toString(),
            d = a.toExponential();
        d.length < c.length && (c = d);
        var e = c.indexOf("e"),
            f = "";
        return (
            ~e && ((f = c.slice(e)), (c = c.slice(0, e))),
            (c = (+(+c).toFixed(6)).toString()),
            f == "" && c.indexOf(".") == -1 && (c += b ^ 1 ? ".0" : "."),
            b == 1 && c.startsWith("0.") && c != "0." && (c = c.slice(1)),
            b == 1 && c.startsWith("-0.") && c != "-0." && (c = "-" + c.slice(2)),
            c + f
        );
    }
    function gf(b, a) {
        switch (a.b) {
            case 11:
            case 16:
                return (a.e.e & 2048) != 0;
            case 17:
                return ((a.h | 0) & 2048) != 0;
        }
        return !1;
    }
    function Tc(a) {
        a.e || (a.b += "  ");
    }
    function Uc(a) {
        a.e || (a.b = a.b.slice(2));
    }
    function Xa(i, a) {
        switch (a.b) {
            case 3:
                if (!a.g && a.l) i.a += ";";
                else {
                    (i.a += "{" + i.c), Tc(i);
                    for (var b = a.g; b; b = b.k) (i.a += i.b), Xa(i, b), (i.a += i.c);
                    Uc(i), (i.a += i.b + "}");
                }
                break;
            case 4:
                i.a += "break;";
                break;
            case 5:
                i.a += "continue;";
                break;
            case 6:
                i.a += "discard;";
                break;
            case 7:
                (i.a += "do"), Yb(i, a.g, 0), (i.a += i.c + i.b + "while" + i.d + "("), J(i, a.i, 0), (i.a += ");");
                break;
            case 8:
                J(i, a.g, 0), (i.a += ";");
                break;
            case 9:
                Md(i), (i.a += "#extension " + a.m + i.d + ":" + i.d);
                switch (a.h | 0) {
                    case 1:
                        i.a += "disable";
                        break;
                    case 2:
                        i.a += "enable";
                        break;
                    case 3:
                        i.a += "require";
                        break;
                    case 4:
                        i.a += "warn";
                        break;
                }
                Nd(i);
                break;
            case 10:
                (i.a += "for" + i.d + "("),
                    kb(a) ? (kb(a).b ^ 17 ? (J(i, kb(a), 0), (i.a += ";")) : Xa(i, kb(a))) : (i.a += ";"),
                    Ca(a) && ((i.a += i.d), J(i, Ca(a), 0)),
                    (i.a += ";"),
                    Fc(a) && ((i.a += i.d), J(i, Fc(a), 0)),
                    (i.a += ")"),
                    Yb(i, a.i, 1);
                break;
            case 11:
                var c = a.e;
                (i.a += $a(c.e)), J(i, c.k, 0), (i.a += " "), (i.a += c.c), (i.a += "(");
                for (var n = 0, k = c.n, p = k.length; n < p; n = (n + 1) | 0) {
                    var d = k[n];
                    d != c.n[0] && (i.a += "," + i.d), (i.a += $a(d.e)), J(i, d.q, 0), (i.a += " "), Vc(i, d);
                }
                (i.a += ")"), c.p ? ((i.a += i.d), Xa(i, c.p)) : (i.a += ";");
                break;
            case 12:
                (i.a += "if" + i.d + "("),
                    J(i, a.g, 0),
                    (i.a += ")"),
                    Yb(i, a.g.k, 1),
                    a.g.k.k &&
                        ((i.a += i.c + i.b + "else"),
                        a.g.k.k.b ^ 12 ? Yb(i, a.g.k.k, 0) : ((i.a += " "), Xa(i, a.g.k.k)));
                break;
            case 14:
                (i.a += "precision "), (i.a += $a(a.h | 0)), J(i, a.g, 0), (i.a += ";");
                break;
            case 15:
                var e = a.g;
                (i.a += "return"), e && (Tf(e.b) || (i.a += " "), J(i, e, 0)), (i.a += ";");
                break;
            case 16:
                var f = a.e;
                (i.a += $a(f.e)), (i.a += "struct " + f.c + i.d + "{" + i.c), Tc(i);
                for (var h = a.g.g; h; h = h.k) (i.a += i.b), Xa(i, h), (i.a += i.c);
                if ((Uc(i), (i.a += i.b + "}"), a.g.k))
                    for (var m = a.g.k.g.k; m; m = m.k) (i.a += m.n.n ? "," + i.d : i.d), Vc(i, m.e);
                i.a += ";";
                break;
            case 17:
                (i.a += $a(a.h | 0)), J(i, a.g, 0);
                for (var l = a.g.k; l; l = l.k) {
                    var g = l.e;
                    (i.a += l.n.n ? "," + i.d : " "), Vc(i, g);
                }
                i.a += ";";
                break;
            case 18:
                Md(i), (i.a += "#version " + (a.h | 0)), Nd(i);
                break;
            case 19:
                (i.a += "while" + i.d + "("), J(i, a.g, 0), (i.a += ")"), Yb(i, a.i, 1);
                break;
            default:
                i.a += Ug[a.b];
                break;
        }
    }
    function Md(a) {
        a.a != "" && !a.a.endsWith("\n") && (a.a += "\n");
    }
    function Nd(a) {
        a.e && (a.a += "\n");
    }
    function Yb(c, a, b) {
        a.b ^ 3 ? ((c.a += c.e && !b ? " " : c.c), Tc(c), (c.a += c.b), Xa(c, a), Uc(c)) : ((c.a += c.d), Xa(c, a));
    }
    function Od(c, a) {
        for (var b = a; b; b = b.k) b != a && (c.a += "," + c.d), J(c, b, 1);
    }
    function Vc(b, a) {
        (b.a += a.c),
            a.F && ((b.a += "["), J(b, a.F, 0), (b.a += "]")),
            P(a) && ((b.a += b.d + "=" + b.d), J(b, P(a), 1));
    }
    function J(c, a, b) {
        switch (a.b) {
            case 20:
                J(c, a.g, 15), (c.a += "("), Od(c, a.g.k), (c.a += ")");
                break;
            case 21:
                J(c, a.g, 16), (c.a += "."), (c.a += a.e ? a.e.c : a.m);
                break;
            case 22:
                2 < b && (c.a += "("),
                    J(c, a.g, 3),
                    (c.a += c.d + "?" + c.d),
                    J(c, a.g.k, 2),
                    (c.a += c.d + ":" + c.d),
                    J(c, a.i, 2),
                    2 < b && (c.a += ")");
                break;
            case 23:
                c.a += a.e.c;
                break;
            case 25:
                0 < b && (c.a += "("), Od(c, a.g), 0 < b && (c.a += ")");
                break;
            case 26:
                c.a += Je(a.f).a.c;
                break;
            case 28:
                c.a += (!!a.h).toString();
                break;
            case 29:
                c.a += Ld(a.h, c.e ? 1 : 0);
                break;
            case 30:
                c.a += (a.h | 0).toString();
                break;
            case 43:
                J(c, a.g, 16), (c.a += "["), J(c, a.i, 0), (c.a += "]");
                break;
            case 31:
                Zb(c, "-", a, b);
                break;
            case 32:
                Zb(c, "!", a, b);
                break;
            case 33:
                Zb(c, "+", a, b);
                break;
            case 34:
                Zb(c, "--", a, b);
                break;
            case 35:
                Zb(c, "++", a, b);
                break;
            case 36:
                Pd(c, "--", a, b);
                break;
            case 37:
                Pd(c, "++", a, b);
                break;
            case 38:
                V(c, "+", a, b, 12);
                break;
            case 39:
                V(c, "/", a, b, 13);
                break;
            case 40:
                V(c, "==", a, b, 10);
                break;
            case 41:
                V(c, ">", a, b, 10);
                break;
            case 42:
                V(c, ">=", a, b, 10);
                break;
            case 44:
                V(c, "<", a, b, 10);
                break;
            case 45:
                V(c, "<=", a, b, 10);
                break;
            case 46:
                V(c, "&&", a, b, 5);
                break;
            case 47:
                V(c, "||", a, b, 3);
                break;
            case 48:
                V(c, "^^", a, b, 4);
                break;
            case 49:
                V(c, "*", a, b, 13);
                break;
            case 50:
                V(c, "!=", a, b, 10);
                break;
            case 51:
                V(c, "-", a, b, 12);
                break;
            case 52:
                V(c, "=", a, b, 2);
                break;
            case 53:
                V(c, "+=", a, b, 2);
                break;
            case 54:
                V(c, "/=", a, b, 2);
                break;
            case 55:
                V(c, "*=", a, b, 2);
                break;
            case 56:
                V(c, "-=", a, b, 2);
                break;
            default:
                c.a += Ug[a.b];
                break;
        }
    }
    function Zb(f, a, b, c) {
        var d = b.g,
            e = d.b;
        (f.a += a),
            ((a.charCodeAt(0) == 45 && (e == 31 || e == 34 || Yf(d))) ||
                (a.charCodeAt(0) == 43 && (e == 33 || e == 35))) &&
                (f.a += " "),
            J(f, d, 14);
    }
    function Pd(d, a, b, c) {
        J(d, b.g, 15), (d.a += a);
    }
    function V(f, a, b, c, d) {
        var e = Cc(b.b);
        d < c && (f.a += "("),
            J(f, b.g, (d + (e | 0)) | 0),
            (f.a += f.d + a + f.d),
            J(f, b.i, (d + (!e | 0)) | 0),
            d < c && (f.a += ")");
    }
    function G(a) {
        if (a.f == M) return null;
        switch (a.b) {
            case 30:
            case 29:
            case 28:
                return Ya(a);
            case 23:
                return hf(a);
            case 25:
                return jf(a);
            case 22:
                return kf(a);
            case 21:
                return lf(a);
            case 43:
                return mf(a);
            case 20:
                return nf(a);
            case 31:
                return Vd(
                    a,
                    function (b) {
                        return -b;
                    },
                    function (c) {
                        return -c | 0;
                    }
                );
            case 32:
                return uf(a, function (d) {
                    return !d;
                });
            case 33:
                return Vd(
                    a,
                    function (e) {
                        return +e;
                    },
                    function (f) {
                        return +f;
                    }
                );
            case 38:
                return Xc(
                    a,
                    function (h, m) {
                        return h + m;
                    },
                    function (l, g) {
                        return (l + g) | 0;
                    }
                );
            case 51:
                return Xc(
                    a,
                    function (i, n) {
                        return i - n;
                    },
                    function (k, p) {
                        return (k - p) | 0;
                    }
                );
            case 49:
                return of(a);
            case 39:
                return Xc(
                    a,
                    function (t, w) {
                        return w != 0 ? t / w : 0;
                    },
                    function (v, q) {
                        return q ? (v / q) | 0 : 0;
                    }
                );
            case 40:
            case 50:
                return rf(a);
            case 46:
                return Wc(a, function (E, F) {
                    return E && F;
                });
            case 47:
                return Wc(a, function (H, O) {
                    return H || O;
                });
            case 48:
                return Wc(a, function (ha, L) {
                    return ha != L;
                });
            case 41:
                return uc(a, function (ia, Z) {
                    return ia > Z;
                });
            case 42:
                return uc(a, function ($, ca) {
                    return $ >= ca;
                });
            case 44:
                return uc(a, function (ua, aa) {
                    return ua < aa;
                });
            case 45:
                return uc(a, function (ka, va) {
                    return ka <= va;
                });
        }
        return null;
    }
    function hf(a) {
        var b = a.e;
        if (b && b.e & 2) {
            if (b.h) return Ya(b.h);
            if (b.v) return s(new Lh(27), a.f);
        }
        return null;
    }
    function jf(a) {
        for (var b = a.g; b; b = b.k) {
            var c = G(b);
            if (!c || b == a.i) return c;
        }
        return null;
    }
    function kf(a) {
        var b = G(a.g),
            c = G(a.g.k),
            d = G(a.i);
        return b && b.b == 28 && c && d ? (!b.h ? d : c) : null;
    }
    function lf(a) {
        var b = G(a.g);
        if (b && b.b == 20) {
            var c = b.f,
                d = a.m;
            if (xd(c))
                for (var e = d.length, f = Ea(c), t = 0, w = sd(f), v = w.length; t < v; t = (t + 1) | 0) {
                    var h = w[t];
                    if (~h.indexOf(d[0])) {
                        if (e == 1) return r(ac(b, (1 + h.indexOf(d)) | 0));
                        for (var m = td(fa(c), e), l = sa(m), g = 0; g < e; g = (g + 1) | 0)
                            o(l, Ya(ac(b, (1 + h.indexOf(d[g])) | 0)));
                        return l;
                    }
                }
            else if (c.a && c.a instanceof Tb)
                for (var i = c.a, n = i.i, k = 0, q = n.length; k < q; k = (k + 1) | 0) {
                    var p = n[k];
                    if (p.c == d) return r(ac(b, (1 + k) | 0));
                }
        }
        return null;
    }
    function mf(a) {
        var b = G(a.g),
            c = G(a.i);
        if (b && b.b == 20 && c && c.b == 30) {
            var d = b.f;
            if (xd(d)) {
                var e = Sa(d),
                    f = c.h | 0;
                if (-1 < f && f < e) return r(ac(b, (f + 1) | 0));
            } else if (ab(d)) {
                var h = Sa(d),
                    m = c.h | 0;
                if (-1 < m && m < h) {
                    for (var l = wd(d), g = sa(l), i = ac(b, sh(m, h)), n = 0; n < h; n = (n + 1) | 0) o(g, r(i.k));
                    return g;
                }
            }
        }
        return null;
    }
    function nf(a) {
        var b = a.g;
        if (b.b ^ 26) return null;
        for (var c = b.f, d = fa(c), e = 0, f = [], h = 0, m = b.k; m; m = m.k) {
            var l = G(m);
            if (!l) return null;
            if (l.b == 20 && d && fa(l.g.f))
                for (var g = l.g.k; g; g = g.k) {
                    var i = Qd(d, g);
                    if (!i) return null;
                    f.push(i);
                }
            else {
                if (d && ((l = Qd(d, l)), !l)) return null;
                f.push(l);
            }
            ab(l.f) && (e = Sa(l.f)), (h = (h + 1) | 0);
        }
        return ab(c) && e && h ^ 1
            ? null
            : fa(c)
            ? pf(f, c, ab(c) ? e : 0)
            : c.a && c.a instanceof Tb
            ? qf(f, c)
            : null;
    }
    function Bb(a) {
        for (var b = [], c = a.g.k; c; c = c.k) b.push(c.h);
        return b;
    }
    function of(a) {
        var va,
            b = G(a.g),
            c = G(a.i),
            d = b && b.f,
            e = c && c.f;
        if (b && c) {
            if ((d == Fa && e == ob) || (d == Ga && e == pb) || (d == Ha && e == qb)) {
                for (var f = Sa(d), h = sa(d), m = Bb(b), l = Bb(c), g = 0; g < f; g = (g + 1) | 0) {
                    for (var i = 0, n = 0; n < f; n = (n + 1) | 0) i += m[n] * l[(n + sh(g, f)) | 0];
                    o(h, s(ma(new Lh(29), i), da));
                }
                return h;
            }
            if ((d == ob && e == Fa) || (d == pb && e == Ga) || (d == qb && e == Ha)) {
                for (var k = Sa(d), p = sa(e), t = Bb(b), w = Bb(c), v = 0; v < k; v = (v + 1) | 0) {
                    for (var q = 0, E = 0; E < k; E = (E + 1) | 0) q += t[(v + sh(E, k)) | 0] * w[E];
                    o(p, s(ma(new Lh(29), q), da));
                }
                return p;
            }
            if (ab(d) && e == d) {
                for (var F = Sa(d), H = sa(d), O = Bb(b), ha = Bb(c), L = 0; L < F; L = (L + 1) | 0)
                    for (var ia = 0; ia < F; ia = (ia + 1) | 0) {
                        for (var Z = 0, $ = 0; $ < F; $ = ($ + 1) | 0)
                            Z += O[(ia + sh($, F)) | 0] * ha[($ + sh(L, F)) | 0];
                        o(H, s(ma(new Lh(29), Z), da));
                    }
                return H;
            }
            return (
                (va = Td(b, c, function (ca, ua) {
                    return ca * ua;
                })) ||
                Ud(b, c, function (aa, ka) {
                    return sh(aa, ka);
                })
            );
        }
        return null;
    }
    function Qd(a, b) {
        var c = 0;
        switch (b.b) {
            case 28:
                c = +!!b.h;
                break;
            case 30:
                c = b.h | 0;
                break;
            case 29:
                c = b.h;
                break;
            default:
                return null;
        }
        switch (a) {
            case Y:
                return s(Ba(new Lh(28), !!c), Y);
            case ga:
                return s(_(new Lh(30), c | 0), ga);
            case da:
                return s(ma(new Lh(29), c), da);
        }
        return null;
    }
    function pf(a, b, c) {
        var d = Ea(b),
            e = fa(b),
            f = sa(b);
        if (a.length ^ 1) {
            if (c) {
                for (var n = Sa(b), k = 0; k < n; k = (k + 1) | 0)
                    for (var p = 0; p < n; p = (p + 1) | 0)
                        o(f, p < c && k < c ? a[(p + sh(k, c)) | 0] : s(ma(new Lh(29), p ^ k ? 0 : 1), da));
            } else {
                if (a.length < d) return null;
                for (var t = 0; t < d; t = (t + 1) | 0) {
                    var w = a[t];
                    if (w.f != e) return null;
                    o(f, w);
                }
            }
        } else {
            var h = a[0];
            if (h.f != e) return null;
            for (var m = ab(b), l = Sa(b), g = 0; g < d; g = (g + 1) | 0) {
                var i = m && (g % ((l + 1) | 0) | 0) != 0;
                o(f, i ? s(ma(new Lh(29), 0), da) : Ya(h));
            }
        }
        return wd(b) ? f : r(f.i);
    }
    function qf(a, b) {
        var c = b.a.i,
            d = sa(b);
        if (a.length ^ c.length) return null;
        for (var e = 0, f = a.length; e < f; e = (e + 1) | 0) {
            if (a[e].f != c[e].q.f) return null;
            o(d, a[e]);
        }
        return d;
    }
    function rf(a) {
        var b = G(a.g),
            c = G(a.i);
        if (b && c) {
            var d = oa(b, c);
            return s(Ba(new Lh(28), a.b ^ 40 ? !d : d), Y);
        }
        return null;
    }
    function Rd(a, b, c, d) {
        if (a.b == 20 && a.g.b == 26 && fa(a.g.f) == b) {
            for (var e = sa(a.g.f), f = a.g.k; f; f = f.k) {
                var h = G(f);
                if (!h || h.b ^ c) return null;
                o(e, d(h));
            }
            return e;
        }
        return null;
    }
    function sf(a, b) {
        return a.b ^ 29
            ? Rd(a, da, 29, function (c) {
                  return s(ma(new Lh(29), b(c.h)), da);
              })
            : s(ma(new Lh(29), b(a.h)), da);
    }
    function tf(a, b) {
        return a.b ^ 30
            ? Rd(a, ga, 30, function (c) {
                  return s(_(new Lh(30), b(c.h | 0)), ga);
              })
            : s(_(new Lh(30), b(a.h | 0)), ga);
    }
    function Sd(a, b, c, d, e) {
        var f = a.b == 20 && a.g.b == 26 && fa(a.g.f) == c,
            h = b.b == 20 && b.g.b == 26 && fa(b.g.f) == c;
        if (f && h && b.f == a.f) {
            for (var m = sa(a.f), l = a.g.k, g = b.g.k; l && g; ) {
                var i = G(l),
                    n = G(g);
                if (!i || i.b ^ d || !n || n.b ^ d) return null;
                o(m, e(i, n)), (l = l.k), (g = g.k);
            }
            if (!l && !g) return m;
        } else if (f && b.b == d) {
            for (var k = sa(a.f), p = a.g.k; p; p = p.k) {
                var t = G(p);
                if (!t || t.b ^ d) return null;
                o(k, e(t, b));
            }
            return k;
        } else if (a.b == d && h) {
            for (var w = sa(b.f), v = b.g.k; v; v = v.k) {
                var q = G(v);
                if (!q || q.b ^ d) return null;
                o(w, e(a, q));
            }
            return w;
        }
        return null;
    }
    function Td(a, b, c) {
        return a.b == 29 && b.b == 29
            ? s(ma(new Lh(29), c(a.h, b.h)), da)
            : Sd(a, b, da, 29, function (d, e) {
                  return s(ma(new Lh(29), c(d.h, e.h)), da);
              });
    }
    function Ud(a, b, c) {
        return a.b == 30 && b.b == 30
            ? s(_(new Lh(30), c(a.h | 0, b.h | 0)), ga)
            : Sd(a, b, ga, 30, function (d, e) {
                  return s(_(new Lh(30), c(d.h | 0, e.h | 0)), ga);
              });
    }
    function uf(a, b) {
        var c = G(a.g);
        return c && c.b == 28 ? s(Ba(new Lh(28), b(!!c.h)), Y) : null;
    }
    function Vd(a, b, c) {
        var e,
            d = G(a.g);
        return d && ((e = sf(d, b)) || tf(d, c));
    }
    function Wc(a, b) {
        var c = G(a.g),
            d = G(a.i);
        return c && d && c.b == 28 && d.b == 28 ? s(Ba(new Lh(28), b(!!c.h, !!d.h)), Y) : null;
    }
    function Xc(a, b, c) {
        var f,
            d = G(a.g),
            e = G(a.i);
        return d && e ? (f = Td(d, e, b)) || Ud(d, e, c) : null;
    }
    function uc(a, b) {
        var c = G(a.g),
            d = G(a.i);
        if (c && d) {
            if (c.b == 29 && d.b == 29) return s(Ba(new Lh(28), b(c.h, d.h)), Y);
            if (c.b == 30 && d.b == 30) return s(Ba(new Lh(28), b(c.h | 0, d.h | 0)), Y);
        }
        return null;
    }
    function Wd(a, b, c) {
        for (var d = 0, e = 0, f = a.length; e < f; ) {
            var h = a.charCodeAt(e);
            (e = (e + 1) | 0),
                vc(h) && ((d = (d + 1) | 0), h == 13 && e < f && a.charCodeAt(e) == 10 && (e = (e + 1) | 0));
        }
        return d > 2 && (d = 2), Xb(c, d);
    }
    function vf(a, b, c) {
        switch (c) {
            case 48:
                switch (b) {
                    case 65:
                        return !0;
                    case 96:
                        return !1;
                }
                break;
            case 47:
                switch (b) {
                    case 62:
                        return !0;
                    case 96:
                        return !1;
                }
                break;
            case 65:
                if (b == 65) return !0;
                break;
            case 62:
                if (b == 62) return !0;
                break;
            case 85:
                if (vd(b) || b == 88) return !1;
                break;
            case 84:
                if (vd(b) || b == 88) return !1;
                break;
            case 81:
            case 90:
            case 89:
            case 88:
            case 82:
                return !1;
            case 87:
                if (b == 83) return !1;
                break;
        }
        switch (b) {
            case 85:
            case 84:
            case 82:
            case 49:
            case 46:
                return !1;
            case 65:
            case 62:
                switch (a) {
                    case 99:
                    case 85:
                    case 84:
                    case 81:
                    case 80:
                    case 90:
                    case 49:
                    case 46:
                    case 32:
                    case 12:
                        return !1;
                }
                if (Hg(a)) return !1;
                break;
            case 48:
            case 47:
                if (c == 96) return !1;
                break;
        }
        return !0;
    }
    function vc(a) {
        return a == 10 || a == 13;
    }
    function wf(a) {
        for (var b = 0, c = a.length; b < c; b = (b + 1) | 0) if (vc(a.charCodeAt(b))) return !0;
        return !1;
    }
    function Xd(a) {
        return a == 32 || a == 9;
    }
    function wc(a) {
        for (var b = 0, c = a.length; b < c; b = (b + 1) | 0) if (!Xd(a.charCodeAt(b))) return !1;
        return !0;
    }
    function xf(a) {
        for (var b = a.length; Xd(a.charCodeAt((b - 1) | 0)); ) b = (b - 1) | 0;
        return a.slice(0, b);
    }
    function yf(a, b, c, d) {
        for (var e = [], f = 0, h = 0, m = a.length; h < m; h = (h + 1) | 0) {
            var l = a.charCodeAt(h);
            vc(l) &&
                (e.push(a.slice(f, h)),
                l == 13 && ((h + 1) | 0) < m && a.charCodeAt((h + 1) | 0) == 10 && (h = (h + 1) | 0),
                (f = (h + 1) | 0));
        }
        e.push(a.slice(f));
        for (var g = b.length; g > 0 && !vc(b.charCodeAt((g - 1) | 0)); ) g = (g - 1) | 0;
        for (var i = b.slice(g), n = i, q = 0, E = e.slice(1), F = E.length; q < F; q = (q + 1) | 0) {
            var k = E[q];
            if (!wc(k)) {
                for (var p = 0, t = k.length; p < t && p < n.length && k.charCodeAt(p) == n.charCodeAt(p); )
                    p = (p + 1) | 0;
                n = n.slice(0, p);
            }
        }
        for (var w = "", H = 0, O = e.length; H < O; H = (H + 1) | 0) {
            var v = e[H];
            w == "" ? (wc(i) && (w += i.slice(n.length)), (w += v)) : ((w += d), wc(v) || (w += c + v.slice(n.length)));
        }
        return w;
    }
    function zf(a, b, c, d) {
        var e = new Kh(),
            f = new Zh("<stdin>", a),
            h = Kc(e, f, 1);
        if (e.d) return a;
        var m = "",
            l = 99,
            g = 99,
            i = 0,
            n = 0,
            k = !0,
            p = 0,
            t = null,
            w = function (v) {
                return !wc(a.slice(h[(v - 1) | 0].a.c, h[v].a.b));
            },
            q = function (E, F) {
                switch (E) {
                    case 90:
                    case 87:
                        return !0;
                    case 4:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 15:
                    case 17:
                    case 32:
                    case 43:
                        return !F;
                }
                return !1;
            },
            H = null,
            O = function () {
                for (var ha = 1, L = p; L < h.length; L = (L + 1) | 0) {
                    switch (h[L].b) {
                        case 0:
                        case 1:
                            continue;
                        case 83:
                            ha = 0;
                            break;
                    }
                    break;
                }
                (n = (n + ha) | 0), H(), (n = (n - ha) | 0);
            },
            ia = function () {
                var Z = 1;
                return (
                    h[p].b == 85 && w((p + 1) | 0) && (Z = 0),
                    (n = (n + Z) | 0),
                    t(function ($) {
                        return $ == 85;
                    })
                        ? ((n = (n - Z) | 0), !0)
                        : ((n = (n - Z) | 0), !1)
                );
            };
        H = function () {
            for (
                ;
                t(function (ca) {
                    return ca == 0 || ca == 1;
                });

            );
            switch (h[p].b) {
                case 99:
                case 87:
                    return !1;
                case 45:
                case 44:
                    t(function (ua) {
                        return !0;
                    });
                    break;
                case 17:
                    t(function (aa) {
                        return !0;
                    }),
                        ia() && O(),
                        h[p].b ^ 12 || H();
                    break;
                case 15:
                case 43:
                    t(function (ka) {
                        return !0;
                    }),
                        ia() && O();
                    break;
                case 11:
                    t(function (va) {
                        return !0;
                    }),
                        O(),
                        t(function (Ua) {
                            return Ua == 43;
                        }) &&
                            (ia(),
                            t(function (la) {
                                return la == 90;
                            }));
                    break;
                case 12:
                    if (
                        (t(function (rb) {
                            return !0;
                        }),
                        h[p].b ^ 17)
                    )
                        O();
                    else {
                        var La = w(p);
                        La && (n = (n + 1) | 0),
                            t(function (Va) {
                                return !0;
                            }),
                            ia() && O(),
                            La && (n = (n - 1) | 0);
                    }
                    break;
                case 83:
                case 90:
                    t(function (wa) {
                        return !0;
                    });
                    break;
                case 91:
                case 92:
                case 93:
                case 94:
                    for (
                        t(function (xa) {
                            return !0;
                        });
                        t(function (eb) {
                            return !w(p);
                        });

                    );
                    break;
                default:
                    var Ia = vd(h[p].b);
                    if (
                        (t(function (Ja) {
                            return !0;
                        }),
                        Ia &&
                            t(function (fb) {
                                return fb == 96;
                            }) &&
                            t(function (sb) {
                                return sb == 85;
                            }))
                    )
                        t(function (tb) {
                            return tb == 83;
                        }) ||
                            t(function (bb) {
                                return bb == 90;
                            });
                    else {
                        for (
                            var cb = !1;
                            !cb && w(p) && ((cb = !0), (n = (n + 1) | 0)),
                                t(function (Ub) {
                                    return !q(Ub, !1);
                                });

                        );
                        t(function (ub) {
                            return ub == 90;
                        }),
                            cb && (n = (n - 1) | 0);
                    }
                    break;
            }
            return !0;
        };
        var ic = function () {
                for (var Ka = [], Wa = p; Wa < h.length; ) {
                    var qc = h[Wa].b;
                    switch (qc) {
                        case 83:
                        case 84:
                        case 85:
                            Ka.push(qc);
                            break;
                        case 87:
                            if (!Ka.length) return Wa;
                            if (Ka.pop() ^ 83) return -1;
                            break;
                        case 88:
                            if (!Ka.length || Ka.pop() ^ 84) return -1;
                            break;
                        case 89:
                            if (!Ka.length || Ka.pop() ^ 85) return -1;
                            break;
                    }
                    Wa = (Wa + 1) | 0;
                }
                return -1;
            },
            jc = -1,
            Oc = function () {
                var Ob = ic(),
                    Pb = Ob != -1 && wf(a.slice(h[(p - 1) | 0].a.c, h[Ob].a.b));
                for (Pb && (jc = p), n = (n + 1) | 0; H(); );
                (n = (n - 1) | 0),
                    Pb && (jc = p),
                    t(function (kc) {
                        return kc == 87;
                    });
            },
            Qb = function () {
                for (
                    n = (n + 1) | 0;
                    t(function (Rb) {
                        return Rb != 89;
                    });

                );
                (n = (n - 1) | 0),
                    t(function (yb) {
                        return yb == 89;
                    });
            },
            Sb = function () {
                for (
                    n = (n + 1) | 0;
                    t(function (Pc) {
                        return Pc != 88;
                    });

                );
                (n = (n - 1) | 0),
                    t(function (Vb) {
                        return Vb == 88;
                    });
            };
        for (
            t = function (rc) {
                var Ta = h[p];
                if (!rc(Ta.b) || Ta.b == 99) return !1;
                var lc = jc ^ p ? (g ^ 99 ? Wd(a.slice(i, Ta.a.b), b, c) : "") : "\n";
                (p = (p + 1) | 0), (m += lc), lc != "" && (k = !0), k ? (m += Xb(b, n)) : vf(l, g, Ta.b) && (m += " ");
                var Ma = N(Ta.a);
                switch (Ta.b) {
                    case 0:
                        Ma = xf(Ma);
                        break;
                    case 1:
                        Ma = yf(Ma, a.slice(0, Ta.a.b), Xb(b, n), c);
                        break;
                }
                (m += Ma), (l = g), (g = Ta.b), (i = Ta.a.c), (k = !1);
                switch (Ta.b) {
                    case 83:
                        Oc();
                        break;
                    case 85:
                        Qb();
                        break;
                    case 84:
                        Sb();
                        break;
                }
                return !0;
            };
            H() ||
            t(function (zb) {
                return zb != 99;
            });

        );
        var gb = Wd(a.slice(i), b, c);
        switch (d) {
            case 0:
                gb != "" && (m += c);
                break;
            case 2:
                m != "" && (m += c);
                break;
        }
        return m;
    }
    function Af(a) {
        return a.f != null ? new Bh(C(a.h) + " " + a.f + ";", "") : a.d && new Bh(xc(a.d), yc(a.d.f));
    }
    function zc(b, a) {
        return a.a == b.a && fc(a, b.b);
    }
    function Yc(b, a) {
        return zc(b, a.b) ? ((b.c = K(a)), (b.d = a), (b.e = a.b), !0) : !1;
    }
    function Zc(b, a) {
        return Yc(b, a) || Pa(b, a.q) || Pa(b, a.F) || Pa(b, P(a));
    }
    function Bf(c, a) {
        for (var d = 0, e = a.n, f = e.length; d < f; d = (d + 1) | 0) {
            var b = e[d];
            if (Zc(c, b)) return !0;
        }
        return Yc(c, a) || Pa(c, a.k) || Pa(c, a.p);
    }
    function Cf(c, a) {
        for (var d = 0, e = a.i, f = e.length; d < f; d = (d + 1) | 0) {
            var b = e[d];
            if (Zc(c, b)) return !0;
        }
        return Yc(c, a);
    }
    function Pa(c, a) {
        var d;
        if (!a) return !1;
        for (var b = a.g; b; b = b.k) if (Pa(c, b)) return !0;
        switch (a.b) {
            case 23:
                if (zc(c, a.c)) return (c.c = a.f), (c.d = a.e), (c.e = a.c), !0;
                break;
            case 26:
                if (zc(c, a.c)) return (c.c = a.f), (c.d = ((d = c.c).b ? d.b : c.c).a), (c.e = a.c), !0;
                break;
            case 21:
                if (zc(c, a.d))
                    return (c.c = a.f), xd(a.g.f) ? ((c.f = a.m), (c.h = a.f)) : (c.d = a.e), (c.e = a.d), !0;
                break;
            case 2:
                return Zc(c, a.e);
            case 11:
                return Bf(c, a.e);
            case 16:
                return Cf(c, a.e);
        }
        return !1;
    }
    function Zd(d, a) {
        switch (a.b) {
            case 16:
            case 11:
                _d(d, a.e);
                break;
            case 17:
                for (var b = a.g.k; b; b = b.k) _d(d, b.e);
                break;
            case 0:
                for (var c = a.g; c; c = c.k) Zd(d, c);
                break;
        }
    }
    function _d(b, a) {
        a.b && a.b.a == b.a && b.b.push(a);
    }
    function Df(m, a) {
        var b = new Ch(m.a, m.b);
        if ((Pa(b, a), (m.d = b.d), m.d)) {
            jb(m, a);
            var c = null;
            m.c.sort(function (d, e) {
                return d.a == e.a ? Qc(d.b, e.b) : _e(d.a.a, e.a.a);
            }),
                Ab(m.c, function (f) {
                    var h = c;
                    return (c = f), h != null && ng(c, h);
                });
        }
    }
    function ib(c, a, b) {
        b == c.d && a && N(a) == c.d.c && c.c.push(a);
    }
    function _c(b, a) {
        ib(b, a.b, a), jb(b, a.q), jb(b, a.F), jb(b, P(a));
    }
    function Ef(c, a) {
        ib(c, a.b, a), ib(c, a.b, a.w), jb(c, a.k), jb(c, a.p);
        for (var d = 0, e = a.n, f = e.length; d < f; d = (d + 1) | 0) {
            var b = e[d];
            _c(c, b);
        }
    }
    function Ff(c, a) {
        ib(c, a.b, a);
        for (var d = 0, e = a.i, f = e.length; d < f; d = (d + 1) | 0) {
            var b = e[d];
            _c(c, b);
        }
    }
    function jb(c, a) {
        if (a) {
            for (var b = a.g; b; b = b.k) jb(c, b);
            switch (a.b) {
                case 23:
                    ib(c, a.c, a.e);
                    break;
                case 21:
                    ib(c, a.d, a.e);
                    break;
                case 26:
                    ib(c, a.c, a.f.a);
                    break;
                case 2:
                    _c(c, a.e);
                    break;
                case 11:
                    Ef(c, a.e);
                    break;
                case 16:
                    Ff(c, a.e);
                    break;
            }
        }
    }
    function Gf(c, a) {
        Aa(c, "keyword", "false"), Aa(c, "keyword", "true"), Aa(c, "keyword", "void");
        for (var d = 0, e = Pg.length; d < e; d = (d + 1) | 0) {
            var b = Pg[d];
            Aa(c, "struct", b.a.c).c = xc(b.a);
        }
        $c(c, a, !0);
    }
    function $d(b, a) {
        return a != null && a.a == b.a && fc(a, b.b);
    }
    function Aa(d, a, b) {
        var c = null;
        return d.c.has(b) ? (c = d.c.get(b)) : ((c = new Fh(a, b)), d.d.push(c), Na(d.c, b, c)), c;
    }
    function $b(d, a) {
        var b = a instanceof oc ? "function" : a instanceof Tb ? "struct" : "variable",
            c = Aa(d, b, a.c);
        c.c != "" ? (c.c += "\n") : (c.d = yc(a.f)), (c.c += xc(a));
    }
    function $c(E, a, b) {
        if (!a) return !1;
        var c = $d(E, a.c);
        switch (a.b) {
            case 11:
                if (($b(E, a.e), c)) {
                    var d = a.e;
                    Aa(E, "keyword", "discard"), Aa(E, "keyword", "return");
                    for (var F = 0, H = d.n, O = H.length; F < O; F = (F + 1) | 0) {
                        var e = H[F];
                        $b(E, e);
                    }
                    $c(E, d.p, !1);
                }
                break;
            case 2:
                $b(E, a.e);
                break;
            case 16:
                $b(E, a.e);
                break;
            case 10:
            case 19:
            case 7:
                c && (Aa(E, "keyword", "break"), Aa(E, "keyword", "continue"));
                break;
            case 21:
                var f = a.g;
                if (c && !$d(E, f.c)) {
                    E.d = [];
                    var h = f.f;
                    switch (h) {
                        case Lb:
                        case vb:
                        case Fa:
                        case Mb:
                        case wb:
                        case Ga:
                        case Nb:
                        case xb:
                        case Ha:
                            for (var ha = 0, L = sd(Ea(h)), ia = L.length; ha < ia; ha = (ha + 1) | 0)
                                for (var m = L[ha], l = 1; l < 5; l = (l + 1) | 0) {
                                    for (var g = [], i = 0; i < l; i = (i + 1) | 0) g.push(0);
                                    for (;;) {
                                        for (var n = "", k = 0; k < l; k = (k + 1) | 0) n += m[g[k]];
                                        var p = td(fa(h), n.length).a;
                                        Aa(E, "variable", n).c = p.c + " " + n + ";";
                                        for (var t = 0; t < l; ) {
                                            var w = g[t];
                                            if (((w = (w + 1) | 0) ^ m.length || (w = 0), (g[t] = w), w)) break;
                                            t = (t + 1) | 0;
                                        }
                                        if (t == l) break;
                                    }
                                }
                            break;
                        default:
                            if (h.a && h.a instanceof Tb)
                                for (var Z = 0, $ = h.a.i, ca = $.length; Z < ca; Z = (Z + 1) | 0) {
                                    var v = $[Z];
                                    $b(E, v);
                                }
                            break;
                    }
                    return !0;
                }
                break;
        }
        if (b || c || a.b == 17) for (var q = a.g; q; q = q.k) if ($c(E, q, !1)) return !0;
        return c;
    }
    function ae(b, a) {
        return a != null && a.a == b.a && fc(a, b.b);
    }
    function ad(la, a) {
        if (!a || (a.b && !ae(la, a.c))) return !1;
        for (var b = a.g; b; b = b.k) if (ad(la, b)) return !0;
        switch (a.b) {
            case 11:
                return ad(la, a.e.p), !0;
            case 20:
                var c = a.g;
                if (!ae(la, c.c)) {
                    for (var d = c.k, e = c.f, f = e.a, h = [], m = d; m; m = m.k) h.push(m);
                    if (f instanceof oc) {
                        for (var l = [], g = f; g; g = g.t) ~l.indexOf(g.w) || l.push(g);
                        l.reverse();
                        for (var rb = 0, La = l.length; rb < La; rb = (rb + 1) | 0) {
                            var i = l[rb];
                            la.c.push(
                                new Hh(
                                    xc(i),
                                    i.n.map(function (n) {
                                        return _b(n);
                                    }),
                                    yc(i.f)
                                )
                            );
                        }
                        if (la.c.length) {
                            la.e = 0;
                            for (var k = [], p = 0; p < l.length; p = (p + 1) | 0) k.push(p);
                            for (var t = h.length; t > 0; t = (t - 1) | 0) {
                                for (var w = [], Va = 0, wa = k, xa = wa.length; Va < xa; Va = (Va + 1) | 0) {
                                    var v = wa[Va];
                                    l[v].n.length >= t && w.push(v);
                                }
                                if (w.length) {
                                    k = w;
                                    break;
                                }
                            }
                            if (k.length > 1) {
                                var q = k.slice();
                                Ab(q, function (E) {
                                    for (
                                        var F = l[E].n, H = 0, eb = Math.min(F.length, h.length);
                                        H < eb;
                                        H = (H + 1) | 0
                                    ) {
                                        var O = F[H].q.f,
                                            ha = h[H].f;
                                        if (ha != M && O != ha) return !0;
                                    }
                                    return !1;
                                }),
                                    q.length ||
                                        ((q = k.slice()),
                                        Ab(q, function (L) {
                                            for (
                                                var ia = l[L].n, Z = 0, Ia = Math.min(ia.length, h.length);
                                                Z < Ia;
                                                Z = (Z + 1) | 0
                                            ) {
                                                var $ = ia[Z].q.f,
                                                    ca = h[Z].f,
                                                    ua = Ea($),
                                                    aa = Ea(ca);
                                                if (ca != M && $ != ca && (!ua || !aa || ua ^ aa)) return !0;
                                            }
                                            return !1;
                                        })),
                                    q.length && (k = q);
                            }
                            k.length && (la.e = k[0]);
                        }
                    }
                    if (f instanceof Tb && !fa(e)) {
                        var ka = f.i.map(function (va) {
                            return _b(va);
                        });
                        la.c.push(new Hh(f.c + "(" + ka.join(", ") + ");", ka, yc(f.f))), (la.e = 0);
                    }
                    if (h.length) {
                        la.d = 0;
                        for (var Ja = 0, fb = h.length; Ja < fb; Ja = (Ja + 1) | 0) {
                            var Ua = h[Ja];
                            if (la.b <= Ua.c.c || !Ua.k) break;
                            la.d = (la.d + 1) | 0;
                        }
                    }
                    return !0;
                }
                break;
        }
        return !1;
    }
    function Yd(a) {
        switch (a.b) {
            case 30:
                return (a.h | 0).toString();
            case 28:
                return (!!a.h).toString();
            case 29:
                return Ld(a.h, 0);
            case 20:
                for (var b = a.g, c = C(a.f) + "(", d = b.k; d; d = d.k) d.n != b && (c += ", "), (c += Yd(d));
                return c + ")";
        }
        return null;
    }
    function xc(a) {
        if (a instanceof Tb) {
            var b = a,
                c = $a(b.e) + "struct " + a.c;
            if (b.a > -1) {
                c += " {\n";
                for (var i = 0, n = b.i, k = n.length; i < k; i = (i + 1) | 0) {
                    var d = n[i];
                    c += "  " + _b(d) + ";\n";
                }
                c += "}";
            }
            return c + ";";
        }
        if (a instanceof Ie) {
            var e = a,
                f = _b(e);
            if (e.h) {
                var h = Yd(e.h);
                h != null && (f += " = " + h);
            }
            return f + ";";
        }
        if (a instanceof oc) {
            for (
                var m = a, l = $a(m.e) + C(m.k.f) + " " + a.c + "(", p = 0, t = m.n, w = t.length;
                p < w;
                p = (p + 1) | 0
            ) {
                var g = t[p];
                g != m.n[0] && (l += ", "), (l += _b(g));
            }
            return l + ");";
        }
        return null;
    }
    function _b(a) {
        var b = a.q.f,
            c = $a(a.e) + C(b.b || b) + " " + a.c;
        return b.b && (c += b.c ? "[" + b.c + "]" : "[]"), c;
    }
    function yc(a) {
        var b = "";
        if (a)
            for (var f = 0, h = a.length; f < h; f = (f + 1) | 0) {
                var c = a[f],
                    d = 0,
                    e = c.length;
                for (
                    c.startsWith("//")
                        ? (d = (d + 2) | 0)
                        : c.startsWith("/*") && ((d = (d + 2) | 0), (e = (e - 2) | 0));
                    d < e && c.charCodeAt(d) == 32;

                )
                    d = (d + 1) | 0;
                for (; e > d && c.charCodeAt((e - 1) | 0) == 32; ) e = (e - 1) | 0;
                b != "" && (b += "\n"), (b += c.slice(d, e));
            }
        return b;
    }
    function be(a, b, c) {
        if (!b) return a + ": " + c + "\n";
        var d = ld(b, 0);
        return kd(b) + ": " + a + ": " + c + "\n" + d.a + "\n" + d.b + "\n";
    }
    function Hf(c) {
        for (var a = new ph(), d = 0, e = c.a, f = e.length; d < f; d = (d + 1) | 0) {
            var b = e[d];
            (a.a += be(b.a ? "warning" : "error", b.b, b.c)), b.d && (a.a += be("note", b.d, b.e));
        }
        return a.a;
    }
    function u(c, a, b) {
        (!c.e || c.e.b ^ a.b) && ((c.e = a), c.a.push(new Jh(0, a, b)), (c.d = (c.d + 1) | 0));
    }
    function If(c, a, b) {
        c.a.push(new Jh(1, a, b)), (c.c = (c.c + 1) | 0);
    }
    function Ac(d, a, b) {
        var c = Rc(d.a);
        (c.d = a), (c.e = b);
    }
    function Jf(b, a) {
        u(b, a, '"' + N(a) + '" is a reserved word');
    }
    function Kf(b, a) {
        u(b, a.a, "Unexpected " + Qe[a.b]);
    }
    function Lf(b, a) {
        u(b, a, 'There is no symbol called "' + N(a) + '" in the current scope');
    }
    function bd(c, a, b) {
        u(c, a, 'There is already a symbol called "' + N(a) + '" in the current scope'),
            Ac(c, b, 'The previous definition of "' + N(b) + '" is here');
    }
    function Mf(f, a, b, c, d, e) {
        u(f, a, 'Cannot change the return type of "' + b + '" to type "' + C(c) + '"'),
            Ac(f, e, 'The forward declaration of "' + b + '" has a return type of "' + C(d) + '"');
    }
    function ce(b, a) {
        u(b, a, 'The operator "' + N(a) + '" is reserved and cannot be used');
    }
    function Nf(e, a, b, c, d) {
        u(
            e,
            a,
            'The constructor for type "' +
                C(b) +
                '" only takes ' +
                c +
                " argument" +
                (c ^ 1 ? "s" : "") +
                " and this argument would bring the total to " +
                d
        );
    }
    function Of(d, a, b, c) {
        u(d, a, 'Cannot construct type "' + C(b) + '" with ' + c + " argument" + (c ^ 1 ? "s" : ""));
    }
    function Pf(f, a, b, c, d, e) {
        u(
            f,
            a,
            "Expected " +
                b +
                " argument" +
                (b ^ 1 ? "s" : "") +
                " but found " +
                c +
                " argument" +
                (c ^ 1 ? "s" : "") +
                ' when calling function "' +
                d +
                '"'
        ),
            e && Ac(f, e, 'The definition of function "' + d + '" is here');
    }
    function Qf(f, a, b, c, d, e) {
        u(
            f,
            a,
            "Expected " +
                b +
                " argument" +
                (b ^ 1 ? "s" : "") +
                " but found " +
                c +
                " argument" +
                (c ^ 1 ? "s" : "") +
                ' when constructing type "' +
                d +
                '"'
        ),
            e && Ac(f, e, 'The definition of struct "' + d + '" is here');
    }
    function Rf(c, a, b) {
        b.b
            ? u(c, a, 'Cannot use a conditional expression with array type "' + C(b) + '"')
            : u(c, a, 'Cannot use a conditional expression with type "' + C(b) + '" because it contains an array');
    }
    function de(c, a, b) {
        b.b
            ? u(c, a, 'Cannot assign to array type "' + C(b) + '"')
            : u(c, a, 'Cannot assign to type "' + C(b) + '" because it contains an array');
    }
    function Sf(e, a, b, c, d) {
        c == d
            ? u(e, a, 'There is no operator "' + b + '" defined for type "' + C(c) + '"')
            : u(e, a, 'No binary operator "' + b + '" for type "' + C(c) + '" and type "' + C(d) + '"');
    }
    function fe(b, a) {
        (b.b = a.b), (b.c = a.c), (b.d = a.d), (b.e = a.e), (b.f = a.f), (b.h = a.h), (b.m = a.m);
    }
    function ge(b) {
        var a = new Lh(b.b);
        return fe(a, b), a;
    }
    function fd(b) {
        for (var a = ge(b); b.g; ) o(a, r(b.g));
        return a;
    }
    function Ya(c) {
        for (var a = ge(c), b = c.g; b; b = b.k) o(a, Ya(b));
        return a;
    }
    function I(b, a) {
        a != b && (fe(b, a), Wf(b), Vf(b, a));
    }
    function he(a) {
        return a.g != null && a.g == a.i;
    }
    function ac(c, a) {
        for (var b = c.g; a; ) (b = b.k), (a = (a - 1) | 0);
        return b;
    }
    function s(b, a) {
        return (b.f = a), b;
    }
    function Dc(b, a) {
        return (b.e = a), b;
    }
    function Ba(b, a) {
        return (b.h = +a), b;
    }
    function _(b, a) {
        return (b.h = a), b;
    }
    function ma(b, a) {
        return (b.h = a), b;
    }
    function bc(b, a) {
        return (b.m = a), b;
    }
    function x(b, a) {
        return (b.c = a), b;
    }
    function Qa(b, a) {
        return (b.d = a), b;
    }
    function o(b, a) {
        return a ? ((a.l = b), b.g ? ((a.n = b.i), (b.i.k = a), (b.i = a)) : (b.i = b.g = a), b) : b;
    }
    function Vf(b, a) {
        for (; a.g; ) o(b, r(a.g));
        return b;
    }
    function r(a) {
        return (
            a.n ? (a.n.k = a.k) : (a.l.g = a.k),
            a.k ? (a.k.n = a.n) : (a.l.i = a.n),
            (a.l = null),
            (a.n = null),
            (a.k = null),
            a
        );
    }
    function Wf(a) {
        for (; a.g; ) r(a.g);
    }
    function ea(b, a) {
        return (
            (a.l = b.l),
            (a.n = b.n),
            (a.k = b.k),
            b.n ? (b.n.k = a) : (b.l.g = a),
            b.k ? (b.k.n = a) : (b.l.i = a),
            (b.l = null),
            (b.n = null),
            (b.k = null),
            b
        );
    }
    function Ec(c, a, b) {
        return b ? (a ? ((b.l = c), (b.n = a.n), (b.k = a), a.n ? (a.n.k = b) : (c.g = b), (a.n = b), c) : o(c, b)) : c;
    }
    function ie(a) {
        for (; a.g; ) Ec(a.l, a.k, r(a.i));
        r(a);
    }
    function Ra(a) {
        return a.b == 28 && !!a.h;
    }
    function Cb(a) {
        return a.b == 28 && !!!a.h;
    }
    function cc(b, a) {
        return (b.b == 30 && (b.h | 0) == a) || (b.b == 29 && b.h == a);
    }
    function Xf(a) {
        return a.l != null && a.l.b == 20 && a.l.g == a;
    }
    function je(a) {
        return a.l != null && (ed(a.l.b) || (Cc(a.l.b) && a.l.g == a));
    }
    function ke(a) {
        return je(a) ? !0 : a.l && (a.l.b == 21 || a.l.b == 43) ? ke(a.l) : !1;
    }
    function le(a) {
        return a.b == 3 && a.g == null;
    }
    function gd(a) {
        return a.b == 25 && a.g == null;
    }
    function Yf(a) {
        return (a.b == 30 && (a.h | 0) < 0) || (a.b == 29 && a.h < 0);
    }
    function na(a) {
        switch (a.b) {
            case 28:
            case 29:
            case 30:
            case 23:
                return !0;
            case 22:
                return na(a.g) && na(a.g.k) && na(a.i);
            case 21:
                return na(a.g);
        }
        return dd(a.b) ? !ed(a.b) && na(a.g) : Bc(a.b) ? !Cc(a.b) && na(a.g) && na(a.i) : !1;
    }
    function Db(a) {
        switch (a.b) {
            case 28:
                Ba(a, !!!a.h);
                break;
            case 32:
                I(a, r(a.g));
                break;
            case 40:
                a.b = 50;
                break;
            case 50:
                a.b = 40;
                break;
            case 44:
                a.b = 42;
                break;
            case 41:
                a.b = 45;
                break;
            case 45:
                a.b = 41;
                break;
            case 42:
                a.b = 44;
                break;
            case 25:
                Db(a.i);
                break;
            case 47:
                (a.b = 46), Db(a.g), Db(a.i);
                break;
            case 46:
                (a.b = 47), Db(a.g), Db(a.i);
                break;
            default:
                I(a, s(o(new Lh(32), fd(a)), Y));
                break;
        }
    }
    function oa(d, a) {
        if (d.b == a.b) {
            switch (d.b) {
                case 28:
                    return !!d.h == !!a.h;
                case 29:
                    return d.h == a.h;
                case 30:
                    return (d.h | 0) == (a.h | 0);
                case 23:
                    return d.e == a.e;
                case 26:
                    return d.f == a.f;
                case 21:
                    return oa(d.g, a.g) && d.e == a.e && d.m == a.m;
                case 22:
                    return oa(d.g, a.g) && oa(d.g.k, a.g.k) && oa(d.i, a.i);
                case 20:
                    for (var b = d.g, c = a.g; b && c; ) {
                        if (!oa(b, c)) return !1;
                        (b = b.k), (c = c.k);
                    }
                    return b == null && c == null;
            }
            if (dd(d.b)) return oa(d.g, a.g);
            if (Bc(d.b)) return oa(d.g, a.g) && oa(d.i, a.i);
        }
        return !1;
    }
    function me(a, b, c, d) {
        return o(o(o(o(new Lh(10), a || new Lh(25)), b || new Lh(25)), c || new Lh(25)), d);
    }
    function sa(a) {
        return s(o(new Lh(20), s(new Lh(26), a)), a);
    }
    function kb(a) {
        return gd(a.g) ? null : a.g;
    }
    function Ca(a) {
        return gd(a.g.k) ? null : a.g.k;
    }
    function Fc(a) {
        return gd(a.i.n) ? null : a.i.n;
    }
    function ne() {
        return (Re = (Re + 1) | 0), Re;
    }
    function ba(a) {
        return function (b, c) {
            return x(s(new Lh(26), a), c.a);
        };
    }
    function dc(a) {
        return function (b, c, d) {
            return Qa(x(o(new Lh(a), d), _a(c.a, d.c)), c.a);
        };
    }
    function oe(a) {
        return function (b, c, d) {
            return Qa(x(o(new Lh(a), c), _a(c.c, d.a)), d.a);
        };
    }
    function W(a) {
        return function (b, c, d, e) {
            return Qa(x(o(o(new Lh(a), c), e), _a(c.c, e.c)), d.a);
        };
    }
    function Zf(a) {
        return a.length > 1 && a.charCodeAt(0) == 48 && a.charCodeAt(1) ^ 120 && a.charCodeAt(1) ^ 88
            ? parseInt(a, 8)
            : a | 0;
    }
    function _f() {
        var a = new Qh(),
            b = function (c, d, e) {
                return ce(c.a, d.a), x(s(new Lh(27), M), _a(d.a, e.c));
            },
            f = function (h, m, l, g) {
                return ce(h.a, l.a), x(s(new Lh(27), M), _a(m.c, g.c));
            };
        return (
            R(a, 36, function (i, n) {
                return x(s(Ba(new Lh(28), !0), Y), n.a);
            }),
            R(a, 13, function (k, p) {
                return x(s(Ba(new Lh(28), !1), Y), p.a);
            }),
            R(a, 97, function (t, w) {
                return x(s(_(new Lh(30), Zf(N(w.a))), ga), w.a);
            }),
            R(a, 95, function (v, q) {
                return x(s(ma(new Lh(29), +N(q.a)), da), q.a);
            }),
            R(a, 3, ba(Y)),
            R(a, 5, ba(Lb)),
            R(a, 6, ba(Mb)),
            R(a, 7, ba(Nb)),
            R(a, 14, ba(da)),
            R(a, 20, ba(ga)),
            R(a, 22, ba(vb)),
            R(a, 23, ba(wb)),
            R(a, 24, ba(xb)),
            R(a, 26, ba(ob)),
            R(a, 27, ba(pb)),
            R(a, 28, ba(qb)),
            R(a, 39, ba(Fa)),
            R(a, 40, ba(Ga)),
            R(a, 41, ba(Ha)),
            R(a, 42, ba(zd)),
            Ib(a, 46, 14, b),
            Ib(a, 47, 14, dc(34)),
            Ib(a, 48, 14, dc(35)),
            Ib(a, 62, 14, dc(31)),
            Ib(a, 49, 14, dc(32)),
            Ib(a, 65, 14, dc(33)),
            xe(a, 47, 15, oe(36)),
            xe(a, 48, 15, oe(37)),
            S(a, 53, 13, W(39)),
            S(a, 54, 10, W(40)),
            S(a, 55, 10, W(41)),
            S(a, 56, 10, W(42)),
            S(a, 57, 10, W(44)),
            S(a, 58, 10, W(45)),
            S(a, 62, 12, W(51)),
            S(a, 63, 13, W(49)),
            S(a, 64, 10, W(50)),
            S(a, 65, 12, W(38)),
            S(a, 66, 13, f),
            S(a, 67, 11, f),
            S(a, 68, 11, f),
            S(a, 60, 3, W(47)),
            S(a, 61, 4, W(48)),
            S(a, 59, 5, W(46)),
            S(a, 50, 8, f),
            S(a, 51, 6, f),
            S(a, 52, 7, f),
            ta(a, 69, 2, W(52)),
            ta(a, 70, 2, W(53)),
            ta(a, 71, 2, f),
            ta(a, 72, 2, f),
            ta(a, 73, 2, f),
            ta(a, 74, 2, W(54)),
            ta(a, 75, 2, W(55)),
            ta(a, 76, 2, f),
            ta(a, 77, 2, f),
            ta(a, 78, 2, f),
            ta(a, 79, 2, W(56)),
            R(a, 96, function (E, F) {
                var H = N(F.a),
                    O = qd(E.l, H);
                return O
                    ? (O.m != null &&
                          ya(E.c.a, O.m, 0) == 1 &&
                          u(E.a, F.a, 'Cannot use "' + H + '" from disabled extension "' + O.m + '"'),
                      (O.g = (O.g + 1) | 0),
                      x(O instanceof Tb ? s(new Lh(26), K(O)) : Dc(new Lh(23), O), F.a))
                    : (Lf(E.a, F.a), x(s(new Lh(24), M), F.a));
            }),
            S(a, 81, 1, function (ha, L, ia, Z) {
                return L.b ^ 25 && (L = x(o(new Lh(25), L), L.c)), o(L, Z), x(L, B(ha, L.c));
            }),
            (Da(a, 82, 16).c = function ($, ca) {
                var ua = y($).a;
                D($);
                var aa = y($).a;
                return A($, 96)
                    ? Qa(x(bc(o(new Lh(21), ca), N(aa)), B($, ca.c)), aa)
                    : Qa(x(bc(o(new Lh(21), ca), ""), B($, ca.c)), ze(ua));
            }),
            (Da(a, 85, 0).b = function (ka) {
                var va = D(ka),
                    Ua = U(a, ka, 0);
                return !Ua || !A(ka, 89) ? x(s(new Lh(24), M), B(ka, va.a)) : x(Ua, B(ka, va.a));
            }),
            (Da(a, 85, 15).c = function (la, rb) {
                var La = D(la),
                    Va = o(new Lh(20), rb);
                return $f(la, Va, 89) ? Qa(x(Va, B(la, rb.c)), B(la, La.a)) : x(s(new Lh(24), M), B(la, La.a));
            }),
            (Da(a, 84, 16).c = function (wa, xa) {
                var eb = D(wa);
                if (y(wa).b == 88) return Gb(wa), D(wa), x(s(new Lh(24), M), B(wa, eb.a));
                var Ia = U(a, wa, 0);
                return !Ia || !A(wa, 88)
                    ? x(s(new Lh(24), M), B(wa, eb.a))
                    : Qa(x(o(o(new Lh(43), xa), Ia), B(wa, xa.c)), B(wa, eb.a));
            }),
            (Da(a, 86, 2).c = function (Ja, fb) {
                var sb = D(Ja),
                    tb = U(a, Ja, 1);
                if (!tb || !A(Ja, 80)) return x(s(new Lh(24), M), B(Ja, sb.a));
                var bb = U(a, Ja, 1);
                return bb ? x(o(o(o(new Lh(22), fb), tb), bb), B(Ja, fb.c)) : x(s(new Lh(24), M), B(Ja, sb.a));
            }),
            a
        );
    }
    function $f(a, b, c) {
        for (var d = !0; !Q(a, c); ) {
            d || A(a, 81);
            var e = y(a),
                f = U(db, a, 1);
            if (f) o(b, f);
            else if ((o(b, x(s(new Lh(24), M), B(a, e.a))), y(a).b ^ 81 && y(a).b ^ c)) return !1;
            d = !1;
        }
        return !0;
    }
    function ag(a) {
        var b = D(a);
        a.l = new Xh(3, a.l);
        var c = Za(a, 2);
        if (!c || !A(a, 43) || !A(a, 85)) return null;
        var d = U(db, a, 0);
        return !d || !A(a, 89) ? null : (Hb(a), Eb(a, b.a, o(o(new Lh(7), c), d)));
    }
    function bg(a) {
        var b = D(a),
            c = a.h;
        if (((a.h |= b.b ^ 44 ? 2048 : 1024), Q(a, 83))) {
            var d = new Lh(13);
            return !ec(a, d, 1) || !A(a, 87) ? null : ((a.h = c), x(d, B(a, b.a)));
        }
        var e = Za(a, 1);
        return e && ((a.h = c), e);
    }
    function dg(a) {
        var b = D(a),
            c = y(a).a;
        if (!A(a, 96)) return null;
        var d = N(c);
        if (Q(a, 83)) {
            a.c.a.has(d) || Na(a.c.a, d, 0);
            var e = new Lh(13);
            if (!ec(a, e, 1) || !A(a, 87)) return null;
            for (var f = e.g; f; f = f.k)
                if (f.b ^ 17) f.e && (f.e.m = d);
                else for (var h = f.g.k; h; h = h.k) h.e.m = d;
            return x(e, B(a, b.a));
        }
        if (
            (!dh.has(d) &&
                !a.c.a.has(d) &&
                If(a.a, c, 'The extension "' + d + '" is not in the known list of valid WebGL extensions'),
            !A(a, 80))
        )
            return null;
        var m = N(y(a).a);
        if (!cg.has(m)) return Gb(a), null;
        D(a);
        var l = cg.get(m);
        return Na(a.c.a, d, l), Qa(x(_(bc(new Lh(9), d), l), B(a, b.a)), c);
    }
    function eg(a) {
        var b = D(a);
        if (((a.l = new Xh(3, a.l)), !A(a, 85))) return null;
        var c = null;
        if (!Q(a, 90)) {
            var d = re(a),
                e = hd(a, 2),
                f = null;
            if (e) {
                if (((f = Fb(a, 1)), !f)) return null;
            } else f = Fb(a, 0);
            if (f) {
                if (((c = qe(a, b.a, e, f, 0, d)), !c)) return null;
            } else if (((c = U(db, a, 0)), !c) || !A(a, 90)) return null;
        }
        var h = null;
        if (!Q(a, 90) && (((h = U(db, a, 0)), !h) || !A(a, 90))) return null;
        var m = null;
        if (!Q(a, 89) && (((m = U(db, a, 0)), !m) || !A(a, 89))) return null;
        var l = Za(a, 2);
        return l && (Hb(a), x(me(c, h, m, l), B(a, b.a)));
    }
    function fg(a) {
        var b = D(a);
        if (!A(a, 85)) return null;
        var c = y(a),
            d = U(db, a, 0);
        if ((d || (d = x(s(new Lh(24), M), B(a, c.a))), !A(a, 89))) return null;
        var e = Za(a, 2);
        if (!e) return null;
        var f = null;
        return Q(a, 12) && ((f = Za(a, 2)), !f) ? null : x(o(o(o(new Lh(12), d), e), f), B(a, b.a));
    }
    function gg(a) {
        var b = D(a),
            c = y(a).a;
        return A(a, 97) ? x(_(new Lh(18), N(c) | 0), B(a, b.a)) : null;
    }
    function hg(a) {
        var b = D(a);
        if (((a.l = new Xh(3, a.l)), !A(a, 85))) return null;
        var c = y(a),
            d = U(db, a, 0);
        if ((d || (d = x(s(new Lh(24), M), B(a, c.a))), !A(a, 89))) return null;
        var e = Za(a, 2);
        return e && (Hb(a), x(o(o(new Lh(19), d), e), B(a, b.a)));
    }
    function ig(a) {
        var b = D(a),
            c = null;
        if (!Q(a, 90)) {
            var d = y(a);
            (c = U(db, a, 0)), c || (c = x(s(new Lh(24), M), B(a, d.a))), A(a, 90);
        }
        return x(o(new Lh(15), c), B(a, b.a));
    }
    function jg(a) {
        var b = D(a),
            c = 0;
        switch (y(a).b) {
            case 25:
                c = 32;
                break;
            case 29:
                c = 64;
                break;
            case 16:
                c = 4;
                break;
            default:
                return Gb(a), null;
        }
        D(a);
        var d = Fb(a, 1);
        return d && Eb(a, b.a, o(_(new Lh(14), c), d));
    }
    function kg(a, b, c) {
        var d = y(a).a;
        if (!A(a, 96)) return null;
        var e = new Tb(tc(a.c), d, N(d), new Xh(4, a.l));
        if (((e.e |= a.h | b), (e.f = c), !id(a, e))) return null;
        var f = y(a).a,
            h = new Lh(1),
            m = null;
        if (!A(a, 83)) return null;
        for (a.l = e.d; y(a).b ^ 87 && y(a).b ^ 99; ) {
            var l = Za(a, 3);
            if (!l) return null;
            if (l.b ^ 17) u(a.a, l.c, "This statement cannot be used inside a struct");
            else {
                o(h, l);
                for (var g = l.g.k; g; g = g.k) {
                    var i = g.e;
                    e.i.push(i), P(i) && u(a.a, P(i).c, "Cannot initialize struct variables");
                }
            }
        }
        if ((Hb(a), !A(a, 87))) return null;
        if ((x(h, B(a, f)), y(a).b ^ 96)) A(a, 90);
        else if (((m = ve(0, s(new Lh(26), K(e)), D(a).a, a, c)), !m)) return null;
        return o(o(Dc(new Lh(16), e), h), m);
    }
    function pe(a, b, c) {
        for (var d = !1, e = a.l; e; e = e.b)
            if (e.a == 3) {
                d = !0;
                break;
            }
        return d || u(a.a, b, "This statement cannot be used outside a loop"), Eb(a, b, c);
    }
    function Eb(a, b, c) {
        return A(a, 90), x(c, B(a, b));
    }
    function qe(a, b, c, d, e, f) {
        var h = y(a).a;
        if (!c && y(a).b ^ 96) {
            var m = we(db, a, 0, d);
            return m && Eb(a, b, o(new Lh(8), m));
        }
        if (!A(a, 96)) return null;
        if (Q(a, 85)) return mg(c, d, h, a, f);
        var l = ve(c, d, h, a, f);
        return l && x(l, B(a, b));
    }
    function re(a) {
        var b = y(a),
            c = b.c;
        if (!c) return null;
        for (var d = b.a.b, e = null, f = (c.length - 1) | 0; f > -1; f = (f - 1) | 0) {
            for (var h = c[f], m = h.a.b.slice(h.c, d), l = 0, g = 0; g < m.length; g = (g + 1) | 0) {
                var i = m.charCodeAt(g);
                (i == 13 || i == 10) &&
                    ((l = (l + 1) | 0),
                    i == 13 && ((g + 1) | 0) < m.length && m.charCodeAt((g + 1) | 0) == 10 && (g = (g + 1) | 0));
            }
            if (l > 1) break;
            (e || (e = [])).push(N(h)), (d = h.b);
        }
        return e && e.reverse(), e;
    }
    function Za(a, b) {
        var c = y(a);
        switch (c.b) {
            case 4:
                return pe(a, D(a).a, new Lh(4));
            case 9:
                return pe(a, D(a).a, new Lh(5));
            case 10:
                return Eb(a, D(a).a, new Lh(6));
            case 11:
                return ag(a);
            case 44:
            case 45:
                return bg(a);
            case 91:
                return dg(a);
            case 15:
                return eg(a);
            case 17:
                return fg(a);
            case 83:
                return te(a);
            case 31:
                return jg(a);
            case 32:
                return ig(a);
            case 90:
                return x(new Lh(3), D(a).a);
            case 92:
                return gg(a);
            case 43:
                return hg(a);
        }
        var d = re(a),
            e = hd(a, b),
            f = null;
        if (Q(a, 35)) {
            var h = kg(a, e, d);
            return h && x(h, B(a, c.a));
        }
        if (e) {
            if (((f = Fb(a, 1)), !f)) return null;
        } else f = Fb(a, 0);
        if (f) return qe(a, c.a, e, f, 1, d);
        var m = U(db, a, 0);
        return m && Eb(a, c.a, o(new Lh(8), m));
    }
    function se(a, b) {
        if (b.b ^ 17 && b.b ^ 16) {
            var c = a.l.a == 1 || a.l.a == 4,
                d = b.b == 9 || b.b == 11 || b.b == 14 || b.b == 18;
            d && !c
                ? u(a.a, b.c, "This statement cannot be used inside a function")
                : !d && c && u(a.a, b.c, "This statement cannot be used outside a function");
        }
    }
    function lg(a, b) {
        var c = y(a).a;
        if (!A(a, 98)) return !1;
        var d = null;
        try {
            d = JSON.parse(N(c));
        } catch (l) {
            return u(a.a, c, "Invalid string literal"), !1;
        }
        var e = a.c.b;
        if (!e) return u(a.a, c, "Cannot include files without access to a file system"), !1;
        var f = e(d, c.a.a);
        if (!f) return u(a.a, c, "Cannot read the file " + JSON.stringify(d)), !1;
        if (a.e.has(f.a)) return !0;
        Na(a.e, f.a, !0), a.f.push(new Nh(c, Eg(f)));
        var h = Kc(a.a, f, 0),
            m = new Oh(a.a, h, a.c, a.d, a.e);
        return (m.l = a.l), !ec(m, b, 1) || !A(m, 99) ? !1 : !0;
    }
    function te(a) {
        var b = y(a),
            c = new Lh(3);
        return (a.l = new Xh(2, a.l)), !A(a, 83) || !ec(a, c, 2) || !A(a, 87) ? null : (Hb(a), x(c, B(a, b.a)));
    }
    function hd(a, b) {
        for (var c = 0; ; ) {
            var d = y(a).b;
            switch (d) {
                case 2:
                    c |= 1;
                    break;
                case 8:
                    c |= 2;
                    break;
                case 16:
                    c |= 4;
                    break;
                case 18:
                    c |= 8;
                    break;
                case 19:
                    c |= 16;
                    break;
                case 25:
                    c |= 32;
                    break;
                case 29:
                    c |= 64;
                    break;
                case 30:
                    c |= 128;
                    break;
                case 37:
                    c |= 256;
                    break;
                case 38:
                    c |= 512;
                    break;
                default:
                    return c;
            }
            ((!b && (d == 2 || d == 37 || d == 38)) ||
                (b == 3 && d ^ 25 && d ^ 29 && d ^ 16) ||
                (b && (d == 18 || d == 30 || d == 19))) &&
                u(a.a, y(a).a, "Cannot use this qualifier here"),
                D(a);
        }
    }
    function Fb(a, b) {
        var c = y(a),
            d = null;
        switch (c.b) {
            case 3:
                d = Y;
                break;
            case 5:
                d = Lb;
                break;
            case 6:
                d = Mb;
                break;
            case 7:
                d = Nb;
                break;
            case 14:
                d = da;
                break;
            case 20:
                d = ga;
                break;
            case 22:
                d = vb;
                break;
            case 23:
                d = wb;
                break;
            case 24:
                d = xb;
                break;
            case 26:
                d = ob;
                break;
            case 27:
                d = pb;
                break;
            case 28:
                d = qb;
                break;
            case 33:
                d = Ng;
                break;
            case 34:
                d = Og;
                break;
            case 39:
                d = Fa;
                break;
            case 40:
                d = Ga;
                break;
            case 41:
                d = Ha;
                break;
            case 42:
                d = zd;
                break;
            case 96:
                var e = qd(a.l, N(c.a));
                if (!e || !(e instanceof Tb)) return b ^ 1 || Gb(a), null;
                d = K(e);
                break;
            default:
                return b ^ 1 || Gb(a), null;
        }
        return D(a), x(s(new Lh(26), d), B(a, c.a));
    }
    function mg(a, b, c, d, e) {
        var f = d.l,
            h = new oc(tc(d.c), c, N(c), new Xh(0, f));
        if (((h.e |= d.h | a | (h.c == "main" ? 1024 : 0)), (h.f = e), (h.k = b), (d.l = h.d), Q(d, 42))) {
            if (!A(d, 89)) return null;
        } else if (!Q(d, 89)) {
            for (;;) {
                var m = hd(d, 0),
                    l = Fb(d, 1);
                if (!l) return null;
                var g = y(d).a;
                if (!A(d, 96)) return null;
                var i = new Ie(tc(d.c), g, N(g), d.l, 0);
                if (((i.e |= m), (i.q = l), h.n.push(i), id(d, i), !ue(d, i))) return null;
                if (!Q(d, 81)) break;
            }
            if (!A(d, 89)) return null;
        }
        var n = ya(f.c, N(c), null),
            k = !Q(d, 90);
        if (n) {
            if (n instanceof oc) {
                for (var p = n; p; p = p.t)
                    if (Gg(p, h)) {
                        p.k.f != h.k.f
                            ? Mf(d.a, h.k.c, h.c, h.k.f, p.k.f, p.k.c)
                            : p.p || !k
                            ? bd(d.a, h.b, p.b)
                            : ((p.w = h), (h.w = p), (h.e |= p.e), (p.e = h.e));
                        break;
                    }
                (h.t = n), Dg(f, h);
            } else return bd(d.a, c, n.b), null;
        } else He(f, h);
        if (k) {
            var t = d.h;
            if (((d.h &= -3073), (h.p = te(d)), (d.h &= t), !h.p)) return null;
        }
        return Hb(d), x(Dc(new Lh(11), h), B(d, b.c));
    }
    function ue(a, b) {
        var c = y(a);
        if (Q(a, 84)) {
            if (Q(a, 88)) return u(a.a, B(a, c.a), "All array sizes must be specified"), !0;
            if (((b.F = U(db, a, 0)), !b.F || !A(a, 88))) return !1;
            var d = 0;
            if ((X(a.d, b.F), pa(a.d, b.F, ga), b.F.f != M)) {
                var e = G(b.F);
                if (e) {
                    if (e.b == 30) {
                        var f = e.h | 0;
                        f < 1 ? u(a.a, b.F.c, 'Cannot declare an array with a size of "' + f + '"') : (d = f);
                    }
                } else u(a.a, b.F.c, "This value must be a compile-time constant");
            }
            for (; y(a).b == 84; ) {
                if (((c = D(a)), (y(a).b ^ 88 && !U(db, a, 0)) || !A(a, 88))) return !1;
                u(a.a, B(a, c.a), "Multidimensional arrays are not a part of the language");
            }
            b.q = x(s(new Lh(26), Kg(b.q.f, d)), b.q.c);
        }
        return !0;
    }
    function ve(a, b, c, d, e) {
        for (var f = o(_(new Lh(17), d.h | a), b); ; ) {
            var h = new Ie(tc(d.c), c, N(c), d.l, d.l.a ^ 1 ? (d.l.a ^ 4 ? 2 : 3) : 1);
            if (((h.e |= d.h | a), (h.f = e), (h.q = b), !ue(d, h))) return null;
            var m = y(d).a,
                l = null;
            if (Q(d, 69)) {
                var g = y(d);
                (l = U(db, d, 1)), l || (l = x(s(new Lh(24), M), B(d, g.a)));
            } else m = null;
            var i = Qa(x(o(Dc(new Lh(2), h), l), B(d, h.b)), m);
            if (((h.E = i), h.e & 2 && X(d.d, i), o(f, i), id(d, h), !Q(d, 81))) return A(d, 90), f;
            if (((c = y(d).a), !A(d, 96))) return null;
        }
    }
    function id(a, b) {
        var c = ya(a.l.c, b.c, null);
        return c ? (bd(a.a, b.b, c.b), !1) : (He(a.l, b), !0);
    }
    function ec(a, b, c) {
        for (; y(a).b ^ 99 && y(a).b ^ 87; ) {
            var d = y(a).a;
            if (Q(a, 93)) {
                if (c ^ 1) return u(a.a, d, '"#include" statements cannot be used here'), Q(a, 98), !1;
                if (!lg(a, b)) return !1;
            } else {
                var e = Za(a, c);
                if (!e) return !1;
                if (e.b ^ 13) se(a, e), o(b, e);
                else
                    for (; e.g; ) {
                        var f = r(e.g);
                        se(a, f), o(b, f);
                    }
            }
        }
        return !0;
    }
    function jd(a, b, c, d, e, f) {
        db || (db = _f());
        var h = new Map(),
            m = new Oh(a, b, d, f, h);
        return (m.l = e), ec(m, c, 1) && A(m, 99), new Mh(m.f);
    }
    function y(a) {
        return a.b[a.m];
    }
    function D(b) {
        var a = y(b);
        return ((b.m + 1) | 0) < b.b.length && (b.m = (b.m + 1) | 0), a;
    }
    function B(c, a) {
        var b = c.b[c.m > 0 ? (c.m - 1) | 0 : 0];
        return b.a.c < a.b ? a : _a(a, b.a);
    }
    function Q(b, a) {
        return y(b).b ^ a ? !1 : (D(b), !0);
    }
    function A(e, a) {
        if (Q(e, a)) return !0;
        var b = y(e),
            c = b.a,
            d = (e.m > 0 ? e.b[(e.m - 1) | 0] : b).a;
        return (
            a == 90 || ye(d).a ^ ye(c).a
                ? u(e.a, ze(d), "Expected " + Qe[a])
                : u(e.a, c, "Expected " + Qe[a] + " but found " + Qe[b.b]),
            !1
        );
    }
    function Gb(a) {
        Kf(a.a, y(a));
    }
    function Hb(a) {
        a.l = a.l.b;
    }
    function Da(e, a, b) {
        var c = ra(e.a, a, null);
        if (c) b > c.a && (c.a = b);
        else {
            var d = new Ph(b);
            (c = d), za(e.a, a, d);
        }
        return c;
    }
    function U(f, a, b) {
        var c = y(a),
            d = ra(f.a, c.b, null);
        if (!d || !d.b) return Gb(a), null;
        var e = we(f, a, b, d.b(a));
        return e;
    }
    function we(f, a, b, c) {
        for (; c; ) {
            var d = y(a).b,
                e = ra(f.a, d, null);
            if (!e || !e.c || e.a <= b) break;
            c = e.c(a, c);
        }
        return c;
    }
    function R(d, a, b) {
        Da(d, a, 0).b = function (c) {
            return b(c, D(c));
        };
    }
    function Ib(h, a, b, c) {
        Da(h, a, 0).b = function (d) {
            var e = D(d),
                f = U(h, d, b);
            return f && c(d, e, f);
        };
    }
    function xe(f, a, b, c) {
        Da(f, a, b).c = function (d, e) {
            return c(d, e, D(d));
        };
    }
    function S(m, a, b, c) {
        Da(m, a, b).c = function (d, e) {
            var f = D(d),
                h = U(m, d, b);
            return h && c(d, e, f, h);
        };
    }
    function ta(m, a, b, c) {
        Da(m, a, b).c = function (d, e) {
            var f = D(d),
                h = U(m, d, (b - 1) | 0);
            return h && c(d, e, f, h);
        };
    }
    function N(a) {
        return a.a.b.slice(a.b, a.c);
    }
    function kd(b) {
        var a = Jb(b.a, b.b);
        return b.a.a + ":" + ((a.a + 1) | 0) + ":" + ((a.b + 1) | 0);
    }
    function ng(b, a) {
        return b.a == a.a && b.b < a.c && a.b < b.c;
    }
    function fc(b, a) {
        return b.b <= a && a <= b.c;
    }
    function ld(q, a) {
        for (
            var b = Jb(q.a, q.b),
                c = Jb(q.a, q.c),
                d = Fg(q.a, b.a),
                e = b.b,
                f = c.a ^ b.a ? d.length : c.b,
                h = We(bh, d, 0),
                m = [],
                l = 0,
                g = 0;
            ;

        ) {
            h.b ^ e || (l = m.length), h.b ^ f || (g = m.length);
            var i = Xe(h);
            if (i < 0) break;
            if (i ^ 9) m.push(i);
            else for (var n = 0, E = (8 - (m.length % 8)) | 0; n < E; n = (n + 1) | 0) m.push(32);
        }
        var k = m.length;
        if (a > 0 && k > a) {
            var p = Math.min((g - l) | 0, (a / 2) | 0),
                t = Math.max((((a - p) | 0) / 2) | 0, 3);
            if (l < t) (d = sc(m.slice(0, (a - 3) | 0)) + "..."), g > ((a - 3) | 0) && (g = (a - 3) | 0);
            else if (((k - l) | 0) < ((a - t) | 0)) {
                var w = (k - a) | 0;
                (d = "..." + sc(m.slice((w + 3) | 0, k))), (l = (l - w) | 0), (g = (g - w) | 0);
            } else {
                var v = (l - t) | 0;
                (d = "..." + sc(m.slice((v + 3) | 0, (((v + a) | 0) - 3) | 0)) + "..."),
                    (l = (l - v) | 0),
                    (g = (g - v) | 0),
                    g > ((a - 3) | 0) && (g = (a - 3) | 0);
            }
        } else d = sc(m);
        return new Rh(d, Xb(" ", l) + (((g - l) | 0) < 2 ? "^" : Xb("~", (g - l) | 0)));
    }
    function og(c, a, b) {
        return new Sh(c.a, (c.b + a) | 0, (c.b + b) | 0);
    }
    function ye(a) {
        return Jb(a.a, a.b);
    }
    function ze(a) {
        return new Sh(a.a, a.c, a.c);
    }
    function _a(a, b) {
        return new Sh(a.a, a.b, b.c);
    }
    function pg(a) {
        var b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_"[a % 53];
        for (a = (a / 53) | 0; a > 0; )
            (a = (a - 1) | 0),
                (b += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789"[a % 63]),
                (a = (a / 63) | 0);
        return b;
    }
    function qg(n, a) {
        for (var b = 0, k = a.length; b < k; b = (b + 1) | 0) (n.h = b), lb(n, a[b]);
        sg(n);
        var c = new Map(),
            d = Ae(n, n.f, null);
        d.sort(function (e, f) {
            return Qc(Be(n, f), Be(n, e));
        });
        for (var E = 0, F = d.length; E < F; E = (E + 1) | 0)
            for (var h = d[E], m = null, v = 0, q = h.length; v < q; v = (v + 1) | 0)
                for (var l = h[v], p = 0, t = Array.from(l.c.values()), w = t.length; p < w; p = (p + 1) | 0) {
                    var g = t[p],
                        i = g.c;
                    !(g.e & 3072) && (!n.a || (n.a == 1 && !(g.e & 257))) && (m == null && (m = rg(n)), (g.c = m)),
                        !(g.e & 2048) && g.e & 257 && Na(c, i, g.c);
                }
        return c;
    }
    function lb(f, a) {
        var m, h;
        a.e && ((h = md(f, a.e)).d = (h.d + 1) | 0);
        for (var b = a.g; b; b = b.k) lb(f, b);
        switch (a.b) {
            case 2:
                var c = a.e;
                lb(f, c.q), P(c) && lb(f, P(c));
                break;
            case 11:
                var d = a.e;
                (f.l = f.d.get(a.e.a).b), d.w && yd(f.f, f.l, md(f, d.w).b), lb(f, d.k);
                for (var l = 0, g = d.n, i = g.length; l < i; l = (l + 1) | 0) {
                    var e = g[l];
                    ((m = md(f, e)).d = (m.d + 1) | 0), lb(f, e.q);
                }
                d.p && lb(f, d.p), (f.l = -1);
                break;
        }
    }
    function md(c, a) {
        var b = ra(c.d, a.a, null);
        return (
            b || ((b = new Uh(a.c, c.c.length)), (b.e = ud(a)), c.c.push(b), za(c.d, a.a, b), Le(c.e), Le(c.f)),
            b.c.has(c.h) || za(b.c, c.h, a),
            ud(a) && yd(c.e, c.l, b.b),
            b
        );
    }
    function rg(b) {
        for (;;) {
            var a = pg(b.m);
            if (((b.m = (b.m + 1) | 0), !Ig.has(a) && !Jg.has(a) && !a.startsWith("gl_"))) return a;
        }
    }
    function Ae(h, a, b) {
        for (var c = new Map(), m = 0, l = h.c, g = l.length; m < g; m = (m + 1) | 0) {
            var d = l[m];
            if (!b || b(d)) {
                var e = Nc(a, d.b),
                    f = ra(c, e, null);
                f || ((f = []), za(c, e, f)), f.push(d);
            }
        }
        return Array.from(c.values());
    }
    function sg(b) {
        tg(
            b,
            Ae(b, b.e, function (a) {
                return a.e;
            })
        );
    }
    function tg(m, a) {
        for (var b = [], g = 0, i = a.length; g < i; g = (g + 1) | 0) {
            var c = a[g];
            c.sort(function (d, e) {
                return Qc(e.d, d.d);
            });
            for (var f = 0, l = c.length; f < l; f = (f + 1) | 0) {
                var h = c[f];
                f < b.length ? yd(m.f, h.b, b[f]) : b.push(h.b);
            }
        }
    }
    function Be(d, a) {
        for (var b = 0, e = 0, f = a.length; e < f; e = (e + 1) | 0) {
            var c = a[e];
            b = (b + c.d) | 0;
        }
        return b;
    }
    function nd(e, a) {
        X(e, a);
        for (var f = 0, h = e.d, m = h.length; f < m; f = (f + 1) | 0) {
            var b = h[f];
            r(b);
        }
        var c = a.g;
        e.d.length && Ec(a, c, e.d[0]);
        for (var l = 0, g = Array.from(e.e.values()), i = g.length; l < i; l = (l + 1) | 0) {
            var d = g[l];
            Ec(a, c, d);
        }
    }
    function od(b, a) {
        a.b.a.a != "<api>" && !a.g && !(a.e & 1024) && b.a.b.push(a);
    }
    function X(q, a) {
        if (!a.f) {
            a.f = M;
            var b = a.b;
            switch (b) {
                case 0:
                case 1:
                    pd(q, a);
                    break;
                case 2:
                    var c = a.e;
                    od(q, c), X(q, c.q);
                    var d = c.q.f;
                    if (
                        (d == zd && (u(q.a, c.q.c, 'Cannot create a variable of type "' + C(d) + '"'), (d = M)),
                        c.F && (ja(q, c.F), pa(q, c.F, ga)),
                        P(c) && (ja(q, P(c)), pa(q, P(c), d), d.d && de(q.a, a.d, d)),
                        c.e & 2)
                    )
                        if (P(c)) {
                            if (P(c).f != M) {
                                var e = G(P(c));
                                e ? (c.h = e) : u(q.a, P(c).c, "This value must be a compile-time constant");
                            }
                        } else c.v ^ 2 || u(q.a, c.b, "Constants must be initialized");
                    break;
                case 3:
                    mb(q, a);
                    break;
                case 4:
                case 5:
                case 6:
                    break;
                case 7:
                    mb(q, a.g), X(q, a.i), pa(q, a.i, Y);
                    break;
                case 8:
                    X(q, a.g);
                    break;
                case 9:
                    break;
                case 10:
                    kb(a) && ja(q, kb(a)), Ca(a) && (ja(q, Ca(a)), pa(q, Ca(a), Y)), Fc(a) && ja(q, Fc(a)), mb(q, a.i);
                    break;
                case 11:
                    var f = a.e;
                    od(q, f);
                    for (var E = 0, F = f.n, H = F.length; E < H; E = (E + 1) | 0) {
                        var h = F[E];
                        X(q, h.q);
                    }
                    X(q, f.k),
                        f.p &&
                            ((q.f = f.k.f),
                            mb(q, f.p),
                            q.f &&
                                q.f != zd &&
                                f.p.p &&
                                u(
                                    q.a,
                                    f.b,
                                    'All control paths for "' + f.c + '" must return a value of type "' + C(q.f) + '"'
                                ),
                            (q.f = null));
                    break;
                case 12:
                    X(q, a.g), pa(q, a.g, Y), mb(q, a.g.k), a.g.k.k && mb(q, a.g.k.k);
                    break;
                case 14:
                    break;
                case 15:
                    a.g ? (X(q, a.g), pa(q, a.g, q.f || M)) : ((a.f = zd), pa(q, a, q.f || M));
                    break;
                case 16:
                    var m = a.e;
                    od(q, m), pd(q, a);
                    for (var l = K(m), O = 0, ha = m.i, L = ha.length; O < L; O = (O + 1) | 0) {
                        var g = ha[O],
                            i = g.q.f;
                        i.d && (l.d = !0), i.e && (l.e = !0);
                    }
                    break;
                case 17:
                    pd(q, a);
                    break;
                case 18:
                    q.d.push(a);
                    break;
                case 19:
                    X(q, a.g), pa(q, a.g, Y), mb(q, a.i);
                    break;
                case 20:
                    wg(q, a);
                    break;
                case 21:
                    xg(q, a);
                    break;
                case 22:
                    var n = a.g,
                        k = a.i,
                        p = a.g.k;
                    ja(q, n),
                        pa(q, n, Y),
                        ja(q, p),
                        ja(q, k),
                        p.f != k.f
                            ? u(q.a, _a(p.c, k.c), 'Cannot merge type "' + C(p.f) + '" and type "' + C(k.f) + '"')
                            : p.f.d
                            ? Rf(q.a, _a(p.c, k.c), p.f)
                            : (a.f = p.f);
                    break;
                case 23:
                    var t = a.e;
                    t instanceof Ie
                        ? (X(q, t.q), (a.f = t.q.f))
                        : t instanceof oc && !Xf(a)
                        ? u(q.a, a.c, 'The function "' + t.c + '" must be called')
                        : (a.f = K(t));
                    var w = t.m;
                    w != null && !q.e.has(w) && !ya(q.b.a, w, 0) && Na(q.e, w, _(bc(new Lh(9), w), 2));
                    break;
                case 25:
                    for (var v = a.g; v; v = v.k) ja(q, v);
                    a.f = a.i.f;
                    break;
                default:
                    dd(b) ? ug(q, a) : Bc(b) && vg(q, a);
                    break;
            }
        }
    }
    function mb(c, a) {
        if ((df(c.c, a), a.b ^ 3)) X(c, a), Jd(c.c, a);
        else for (var b = a.g; b; b = b.k) X(c, b), Jd(c.c, b);
        ef(c.c, a);
    }
    function ug(d, a) {
        var b = a.g;
        ja(d, b), ed(a.b) && Ce(d, b);
        var c = b.f;
        switch (a.b) {
            case 31:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
                a.f = Lg(c) ? c : M;
                break;
            case 32:
                a.f = c == Y ? Y : M;
                break;
        }
        a.f == M && c != M && u(d.a, a.d, 'No unary operator "' + N(a.d) + '" for type "' + C(c) + '"');
    }
    function vg(i, a) {
        var b = a.g,
            c = a.i;
        ja(i, b), ja(i, c), Cc(a.b) && Ce(i, b);
        var d = b.f,
            e = c.f,
            f = d == e;
        switch (a.b) {
            case 38:
            case 51:
            case 49:
            case 39:
                a.f =
                    (f && fa(d)) || (Mc(d) && e == da) || (Lc(d) && e == ga)
                        ? d
                        : (d == da && Mc(e)) || (d == ga && Lc(e))
                        ? e
                        : a.b == 49 && ((d == Fa && e == ob) || (d == ob && e == Fa))
                        ? Fa
                        : a.b == 49 && ((d == Ga && e == pb) || (d == pb && e == Ga))
                        ? Ga
                        : a.b == 49 && ((d == Ha && e == qb) || (d == qb && e == Ha))
                        ? Ha
                        : M;
                break;
            case 40:
            case 50:
                a.f = f && Mg(d) ? Y : M;
                break;
            case 46:
            case 47:
            case 48:
                a.f = f && d == Y ? Y : M;
                break;
            case 44:
            case 45:
            case 41:
            case 42:
                a.f = f && (d == da || d == ga) ? Y : M;
                break;
            case 52:
                (a.f = d), d.d && de(i.a, a.d, d), pa(i, c, d);
                return;
            case 53:
            case 56:
            case 55:
            case 54:
                a.f =
                    (f && fa(d)) ||
                    (Mc(d) && e == da) ||
                    (Lc(d) && e == ga) ||
                    (a.b == 55 && ((d == Fa && e == ob) || (d == Ga && e == pb) || (d == Ha && e == qb)))
                        ? d
                        : M;
                break;
            case 43:
                if (e == ga) {
                    var h = wd(d);
                    h && (a.f = h);
                    var m = G(c);
                    if (m && m.b == 30) {
                        var l = m.h | 0,
                            g = Sa(d);
                        (l < 0 || (g && l >= g)) &&
                            u(i.a, c.c, 'Index "' + l + '" is out of bounds for type "' + C(d) + '"');
                    }
                }
                break;
        }
        a.f == M &&
            d != M &&
            e != M &&
            (a.b ^ 43
                ? Sf(i.a, a.d, N(a.d), d, e)
                : u(i.a, a.d, 'No index operator for type "' + C(d) + '" and type "' + C(e) + '"'));
    }
    function wg(m, a) {
        var b = a.g;
        X(m, b);
        for (var c = b.f, d = c.a, e = [], f = !1, h = b.k; h; h = h.k) ja(m, h), e.push(h), h.f == M && (f = !0);
        if (!f) {
            if (d) {
                if (d instanceof oc) {
                    yg(m, d, a, e);
                    return;
                }
                if (d instanceof Tb) {
                    zg(m, c, a, e);
                    return;
                }
            }
            c != M && u(m.a, b.c, 'Cannot call type "' + C(c) + '"');
        }
    }
    function xg(m, a) {
        var b = a.g,
            c = a.m,
            d = a.d;
        if ((ja(m, b), c != "")) {
            var e = b.f,
                f = je(a);
            switch (e) {
                case Lb:
                case vb:
                case Fa:
                case Mb:
                case wb:
                case Ga:
                case Nb:
                case xb:
                case Ha:
                    a.f = Ag(m, d, e, c, f);
                    break;
                case M:
                    break;
                default:
                    if (e.a && e.a instanceof Tb)
                        for (var l = 0, g = e.a.i, i = g.length; l < i; l = (l + 1) | 0) {
                            var h = g[l];
                            if (h.c == c) {
                                (a.e = h), X(m, h.q), (a.f = h.q.f);
                                break;
                            }
                        }
                    a.e || u(m.a, d, 'Cannot find "' + c + '" on type "' + C(e) + '"');
                    break;
            }
        }
    }
    function yg(q, a, b, c) {
        for (var d = [], e = a; e; e = e.t) ~d.indexOf(e.w) || d.push(e);
        if (
            d.length ^ 1 &&
            ((d = d.slice()),
            Ab(d, function (f) {
                return f.n.length != c.length;
            }),
            d.length ^ 1)
        ) {
            var h = d.slice();
            Ab(d, function (m) {
                for (var l = 0, E = c.length; l < E; l = (l + 1) | 0) if (m.n[l].q.f != c[l].f) return !0;
                return !1;
            }),
                d.length ^ 1 &&
                    ((d = h),
                    Ab(d, function (g) {
                        for (var i = 0, F = c.length; i < F; i = (i + 1) | 0) {
                            var n = g.n[i].q.f,
                                k = c[i].f,
                                p = Ea(n),
                                t = Ea(k);
                            if (n != k && (!p || !t || p ^ t)) return !0;
                        }
                        return !1;
                    }));
        }
        if (d.length ^ 1) u(q.a, b.g.c, 'No matching overload for function "' + a.c + '"');
        else {
            var w = d[0];
            if (w.n.length ^ c.length) Pf(q.a, b.d, w.n.length, c.length, w.c, w.b);
            else for (var v = 0, H = c.length; v < H; v = (v + 1) | 0) pa(q, c[v], w.n[v].q.f);
            (b.g.e = w), (b.f = w.k.f);
        }
    }
    function zg(w, a, b, c) {
        if (((b.f = a), a != M))
            if (fa(a)) {
                for (var d = Ea(a), e = !1, f = 0, v = 0, q = c.length; v < q; v = (v + 1) | 0) {
                    var h = c[v],
                        m = h.f,
                        l = Ea(m);
                    if (!fa(m)) {
                        m != M &&
                            u(
                                w.a,
                                h.c,
                                'Cannot use value of type "' + C(m) + '" when constructing type "' + C(a) + '"'
                            );
                        return;
                    }
                    f >= d && Nf(w.a, h.c, a, d, (f + l) | 0), ab(m) && (e = !0), (f = (f + l) | 0);
                }
                var g = ab(a) && e;
                g && c.length ^ 1
                    ? u(
                          w.a,
                          b.d,
                          "If a matrix argument is given to a matrix constructor, it is an error to have any other arguments"
                      )
                    : f < d && f ^ 1 && !g && Of(w.a, b.d, a, f);
            } else {
                var i = a.a,
                    n = i.i,
                    k = n.length,
                    p = c.length;
                if (k ^ p) Qf(w.a, b.d, k, p, i.c, i.b);
                else for (var t = 0; t < k; t = (t + 1) | 0) pa(w, c[t], n[t].q.f);
            }
    }
    function Ag(l, a, b, c, d) {
        var e = c.length;
        if (e < 1 || e > 4) return u(l.a, a, 'Invalid swizzle "' + c + '" on type "' + C(b) + '"'), M;
        for (var f = Ea(b), g = 0, i = sd(f), n = i.length; g < n; g = (g + 1) | 0) {
            var h = i[g];
            if (~h.indexOf(c[0])) {
                for (var m = 1; m < e; m = (m + 1) | 0) {
                    if (h.indexOf(c[m]) == -1)
                        return u(l.a, a, 'Invalid swizzle "' + c + '" on type "' + C(b) + '"'), M;
                    if (d && ~c.slice(0, m).indexOf(c[m]))
                        return (
                            u(
                                l.a,
                                og(a, m, (m + 1) | 0),
                                'The field "' +
                                    c[m] +
                                    '" cannot be specified multiple times when used as a storage location'
                            ),
                            M
                        );
                }
                return td(fa(b), e);
            }
        }
        return u(l.a, a, 'Invalid swizzle "' + c + '" on type "' + C(b) + '"'), M;
    }
    function ja(b, a) {
        X(b, a), a.b == 26 && a.f != M && (u(b.a, a.c, 'Unexpected type "' + C(a.f) + '"'), (a.f = M));
    }
    function pd(c, a) {
        for (var b = a.g; b; b = b.k) X(c, b);
    }
    function Ce(c, a) {
        d: for (var b = a; ; ) {
            if (b.f == M) break;
            switch (b.b) {
                case 23:
                    (b.e.e & 2 || b.e.e & 256) && u(c.a, a.c, "Cannot store to this location");
                    break d;
                case 21:
                    b = b.g;
                    break;
                case 43:
                    b = b.g;
                    break;
                default:
                    u(c.a, a.c, "Cannot store to this location");
                    break d;
            }
        }
    }
    function pa(c, a, b) {
        a.f != b &&
            a.f != M &&
            b != M &&
            u(c.a, a.c, 'Cannot convert from type "' + C(a.f) + '" to type "' + C(b) + '"');
    }
    function Bg(a, b, c) {
        for (;;) {
            var d = new Wh();
            if ((c.a && Ic(d, a), c.d && (Gc(d, a), Hc(d, a), Cg(d, a, b)), !d.a)) break;
        }
        c.a && nb(a);
    }
    function nb(a) {
        switch (a.b) {
            case 12:
                if (!a.g.k.k) return !0;
                var b = a.g.k,
                    c = nb(b);
                return c && b.b ^ 3 && ea(b, o(new Lh(3), fd(b))), nb(a.g.k.k);
            case 10:
                return nb(a.i);
            case 11:
                var d = a.e;
                d.p && nb(d.p);
                break;
            case 19:
                return nb(a.i);
            default:
                for (var e = a.g; e; e = e.k) nb(e);
                return !1;
        }
        return !1;
    }
    function Gc(m, a) {
        for (var b = a.g; b; b = b.k) Gc(m, b);
        switch (a.b) {
            case 2:
                var c = a.e;
                P(c) && Gc(m, P(c)), (c.v == 2 || c.v == 1) && (m.b.push(c), za(m.c, c.a, 0), za(m.d, c.a, 0));
                break;
            case 11:
                var d = a.e;
                za(m.c, d.a, 0), d.p && Gc(m, d.p);
                break;
            case 23:
                var e = a.e.a,
                    f = ra(m.c, e, -1);
                ~f && za(m.c, e, (f + 1) | 0), ke(a) && ((f = ra(m.d, e, -1)), ~f && za(m.d, e, (f + 1) | 0));
                var h = a.e.m;
                h != null && Na(m.e, h, 0);
                break;
        }
    }
    function Hc(l, a) {
        for (var b = a.g, c = null; b; b = c) (c = b.k), Hc(l, b);
        switch (a.b) {
            case 2:
                if (Fe(l, a.e) || Ge(l, a.e) || (Ee(l, a.e) && (!a.g || na(a.g) || a.e.h))) r(a), (l.a = !0);
                else {
                    a.g && Hc(l, a.g);
                    var d = a.e.F;
                    if (d && d.b == 23) {
                        var e = De(l, d.e);
                        e && ((a.e.F = e), (l.a = !0));
                    }
                }
                break;
            case 11:
                var f = a.e;
                Ee(l, f) && !(f.e & 1024) ? (r(a), (l.a = !0)) : f.p && Hc(l, f.p);
                break;
            case 17:
                if (!a.g.k) {
                    var h = a.l.b;
                    h == 3 || !h || h == 16 ? r(a) : h ^ 10 ? I(a, new Lh(3)) : I(a, new Lh(25)), (l.a = !0);
                }
                break;
            case 23:
                var m = De(l, a.e);
                m && (ea(a, m), (l.a = !0));
                break;
        }
    }
    function De(b, a) {
        return Fe(b, a) ? Ya(a.h) : Ge(b, a) ? Ya(P(a)) : null;
    }
    function Cg(e, a, b) {
        for (var c = a.g, d = null; c; c = d) (d = c.k), c.b == 9 && !e.e.has(c.m) && !ya(b.a, c.m, 0) && r(c);
    }
    function Ee(b, a) {
        return ra(b.c, a.a, -1) == 0 && (!(a instanceof oc) || a.w == null || ra(b.c, a.w.a, -1) == 0);
    }
    function Fe(b, a) {
        return a.h != null && cd(a.h.b);
    }
    function Ge(b, a) {
        return ra(b.d, a.a, -1) == 0 && P(a) != null && cd(P(a).b);
    }
    function Ic(z, a) {
        for (var b = a.g, c = null; b; b = c) (c = b.k), Ic(z, b);
        switch (a.b) {
            case 2:
                var d = a.e;
                P(d) && Ic(z, P(d));
                break;
            case 3:
                for (var e = a.g; e; e = e.k)
                    if (Uf(e.b) && e.k) {
                        for (; e.k; ) r(e.k);
                        z.a = !0;
                    }
                if (a.l && a.l.b == 3) {
                    for (var f = !1, h = a.g; h; h = h.k) h.b ^ 17 || (f = !0);
                    if (!f) {
                        ie(a), (z.a = !0);
                        return;
                    }
                }
                break;
            case 8:
                if (a.l.b == 3) {
                    if (na(a.g)) {
                        r(a), (z.a = !0);
                        return;
                    }
                    var m = a.n;
                    if (m && m.b == 8) {
                        var l = r(a.g);
                        o(a, o(o(new Lh(25), r(r(m).g)), l)), (z.a = !0);
                        return;
                    }
                }
                break;
            case 7:
                Jc(z, a.g), Cb(a.i) && (ea(a, o(new Lh(3), r(a.g))), (z.a = !0));
                break;
            case 10:
                if (
                    (Jc(z, a.i),
                    !kb(a) && a.n && a.n.b == 8 && (ea(a.g, r(a.n.g)), r(a.n), (z.a = !0)),
                    Ca(a) && Ra(Ca(a)) && (ea(Ca(a), new Lh(25)), (z.a = !0)),
                    a.i.b ^ 5)
                ) {
                    for (; a.i.g && a.i.i.b == 5; ) r(a.i.i), (z.a = !0);
                } else ea(a.i, new Lh(3)), (z.a = !0);
                break;
            case 11:
                var g = a.e;
                g.p && Ic(z, g.p);
                break;
            case 12:
                if ((Jc(z, a.g.k), a.g.k.k && Jc(z, a.g.k.k), Ra(a.g))) {
                    ea(a, r(a.g.k)), (z.a = !0);
                    return;
                }
                if (Cb(a.g)) {
                    a.g.k.k ? ea(a, r(a.g.k.k)) : r(a), (z.a = !0);
                    return;
                }
                if (a.g.k.k && a.g.k.b == 15 && a.g.k.k.b == 15) {
                    var i = a.g.k.g,
                        n = a.g.k.k.g;
                    if (i && n) {
                        ea(a, o(new Lh(15), s(o(o(o(new Lh(22), r(a.g)), r(i)), r(n)), i.f))), (z.a = !0);
                        return;
                    }
                }
                if (a.g.k.k && a.g.k.b == 8 && a.g.k.k.b == 8) {
                    var k = a.g.k.g,
                        p = a.g.k.k.g;
                    if (k.f == p.f) {
                        ea(a, o(new Lh(8), s(o(o(o(new Lh(22), r(a.g)), r(k)), r(p)), k.f))), (z.a = !0);
                        return;
                    }
                }
                if (!a.g.k.k && a.g.k.b == 8) {
                    var t = a.g.k.g,
                        w = t.b == 52 && t.g.b == 23 && ud(t.g.e);
                    if (t.f == ga || t.f == da || w) {
                        var v = w ? Ya(t.g) : t.f == ga ? s(_(new Lh(30), 0), ga) : s(ma(new Lh(29), 0), da);
                        ea(a, o(new Lh(8), s(o(o(o(new Lh(22), r(a.g)), r(t)), v), t.f))), (z.a = !0);
                        return;
                    }
                }
                if (!a.g.k.k && a.g.k.b == 12 && !a.g.k.g.k.k) {
                    var q = a.g,
                        E = a.g.k.g,
                        F = a.g.k.g.k;
                    I(q, s(o(o(new Lh(46), fd(q)), r(E)), Y)), I(a.g.k, r(F)), (z.a = !0);
                    return;
                }
                if (le(a.g.k)) {
                    a.g.k.k ? (Db(a.g), r(a.g.k)) : ea(a, o(new Lh(8), r(a.g))), (z.a = !0);
                    return;
                }
                if (a.g.k.k && le(a.g.k.k)) {
                    r(a.g.k.k), (z.a = !0);
                    return;
                }
                break;
            case 15:
                for (var H = a.n; H && H.b == 12 && !H.g.k.k && H.g.k.b == 15; ) {
                    var O = H.g.k.g,
                        ha = a.g;
                    if (!O || !ha) break;
                    ea(a, o(new Lh(15), s(o(o(o(new Lh(22), r(H.g)), r(O)), r(ha)), O.f))), r(H), (H = a.n), (z.a = !0);
                }
                break;
            case 17:
                for (var L = a.n; L; L = L.n) {
                    if (L.b ^ 17) break;
                    if (L.g.f == a.g.f && (L.h | 0) == (a.h | 0)) {
                        for (; L.i != L.g; ) Ec(a, a.g.k, r(L.i));
                        r(L), (z.a = !0);
                        return;
                    }
                    for (var ia = L.g.k; ia; ia = ia.k) {
                        var Z = ia.g;
                        if (Z && !cd(Z.b)) return;
                    }
                }
                break;
            case 19:
                var $ = a.g,
                    ca = a.i;
                ea(a, me(null, r($), null, r(ca))), (z.a = !0);
                break;
            case 22:
                var ua = a.g,
                    aa = a.g.k,
                    ka = a.i;
                if (Ra(ua)) {
                    I(a, r(aa)), (z.a = !0);
                    return;
                }
                if (Cb(ua)) {
                    I(a, r(ka)), (z.a = !0);
                    return;
                }
                if (aa.b == ka.b && Bc(aa.b) && oa(aa.g, ka.g) && aa.b ^ 43) {
                    var va = aa.g,
                        Ua = aa.i,
                        la = ka.i,
                        rb = o(o(o(new Lh(22), r(ua)), r(Ua)), r(la));
                    I(a, o(o(new Lh(aa.b), r(va)), rb)), (z.a = !0);
                    return;
                }
                if (aa.b == 52 && oa(aa.g, ka) && na(ka)) {
                    var La = aa.g,
                        Va = aa.i,
                        wa = o(o(o(new Lh(22), r(ua)), r(Va)), r(ka));
                    I(a, o(o(new Lh(52), r(La)), wa)), (z.a = !0);
                    return;
                }
                break;
            case 25:
                for (var xa = a.g, eb = null; xa != a.i; xa = eb) (eb = xa.k), na(xa) && (r(xa), (z.a = !0));
                if (a.l.b == 25) {
                    ie(a), (z.a = !0);
                    return;
                }
                if (he(a)) {
                    I(a, r(a.g)), (z.a = !0);
                    return;
                }
                break;
            case 31:
                var Ia = a.g;
                Ia.b ^ 31
                    ? Ia.b ^ 30
                        ? Ia.b ^ 29 || gc(z, a, -Ia.h)
                        : hc(z, a, -(Ia.h | 0) | 0)
                    : (I(a, r(Ia.g)), (z.a = !0));
                break;
            case 32:
                var Ja = a.g;
                Ja.b ^ 32 ? Ja.b ^ 28 || T(z, a, !!!Ja.h) : (I(a, r(Ja.g)), (z.a = !0));
                break;
            case 33:
                I(a, r(a.g));
                break;
            case 38:
                var fb = a.g,
                    sb = a.i;
                cc(fb, 0)
                    ? (I(a, r(sb)), (z.a = !0))
                    : cc(sb, 0)
                    ? (I(a, r(fb)), (z.a = !0))
                    : fb.b == 30 && sb.b == 30
                    ? hc(z, a, ((fb.h | 0) + (sb.h | 0)) | 0)
                    : fb.b == 29 && sb.b == 29 && gc(z, a, fb.h + sb.h);
                break;
            case 39:
                var tb = a.g,
                    bb = a.i;
                cc(bb, 1)
                    ? (I(a, r(tb)), (z.a = !0))
                    : tb.b == 30 && bb.b == 30
                    ? hc(z, a, bb.h | 0 ? ((tb.h | 0) / (bb.h | 0)) | 0 : 0)
                    : tb.b == 29 && bb.b == 29 && gc(z, a, bb.h != 0 ? tb.h / bb.h : 0);
                break;
            case 40:
                var cb = a.g,
                    Ub = a.i;
                oa(cb, Ub) && na(cb)
                    ? (T(z, a, !0), (z.a = !0))
                    : cb.b == 30 && Ub.b == 30
                    ? T(z, a, (cb.h | 0) == (Ub.h | 0))
                    : cb.b == 29 && Ub.b == 29 && T(z, a, cb.h == Ub.h);
                break;
            case 41:
                var ub = a.g,
                    ic = a.i;
                ub.b == 30 && ic.b == 30
                    ? T(z, a, (ub.h | 0) > (ic.h | 0))
                    : ub.b == 29 && ic.b == 29 && T(z, a, ub.h > ic.h);
                break;
            case 42:
                var Ka = a.g,
                    Wa = a.i;
                Ka.b ^ 30
                    ? Wa.b ^ 30
                        ? Ka.b == 30 && Wa.b == 30
                            ? T(z, a, (Ka.h | 0) >= (Wa.h | 0))
                            : Ka.b == 29 && Wa.b == 29 && T(z, a, Ka.h >= Wa.h)
                        : ((a.b = 41), _(Wa, ((Wa.h | 0) - 1) | 0), (z.a = !0))
                    : ((a.b = 41), _(Ka, ((Ka.h | 0) + 1) | 0), (z.a = !0));
                break;
            case 43:
                var qc = a.g,
                    jc = a.i,
                    Oc = qc.f;
                if (jc.b == 30) {
                    var Ob = jc.h | 0,
                        Pb = 0;
                    switch (Oc) {
                        case Lb:
                        case vb:
                        case Fa:
                            Pb = 2;
                            break;
                        case Mb:
                        case wb:
                        case Ga:
                            Pb = 3;
                            break;
                        case Nb:
                        case xb:
                        case Ha:
                            Pb = 4;
                            break;
                    }
                    Ob > -1 && Ob < Pb && (I(a, s(bc(o(new Lh(21), r(qc)), "xyzw"[Ob]), a.f)), (z.a = !0));
                }
                break;
            case 44:
                var kc = a.g,
                    Qb = a.i;
                kc.b == 30 && Qb.b == 30
                    ? T(z, a, (kc.h | 0) < (Qb.h | 0))
                    : kc.b == 29 && Qb.b == 29 && T(z, a, kc.h < Qb.h);
                break;
            case 45:
                var Rb = a.g,
                    yb = a.i;
                Rb.b ^ 30
                    ? yb.b ^ 30
                        ? Rb.b == 30 && yb.b == 30
                            ? T(z, a, (Rb.h | 0) <= (yb.h | 0))
                            : Rb.b == 29 && yb.b == 29 && T(z, a, Rb.h <= yb.h)
                        : ((a.b = 44), _(yb, ((yb.h | 0) + 1) | 0), (z.a = !0))
                    : ((a.b = 44), _(Rb, ((Rb.h | 0) - 1) | 0), (z.a = !0));
                break;
            case 46:
                var Sb = a.g,
                    Pc = a.i;
                Sb.b == 28 && Ra(Sb)
                    ? (I(a, r(Pc)), (z.a = !0))
                    : Sb.b == 28 && Cb(Sb)
                    ? T(z, a, !1)
                    : Sb.b == 28 && Pc.b == 28 && T(z, a, !!Sb.h && !!Pc.h);
                break;
            case 47:
                var Vb = a.g,
                    rc = a.i;
                Vb.b == 28 && Cb(Vb)
                    ? (I(a, r(rc)), (z.a = !0))
                    : Vb.b == 28 && Ra(Vb)
                    ? T(z, a, !0)
                    : Vb.b == 28 && rc.b == 28 && T(z, a, !!Vb.h && !!rc.h);
                break;
            case 48:
                var Ta = a.g,
                    lc = a.i;
                Ta.b == 28 && lc.b == 28 && T(z, a, !!Ta.h != !!lc.h);
                break;
            case 49:
                var Ma = a.g,
                    zb = a.i;
                Ma.b == 30 && (Ma.h | 0) == 1
                    ? (I(a, r(zb)), (z.a = !0))
                    : zb.b == 30 && (zb.h | 0) == 1
                    ? (I(a, r(Ma)), (z.a = !0))
                    : Ma.b == 30 && zb.b == 30
                    ? hc(z, a, sh(Ma.h | 0, zb.h | 0))
                    : Ma.b == 29 && zb.b == 29 && gc(z, a, Ma.h * zb.h);
                break;
            case 50:
                var gb = a.g,
                    mc = a.i;
                oa(gb, mc) && na(gb)
                    ? (T(z, a, !1), (z.a = !0))
                    : gb.b == 30 && mc.b == 30
                    ? T(z, a, (gb.h | 0) != (mc.h | 0))
                    : gb.b == 29 && mc.b == 29 && T(z, a, gb.h != mc.h);
                break;
            case 51:
                var nc = a.g,
                    Wb = a.i;
                cc(nc, 0)
                    ? (I(a, s(o(new Lh(31), r(Wb)), a.f)), (z.a = !0))
                    : cc(Wb, 0)
                    ? (I(a, r(nc)), (z.a = !0))
                    : nc.b == 30 && Wb.b == 30
                    ? hc(z, a, ((nc.h | 0) - (Wb.h | 0)) | 0)
                    : nc.b == 29 && Wb.b == 29 && gc(z, a, nc.h - Wb.h);
                break;
        }
    }
    function T(c, a, b) {
        I(a, s(s(Ba(new Lh(28), b), Y), Y)), (c.a = !0);
    }
    function gc(c, a, b) {
        I(a, s(s(ma(new Lh(29), b), da), Y)), (c.a = !0);
    }
    function hc(c, a, b) {
        I(a, s(s(_(new Lh(30), b), ga), Y)), (c.a = !0);
    }
    function Jc(b, a) {
        a.b == 3 && he(a) && (ea(a, r(a.g)), (b.a = !0));
    }
    function He(b, a) {
        Na(b.c, a.c, a);
    }
    function Dg(b, a) {
        Na(b.c, a.c, a);
    }
    function qd(c, a) {
        var b = ya(c.c, a, null);
        return b || (c.b && qd(c.b, a));
    }
    function Eg(a) {
        return new Sh(a, 0, a.b.length);
    }
    function Fg(d, a) {
        if ((rd(d), a < 0 || a >= d.d.length)) return "";
        var b = d.d[a],
            c = ((a + 1) | 0) < d.d.length ? (d.d[(a + 1) | 0] - 1) | 0 : d.b.length;
        return d.b.slice(b, c);
    }
    function Jb(h, a) {
        rd(h);
        for (var b = h.d.length, c = 0; b > 0; ) {
            var d = (b / 2) | 0,
                e = (c + d) | 0;
            h.d[e] <= a ? ((c = (e + 1) | 0), (b = (((b - d) | 0) - 1) | 0)) : (b = d);
        }
        var f = c > 0 ? (a - h.d[(c - 1) | 0]) | 0 : a;
        return new Yh((c - 1) | 0, f);
    }
    function Kb(d, a, b) {
        if ((rd(d), a > -1 && a < d.d.length)) {
            var c = d.d[a];
            if (b > -1 && ((c + b) | 0) < (((a + 1) | 0) < d.d.length ? d.d[(a + 1) | 0] : d.b.length))
                return (c + b) | 0;
        }
        return -1;
    }
    function rd(b) {
        if (!b.d) {
            b.d = [0];
            for (var a = 0, c = b.b.length; a < c; a = (a + 1) | 0) b.b.charCodeAt(a) ^ 10 || b.d.push((a + 1) | 0);
        }
    }
    function sd(a) {
        switch (a) {
            case 2:
                return eh;
            case 3:
                return fh;
            case 4:
                return gh;
        }
        return null;
    }
    function td(a, b) {
        switch (a) {
            case Y:
                switch (b) {
                    case 1:
                        return Y;
                    case 2:
                        return Lb;
                    case 3:
                        return Mb;
                    case 4:
                        return Nb;
                }
                break;
            case da:
                switch (b) {
                    case 1:
                        return da;
                    case 2:
                        return Fa;
                    case 3:
                        return Ga;
                    case 4:
                        return Ha;
                }
                break;
            case ga:
                switch (b) {
                    case 1:
                        return ga;
                    case 2:
                        return vb;
                    case 3:
                        return wb;
                    case 4:
                        return xb;
                }
                break;
        }
        return null;
    }
    function ud(a) {
        return a instanceof Ie && (a.v == 0 || a.v == 2);
    }
    function K(a) {
        return a.l || (a.l = new ai(a, null, 0)), a.l;
    }
    function Gg(c, a) {
        if (c.n.length ^ a.n.length) return !1;
        for (var b = 0, d = c.n.length; b < d; b = (b + 1) | 0) if (c.n[b].q.f != a.n[b].q.f) return !1;
        return !0;
    }
    function P(a) {
        var b;
        return (b = a.E) && b.g;
    }
    function Kc(a, b, c) {
        for (var d = b.b.split(hh), e = [], f = null, h = 0, m = 0, l = 0, q = d.length; l < q; l = (l + 1) | 0) {
            var g = d[l],
                i = g.length,
                n = (m + i) | 0,
                k = new Sh(b, m, n);
            if (l % 2) {
                var p = g.charCodeAt(0);
                if ((p > 64 && p < 91) || (p > 96 && p < 123) || p == 95) {
                    var t = ya(Ig, g, 99);
                    t ^ 99 ? e.push(new $h(k, t, f)) : Jg.has(g) ? Jf(a, k) : e.push(new $h(k, 96, f));
                } else if ((p > 47 && p < 58) || (p == 46 && i > 1)) e.push(new $h(k, ih.test(g) ? 97 : 95, f));
                else if (p ^ 35) {
                    if (p ^ 34) {
                        var v = ya(jh, g, 99);
                        v ^ 99 ||
                            (g.startsWith("//")
                                ? c ^ 1
                                    ? (f || (f = [])).push(k)
                                    : (v = 0)
                                : g.startsWith("/*") && (c ^ 1 ? (f || (f = [])).push(k) : (v = 1))),
                            v ^ 99 && e.push(new $h(k, v, f));
                    } else e.push(new $h(k, 98, f));
                } else {
                    var w = 94;
                    switch (g) {
                        case "#version":
                            w = 92;
                            break;
                        case "#extension":
                            w = 91;
                            break;
                        case "#include":
                            w = 93;
                            break;
                    }
                    e.push(new $h(k, w, f));
                }
            } else if (g != "") {
                u(a, k, 'Syntax error "' + g + '"');
                break;
            }
            e.length ^ h && ((f = null), (h = e.length)), (m = n);
        }
        return e.push(new $h(new Sh(b, m, m), 99, f)), e;
    }
    function Je(a) {
        return a.b ? Je(a.b) : a;
    }
    function Kg(c, a) {
        c.f || (c.f = new Map());
        var b = ra(c.f, a, null);
        return b || (za(c.f, a, (b = new ai(null, c, a))), (b.d = !0), (b.e = c.e)), b;
    }
    function C(a) {
        return a.b ? (a.c ? C(a.b) + "[" + a.c + "]" : C(a.b) + "[]") : a.a.c;
    }
    function Sa(a) {
        switch (a) {
            case Lb:
            case Fa:
            case vb:
            case ob:
                return 2;
            case Mb:
            case Ga:
            case wb:
            case pb:
                return 3;
            case Nb:
            case Ha:
            case xb:
            case qb:
                return 4;
        }
        return a.c;
    }
    function wd(a) {
        switch (a) {
            case Lb:
            case Mb:
            case Nb:
                return Y;
            case Fa:
            case Ga:
            case Ha:
                return da;
            case vb:
            case wb:
            case xb:
                return ga;
            case ob:
                return Fa;
            case pb:
                return Ga;
            case qb:
                return Ha;
        }
        return a.b;
    }
    function Ea(a) {
        switch (a) {
            case Y:
            case da:
            case ga:
                return 1;
            case Lb:
            case Fa:
            case vb:
                return 2;
            case Mb:
            case Ga:
            case wb:
                return 3;
            case Nb:
            case Ha:
            case xb:
            case ob:
                return 4;
            case pb:
                return 9;
            case qb:
                return 16;
        }
        return 0;
    }
    function fa(a) {
        switch (a) {
            case Y:
            case Lb:
            case Mb:
            case Nb:
                return Y;
            case da:
            case Fa:
            case Ga:
            case Ha:
            case ob:
            case pb:
            case qb:
                return da;
            case ga:
            case vb:
            case wb:
            case xb:
                return ga;
        }
        return null;
    }
    function xd(a) {
        switch (a) {
            case Lb:
            case Mb:
            case Nb:
            case vb:
            case wb:
            case xb:
            case Fa:
            case Ga:
            case Ha:
                return !0;
        }
        return !1;
    }
    function ab(a) {
        switch (a) {
            case ob:
            case pb:
            case qb:
                return !0;
        }
        return !1;
    }
    function Lc(a) {
        switch (a) {
            case ga:
            case vb:
            case wb:
            case xb:
                return !0;
        }
        return !1;
    }
    function Mc(a) {
        switch (a) {
            case da:
            case Fa:
            case Ga:
            case Ha:
                return !0;
            case ob:
            case pb:
            case qb:
                return !0;
        }
        return !1;
    }
    function Lg(a) {
        return Lc(a) || Mc(a);
    }
    function Mg(a) {
        return !a.e && !a.d;
    }
    function Ke(a) {
        return (a.e = !0), a;
    }
    function Le(b) {
        var a = b.a.length;
        return b.a.push(a), a;
    }
    function yd(c, a, b) {
        c.a[Nc(c, a)] = Nc(c, b);
    }
    function Nc(c, a) {
        var b = c.a[a];
        return b ^ a && ((b = Nc(c, b)), (c.a[a] = b)), b;
    }
    function qa(a, b) {
        Me(a), process.stdout.write(b), Me(0);
    }
    function Qg(a) {
        qa(3, "error: "), qa(1, a + "\n");
    }
    function Rg(a) {
        qa(2, "note: "), qa(1, a + "\n");
    }
    function Sg(a) {
        qa(7, "warning: "), qa(1, a + "\n");
    }
    function Ne(a) {
        for (var b = process.stdout.columns, l = 0, g = a.a, i = g.length; l < i; l = (l + 1) | 0) {
            var c = g[l];
            c.b && qa(1, kd(c.b) + ": ");
            switch (c.a) {
                case 1:
                    Sg(c.c);
                    break;
                case 0:
                    Qg(c.c);
                    break;
            }
            if (c.b) {
                var d = ld(c.b, b);
                qa(2, d.a + "\n"), qa(4, d.b + "\n");
            }
            if (c.d) {
                qa(1, kd(c.d) + ": "), Rg(c.e);
                var e = ld(c.d, b);
                qa(2, e.a + "\n"), qa(4, e.b + "\n");
            }
        }
        var f = a.d != 0,
            h = a.c != 0,
            m = "";
        h && ((m += a.c + " warning" + (a.c ^ 1 ? "s" : "")), f && (m += " and ")),
            f && (m += a.d + " error" + (a.d ^ 1 ? "s" : "")),
            (h || f) && process.stdout.write(m + " generated\n");
    }
    function Oe(a) {
        if (th(a)) return [new Zh("<stdin>", a)];
        if (a instanceof Array) {
            for (var b = [], c = 0, e = a.length; c < e; c = (c + 1) | 0) {
                var d = a[c];
                b.push(new Zh(uh(d.name), uh(d.contents)));
            }
            return b;
        }
        return [new Zh(uh(a.name), uh(a.contents))];
    }
    function Pe(a) {
        return function (b, c) {
            var d = a(b, c);
            if (th(d)) return new Zh(b, d);
            if (!d) return null;
            var e = d.name,
                f = d.contents;
            if (th(e) && th(f)) return new Zh(e, f);
            throw new Error("Invalid file access result");
        };
    }
    function Tg() {
        var a = process.argv.slice(2),
            b = new vh(),
            c = [],
            d = 0,
            e = null,
            f = require("fs"),
            h = require("path");
        b.e = function (m, l) {
            var g = h.resolve(h.dirname(l), m);
            try {
                return new Zh(g, f.readFileSync(g, "utf8"));
            } catch (q) {}
            return null;
        };
        for (var w = 0, v = a.length; w < v; w = (w + 1) | 0) {
            var i = a[w];
            if (i.startsWith("-"))
                switch (i) {
                    case "--disable-rewriting":
                        b.a = !1;
                        break;
                    case "--pretty-print":
                        b.b = !1;
                        break;
                    case "--keep-symbols":
                        b.d = !1;
                        break;
                    case "--help":
                    case "-h":
                        console.log(
                            "\nUsage: glslx [sources] [flags]\n\n  --output=PATH\n    Set the path to the output file. Defaults to standard out.\n\n  --format=FORMAT\n    Set the output format, must be json, js, c++, skew or rust. Defaults to json.\n\nAdvanced:\n\n  --disable-rewriting\n    Disable syntax tree rewriting, useful to check for driver bugs.\n\n  --pretty-print\n    Format the output nicely instead of minifying it.\n\n  --renaming=MODE\n    Valid modes are all, internal-only, or none. Defaults to all.\n\n  --keep-symbols\n    Don't inline constants or remove unused symbols.\n"
                        );
                        return;
                    default:
                        if (i.startsWith("--output=")) e = i.slice(9);
                        else if (i.startsWith("--format=")) {
                            var n = i.slice(9);
                            Se.has(n) || (console.log('invalid output format "' + n + '"'), process.exit(1)),
                                (d = Se.get(n));
                        } else if (i.startsWith("--renaming=")) {
                            var k = i.slice(11);
                            Te.has(k) || (console.log('invalid symbol renaming mode "' + k + '"'), process.exit(1)),
                                (b.c = Te.get(k));
                        } else console.log('invalid flag "' + i + '"'), process.exit(1);
                        break;
                }
            else c.push(new Zh(h.resolve(i), f.readFileSync(i, "utf8")));
        }
        if (c.length) {
            var p = new Kh(),
                t = Id(p, c, b);
            t
                ? e != null
                    ? (f.writeFileSync(e, Sc(t, d)), Ne(p))
                    : process.stdout.write(Sc(t, d))
                : (Ne(p), process.exit(1));
        } else
            console.log(
                "\nUsage: glslx [sources] [flags]\n\n  --output=PATH\n    Set the path to the output file. Defaults to standard out.\n\n  --format=FORMAT\n    Set the output format, must be json, js, c++, skew or rust. Defaults to json.\n\nAdvanced:\n\n  --disable-rewriting\n    Disable syntax tree rewriting, useful to check for driver bugs.\n\n  --pretty-print\n    Format the output nicely instead of minifying it.\n\n  --renaming=MODE\n    Valid modes are all, internal-only, or none. Defaults to all.\n\n  --keep-symbols\n    Don't inline constants or remove unused symbols.\n"
            );
    }
    function ci() {
        var a = (function () {
                return this;
            })(),
            b = typeof exports !== "undefined" ? exports : (a.GLSLX = {});
        (b.compile = lh),
            (b.compileIDE = mh),
            (b.format = nh),
            typeof require !== "undefined" && typeof module !== "undefined" && require.main === module && Tg();
    }
    function cd(a) {
        return a > 27 && a < 31;
    }
    function dd(a) {
        return a > 30 && a < 38;
    }
    function Tf(a) {
        return a > 30 && a < 36;
    }
    function ed(a) {
        return a > 33 && a < 38;
    }
    function Bc(a) {
        return a > 37 && a < 57;
    }
    function Cc(a) {
        return a > 51 && a < 57;
    }
    function Uf(a) {
        return a == 4 || a == 5 || a == 6 || a == 15;
    }
    function ee(a) {
        return a == 7 || a == 10 || a == 19;
    }
    function $a(b) {
        var a = "";
        return (
            b & 1 && (a += "attribute "),
            b & 2 && (a += "const "),
            b & 256 && (a += "uniform "),
            b & 512 && (a += "varying "),
            b & 4 && (a += "highp "),
            b & 32 && (a += "lowp "),
            b & 64 && (a += "mediump "),
            b & 8 && (a += "in "),
            b & 16 && (a += "inout "),
            b & 128 && (a += "out "),
            a
        );
    }
    function Hg(a) {
        return a > 49 && a < 80;
    }
    function vd(a) {
        switch (a) {
            case 96:
            case 42:
            case 33:
            case 34:
            case 14:
            case 39:
            case 40:
            case 41:
            case 20:
            case 22:
            case 23:
            case 24:
            case 3:
            case 5:
            case 6:
            case 7:
            case 26:
            case 27:
            case 28:
                return !0;
        }
        return !1;
    }
    function Me(a) {
        process.stdout.isTTY && process.stdout.write("\x1B[0;" + kh.get(a) + "m");
    }
    function hb(b, a) {
        return (b[(b.length - 1) | 0] = a);
    }
    function Rc(a) {
        return a[(a.length - 1) | 0];
    }
    function $e(c, a) {
        for (var d = 0, e = a.length; d < e; d = (d + 1) | 0) {
            var b = a[d];
            c.push(b);
        }
    }
    function Ab(d, a) {
        for (var b = 0, c = 0, e = d.length; c < e; c = (c + 1) | 0)
            a(d[c]) || (b < c && (d[b] = d[c]), (b = (b + 1) | 0));
        for (; b < d.length; ) d.pop();
    }
    function Na(c, a, b) {
        return c.set(a, b), b;
    }
    function j(c, a, b) {
        return c.set(a, b), c;
    }
    function ya(d, a, b) {
        var c = d.get(a);
        return c !== void 0 ? c : b;
    }
    function za(c, a, b) {
        return c.set(a, b), b;
    }
    function Oa(c, a, b) {
        return c.set(a, b), c;
    }
    function ra(d, a, b) {
        var c = d.get(a);
        return c !== void 0 ? c : b;
    }
    function Qc(b, a) {
        return (((a < b) | 0) - ((a > b) | 0)) | 0;
    }
    function sc(a) {
        for (var b = new ph(), d = 0, e = a.length; d < e; d = (d + 1) | 0) {
            var c = a[d];
            b.a += Ye(c);
        }
        return b.a;
    }
    function _e(b, a) {
        return (((a < b) | 0) - ((a > b) | 0)) | 0;
    }
    function Xb(d, a) {
        for (var b = "", c = 0; c < a; c = (c + 1) | 0) b += d;
        return b;
    }
    function Ye(a) {
        return a < 65536
            ? String.fromCharCode(a)
            : String.fromCharCode((((a - 65536) >> 10) + 55296) | 0) +
                  String.fromCharCode((((a - 65536) & 1023) + 56320) | 0);
    }
    function pc(a) {
        if (!a) return null;
        var b = a.a,
            c = Jb(b, a.b),
            d = Jb(b, a.c);
        return { source: b.a, start: { line: c.a, column: c.b }, end: { line: d.a, column: d.b } };
    }
    function lh(a, b) {
        b = b || {};
        var c = Oe(a),
            d = new Kh(),
            e = new vh();
        (e.c = ya(Te, b.renaming, 0)),
            b.disableRewriting && (e.a = !1),
            b.prettyPrint && (e.b = !1),
            b.keepSymbols && (e.d = !1),
            b.fileAccess && (e.e = Pe(b.fileAccess));
        var f = Id(d, c, e);
        return { log: Hf(d), output: f ? Sc(f, ya(Se, b.format, 0)) : null };
    }
    function mh(a, b) {
        b = b || {};
        var c = Oe(a),
            d = new Kh(),
            e = new vh();
        b.fileAccess && (e.e = Pe(b.fileAccess));
        var f = af(d, c, e),
            h = function (m) {
                for (
                    var z,
                        l = m.source + "",
                        g = m.line | 0,
                        i = m.column | 0,
                        n = !!m.ignoreDiagnostics,
                        k = null,
                        p = null,
                        t = null,
                        Bd = 0,
                        Wg = c.length;
                    Bd < Wg;
                    Bd = (Bd + 1) | 0
                ) {
                    var w = c[Bd];
                    if (w.a == l) {
                        var v = Kb(w, g, i);
                        if (~v) {
                            if (!n && d)
                                for (var Ad = 0, Ue = d.a, Vg = Ue.length; Ad < Vg; Ad = (Ad + 1) | 0) {
                                    var q = Ue[Ad];
                                    if (q.b && q.b.a == w && fc(q.b, v)) {
                                        (p = new Bh(q.c, "")), (k = q.b);
                                        break;
                                    }
                                }
                            if (!p && f) {
                                var E = new Ch(w, v);
                                Pa(E, f.a), (p = Af(E)), p && ((k = E.e), (t = (z = E.d) && z.c));
                            }
                        }
                        break;
                    }
                }
                return { tooltip: p && p.a, range: pc(k), symbol: t, documentation: p && p.b };
            },
            F = function (H) {
                for (
                    var O = H.source + "",
                        ha = H.line | 0,
                        L = H.column | 0,
                        ia = null,
                        Z = null,
                        $ = null,
                        Cd = 0,
                        Ve = f.b,
                        Xg = Ve.length;
                    Cd < Xg;
                    Cd = (Cd + 1) | 0
                ) {
                    var ca = Ve[Cd];
                    if (ca.a.a.a == O) {
                        var ua = Kb(ca.a.a, ha, L);
                        if (~ua && fc(ca.a, ua)) return { definition: pc(ca.b), range: pc(ca.a), symbol: ca.b.a.a };
                    }
                }
                for (var Dd = 0, Yg = c.length; Dd < Yg; Dd = (Dd + 1) | 0) {
                    var aa = c[Dd];
                    if (aa.a == O) {
                        var ka = Kb(aa, ha, L);
                        if (~ka && f) {
                            var va = new Ch(aa, ka);
                            Pa(va, f.a),
                                va.d && va.d.b && va.d.b.a.a != "<api>" && ((Z = va.d.b), (ia = va.e), ($ = va.d.c));
                        }
                        break;
                    }
                }
                return { definition: pc(Z), range: pc(ia), symbol: $ };
            },
            Ua = function (la) {
                for (var rb = la.source + "", La = null, Ed = 0, Zg = c.length; Ed < Zg; Ed = (Ed + 1) | 0) {
                    var Va = c[Ed];
                    if (Va.a == rb) {
                        if (f) {
                            var wa = new Dh(Va);
                            Zd(wa, f.a),
                                (La = wa.b.map(function (xa) {
                                    return {
                                        name: xa.c,
                                        kind:
                                            xa instanceof Ie
                                                ? "variable"
                                                : xa instanceof oc
                                                ? "function"
                                                : xa instanceof Tb
                                                ? "struct"
                                                : null,
                                        range: pc(xa.b),
                                    };
                                }));
                        }
                        break;
                    }
                }
                return { symbols: La };
            },
            eb = function (Ia) {
                for (
                    var Ja = Ia.source + "",
                        fb = Ia.line | 0,
                        sb = Ia.column | 0,
                        tb = null,
                        bb = null,
                        Fd = 0,
                        _g = c.length;
                    Fd < _g;
                    Fd = (Fd + 1) | 0
                ) {
                    var cb = c[Fd];
                    if (cb.a == Ja) {
                        var Ub = Kb(cb, fb, sb);
                        if (~Ub && f) {
                            var ub = new Eh(cb, Ub);
                            Df(ub, f.a),
                                ub.d && ub.d.b && ub.d.b.a.a != "<api>" && ((tb = ub.c.map(pc)), (bb = ub.d.c));
                        }
                        break;
                    }
                }
                return { ranges: tb, symbol: bb };
            },
            ic = function (Ka) {
                for (
                    var Wa = Ka.source + "", qc = Ka.line | 0, jc = Ka.column | 0, Oc = [], Gd = 0, $g = c.length;
                    Gd < $g;
                    Gd = (Gd + 1) | 0
                ) {
                    var Ob = c[Gd];
                    if (Ob.a == Wa) {
                        var Pb = Kb(Ob, qc, jc);
                        if (~Pb && f) {
                            var kc = new Gh(Ob, Pb);
                            Gf(kc, f.a),
                                (Oc = kc.d.map(function (Qb) {
                                    return { kind: Qb.a, name: Qb.b, detail: Qb.c, documentation: Qb.d };
                                }));
                        }
                    }
                }
                return { completions: Oc };
            },
            Rb = function (yb) {
                for (
                    var Sb = yb.source + "",
                        Pc = yb.line | 0,
                        Vb = yb.column | 0,
                        rc = [],
                        Ta = -1,
                        lc = -1,
                        Hd = 0,
                        ah = c.length;
                    Hd < ah;
                    Hd = (Hd + 1) | 0
                ) {
                    var Ma = c[Hd];
                    if (Ma.a == Sb) {
                        var zb = Kb(Ma, Pc, Vb);
                        if (~zb && f) {
                            var gb = new Ih(Ma, zb);
                            ad(gb, f.a),
                                (Ta = gb.d),
                                (lc = gb.e),
                                (rc = gb.c.map(function (mc) {
                                    return { text: mc.a, arguments: mc.b, documentation: mc.c };
                                }));
                        }
                    }
                }
                return { signatures: rc, activeArgument: Ta, activeSignature: lc };
            };
        return {
            unusedSymbols: d.b.map(function (nc) {
                return { name: nc.c, range: pc(nc.b) };
            }),
            diagnostics: d.a.map(function (Wb) {
                return { kind: oh[Wb.a].toLowerCase(), range: pc(Wb.b), text: Wb.c };
            }),
            tooltipQuery: h,
            definitionQuery: F,
            symbolsQuery: Ua,
            renameQuery: eb,
            completionQuery: ic,
            signatureQuery: Rb,
        };
    }
    function nh(a, b) {
        b = b || {};
        var c = "indent" in b ? uh(b.indent) : "  ",
            d = "newline" in b ? uh(b.newline) : "\n",
            e = 2;
        if ("trailingNewline" in b) {
            var f = uh(b.trailingNewline);
            switch (f) {
                case "preserve":
                    e = 0;
                    break;
                case "remove":
                    e = 1;
                    break;
                case "insert":
                    e = 2;
                    break;
                default:
                    throw new Error('Invalid "trailingNewline" value: ' + f);
            }
        }
        return zf(uh(a), c, d, e);
    }
    function ph() {
        this.a = "";
    }
    function qh() {
        (this.a = ""), (this.b = 0), (this.c = 0);
    }
    function vh() {
        (this.a = !0), (this.b = !0), (this.c = 0), (this.d = !0), (this.e = null);
    }
    function wh(a) {
        (this.a = new Map()), (this.b = a), (this.c = 0);
    }
    function xh(a, b) {
        (this.a = a), (this.b = b);
    }
    function yh(a, b) {
        (this.a = a), (this.b = b);
    }
    function zh() {
        (this.a = []), (this.b = []);
    }
    function Ah(a, b) {
        (this.a = ""),
            (this.b = ""),
            (this.c = "\n"),
            (this.d = " "),
            (this.e = b.b),
            this.e && ((this.d = ""), (this.c = ""));
        for (var c = null, d = a.g; d; d = d.k)
            gf(this, d) || (c && ff(c, d) && (this.a += this.c), Xa(this, d), (this.a += this.c), (c = d));
    }
    function Bh(a, b) {
        (this.a = a), (this.b = b);
    }
    function Ch(a, b) {
        (this.a = a), (this.b = b), (this.c = null), (this.d = null), (this.e = null), (this.f = null), (this.h = null);
    }
    function Dh(a) {
        (this.a = a), (this.b = []);
    }
    function Eh(a, b) {
        (this.a = a), (this.b = b), (this.c = []), (this.d = null);
    }
    function Fh(a, b) {
        (this.a = a), (this.b = b), (this.c = ""), (this.d = "");
    }
    function Gh(a, b) {
        (this.a = a), (this.b = b), (this.c = new Map()), (this.d = []);
    }
    function Hh(a, b, c) {
        (this.a = a), (this.b = b), (this.c = c);
    }
    function Ih(a, b) {
        (this.a = a), (this.b = b), (this.c = []), (this.d = -1), (this.e = -1);
    }
    function Jh(a, b, c) {
        (this.a = a), (this.b = b), (this.c = c), (this.d = null), (this.e = "");
    }
    function Kh() {
        (this.a = []), (this.b = []), (this.c = 0), (this.d = 0), (this.e = null);
    }
    function Lh(a) {
        (this.a = ne()),
            (this.b = a),
            (this.c = null),
            (this.d = null),
            (this.e = null),
            (this.f = null),
            (this.h = 0),
            (this.m = null),
            (this.l = null),
            (this.g = null),
            (this.i = null),
            (this.n = null),
            (this.k = null),
            (this.p = !1);
    }
    function Mh(a) {
        this.a = a;
    }
    function Nh(a, b) {
        (this.a = a), (this.b = b);
    }
    function Oh(a, b, c, d, e) {
        (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.e = e),
            (this.f = []),
            (this.h = 0),
            (this.m = 0),
            (this.l = null);
    }
    function Ph(a) {
        (this.a = a), (this.b = null), (this.c = null);
    }
    function Qh() {
        this.a = new Map();
    }
    function Rh(a, b) {
        (this.a = a), (this.b = b);
    }
    function Sh(a, b, c) {
        (this.a = a), (this.b = b), (this.c = c);
    }
    function Uh(a, b) {
        (this.a = a), (this.b = b), (this.c = new Map()), (this.d = 0), (this.e = !1);
    }
    function Th(a) {
        (this.a = a),
            (this.b = []),
            (this.c = []),
            (this.d = new Map()),
            (this.e = new bi()),
            (this.f = new bi()),
            (this.h = 0),
            (this.m = 0),
            (this.l = -1);
    }
    function Vh(a, b) {
        (this.a = a), (this.b = b), (this.c = new zh()), (this.d = []), (this.e = new Map()), (this.f = null);
    }
    function Wh() {
        (this.a = !1), (this.b = []), (this.c = new Map()), (this.d = new Map()), (this.e = new Map());
    }
    function Xh(a, b) {
        (this.a = a), (this.b = b), (this.c = new Map());
    }
    function Yh(a, b) {
        (this.a = a), (this.b = b);
    }
    function Zh(a, b) {
        (this.a = a), (this.b = b), (this.c = null), (this.d = null);
    }
    function _h(a, b, c, d) {
        (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.e = 0),
            (this.f = null),
            (this.h = null),
            (this.m = null),
            (this.l = null),
            (this.g = 0);
    }
    function Tb(a, b, c, d) {
        _h.call(this, a, b, c, d), (this.i = []);
    }
    rh(Tb, _h);
    function oc(a, b, c, d) {
        _h.call(this, a, b, c, d), (this.n = []), (this.k = null), (this.p = null), (this.t = null), (this.w = null);
    }
    rh(oc, _h);
    function Ie(a, b, c, d, e) {
        _h.call(this, a, b, c, d), (this.v = e), (this.q = null), (this.E = null), (this.F = null);
    }
    rh(Ie, _h);
    function $h(a, b, c) {
        (this.a = a), (this.b = b), (this.c = c);
    }
    function ai(a, b, c) {
        (this.a = a), (this.b = b), (this.c = c), (this.d = !1), (this.e = !1), (this.f = null);
    }
    function bi() {
        this.a = [];
    }
    var bh = new qh(),
        Re = 0,
        db = null,
        cg = j(j(j(j(new Map(), "disable", 1), "enable", 2), "require", 3), "warn", 4),
        dh = j(
            j(j(j(new Map(), "GL_OES_standard_derivatives", 0), "GL_EXT_frag_depth", 0), "GL_EXT_draw_buffers", 0),
            "GL_EXT_shader_texture_lod",
            0
        ),
        eh = ["xy", "st", "rg"],
        fh = ["xyz", "stp", "rgb"],
        gh = ["xyzw", "stpq", "rgba"],
        hh = new RegExp(
            '(\\.[0-9]+[eE][+-]?[0-9]+\\b|\\.[0-9]+\\b|[0-9]+\\.[0-9]+[eE][+-]?[0-9]+\\b|[0-9]+\\.[0-9]+\\b|[0-9]+\\.[eE][+-]?[0-9]+\\b|[0-9]+\\.|[0-9]+[eE][+-]?[0-9]+\\b|[1-9][0-9]*\\b|0[0-7]*\\b|0[xX][0-9A-Fa-f]+\\b|[ \t\r\n]|/\\*(?:.|\r\n|\n)*?\\*/|//.*|&&|\\|\\||\\^\\^|\\+\\+|--|<<=?|>>=?|[()[\\]{}\\.,?:;]|[+\\-*/%=!<>&|^~]=?|[A-Za-z_][A-Za-z0-9_]*\\b|#\\w+\\b|"(?:[^"\\\\]|\\\\.)*")'
        ),
        ih = new RegExp("^([1-9][0-9]*|0[0-7]*|0[xX][0-9A-Fa-f]+)$"),
        Ig = j(
            j(
                j(
                    j(
                        j(
                            j(
                                j(
                                    j(
                                        j(
                                            j(
                                                j(
                                                    j(
                                                        j(
                                                            j(
                                                                j(
                                                                    j(
                                                                        j(
                                                                            j(
                                                                                j(
                                                                                    j(
                                                                                        j(
                                                                                            j(
                                                                                                j(
                                                                                                    j(
                                                                                                        j(
                                                                                                            j(
                                                                                                                j(
                                                                                                                    j(
                                                                                                                        j(
                                                                                                                            j(
                                                                                                                                j(
                                                                                                                                    j(
                                                                                                                                        j(
                                                                                                                                            j(
                                                                                                                                                j(
                                                                                                                                                    j(
                                                                                                                                                        j(
                                                                                                                                                            j(
                                                                                                                                                                j(
                                                                                                                                                                    j(
                                                                                                                                                                        j(
                                                                                                                                                                            j(
                                                                                                                                                                                j(
                                                                                                                                                                                    j(
                                                                                                                                                                                        new Map(),
                                                                                                                                                                                        "attribute",
                                                                                                                                                                                        2
                                                                                                                                                                                    ),
                                                                                                                                                                                    "bool",
                                                                                                                                                                                    3
                                                                                                                                                                                ),
                                                                                                                                                                                "break",
                                                                                                                                                                                4
                                                                                                                                                                            ),
                                                                                                                                                                            "bvec2",
                                                                                                                                                                            5
                                                                                                                                                                        ),
                                                                                                                                                                        "bvec3",
                                                                                                                                                                        6
                                                                                                                                                                    ),
                                                                                                                                                                    "bvec4",
                                                                                                                                                                    7
                                                                                                                                                                ),
                                                                                                                                                                "const",
                                                                                                                                                                8
                                                                                                                                                            ),
                                                                                                                                                            "continue",
                                                                                                                                                            9
                                                                                                                                                        ),
                                                                                                                                                        "discard",
                                                                                                                                                        10
                                                                                                                                                    ),
                                                                                                                                                    "do",
                                                                                                                                                    11
                                                                                                                                                ),
                                                                                                                                                "else",
                                                                                                                                                12
                                                                                                                                            ),
                                                                                                                                            "false",
                                                                                                                                            13
                                                                                                                                        ),
                                                                                                                                        "float",
                                                                                                                                        14
                                                                                                                                    ),
                                                                                                                                    "for",
                                                                                                                                    15
                                                                                                                                ),
                                                                                                                                "highp",
                                                                                                                                16
                                                                                                                            ),
                                                                                                                            "if",
                                                                                                                            17
                                                                                                                        ),
                                                                                                                        "in",
                                                                                                                        18
                                                                                                                    ),
                                                                                                                    "inout",
                                                                                                                    19
                                                                                                                ),
                                                                                                                "int",
                                                                                                                20
                                                                                                            ),
                                                                                                            "invariant",
                                                                                                            21
                                                                                                        ),
                                                                                                        "ivec2",
                                                                                                        22
                                                                                                    ),
                                                                                                    "ivec3",
                                                                                                    23
                                                                                                ),
                                                                                                "ivec4",
                                                                                                24
                                                                                            ),
                                                                                            "lowp",
                                                                                            25
                                                                                        ),
                                                                                        "mat2",
                                                                                        26
                                                                                    ),
                                                                                    "mat3",
                                                                                    27
                                                                                ),
                                                                                "mat4",
                                                                                28
                                                                            ),
                                                                            "mediump",
                                                                            29
                                                                        ),
                                                                        "out",
                                                                        30
                                                                    ),
                                                                    "precision",
                                                                    31
                                                                ),
                                                                "return",
                                                                32
                                                            ),
                                                            "sampler2D",
                                                            33
                                                        ),
                                                        "samplerCube",
                                                        34
                                                    ),
                                                    "struct",
                                                    35
                                                ),
                                                "true",
                                                36
                                            ),
                                            "uniform",
                                            37
                                        ),
                                        "varying",
                                        38
                                    ),
                                    "vec2",
                                    39
                                ),
                                "vec3",
                                40
                            ),
                            "vec4",
                            41
                        ),
                        "void",
                        42
                    ),
                    "while",
                    43
                ),
                "export",
                44
            ),
            "import",
            45
        ),
        jh = j(
            j(
                j(
                    j(
                        j(
                            j(
                                j(
                                    j(
                                        j(
                                            j(
                                                j(
                                                    j(
                                                        j(
                                                            j(
                                                                j(
                                                                    j(
                                                                        j(
                                                                            j(
                                                                                j(
                                                                                    j(
                                                                                        j(
                                                                                            j(
                                                                                                j(
                                                                                                    j(
                                                                                                        j(
                                                                                                            j(
                                                                                                                j(
                                                                                                                    j(
                                                                                                                        j(
                                                                                                                            j(
                                                                                                                                j(
                                                                                                                                    j(
                                                                                                                                        j(
                                                                                                                                            j(
                                                                                                                                                j(
                                                                                                                                                    j(
                                                                                                                                                        j(
                                                                                                                                                            j(
                                                                                                                                                                j(
                                                                                                                                                                    j(
                                                                                                                                                                        j(
                                                                                                                                                                            j(
                                                                                                                                                                                j(
                                                                                                                                                                                    j(
                                                                                                                                                                                        j(
                                                                                                                                                                                            new Map(),
                                                                                                                                                                                            "~",
                                                                                                                                                                                            46
                                                                                                                                                                                        ),
                                                                                                                                                                                        "--",
                                                                                                                                                                                        47
                                                                                                                                                                                    ),
                                                                                                                                                                                    "++",
                                                                                                                                                                                    48
                                                                                                                                                                                ),
                                                                                                                                                                                "!",
                                                                                                                                                                                49
                                                                                                                                                                            ),
                                                                                                                                                                            "&",
                                                                                                                                                                            50
                                                                                                                                                                        ),
                                                                                                                                                                        "|",
                                                                                                                                                                        51
                                                                                                                                                                    ),
                                                                                                                                                                    "^",
                                                                                                                                                                    52
                                                                                                                                                                ),
                                                                                                                                                                "/",
                                                                                                                                                                53
                                                                                                                                                            ),
                                                                                                                                                            "==",
                                                                                                                                                            54
                                                                                                                                                        ),
                                                                                                                                                        ">",
                                                                                                                                                        55
                                                                                                                                                    ),
                                                                                                                                                    ">=",
                                                                                                                                                    56
                                                                                                                                                ),
                                                                                                                                                "<",
                                                                                                                                                57
                                                                                                                                            ),
                                                                                                                                            "<=",
                                                                                                                                            58
                                                                                                                                        ),
                                                                                                                                        "&&",
                                                                                                                                        59
                                                                                                                                    ),
                                                                                                                                    "||",
                                                                                                                                    60
                                                                                                                                ),
                                                                                                                                "^^",
                                                                                                                                61
                                                                                                                            ),
                                                                                                                            "-",
                                                                                                                            62
                                                                                                                        ),
                                                                                                                        "*",
                                                                                                                        63
                                                                                                                    ),
                                                                                                                    "!=",
                                                                                                                    64
                                                                                                                ),
                                                                                                                "+",
                                                                                                                65
                                                                                                            ),
                                                                                                            "%",
                                                                                                            66
                                                                                                        ),
                                                                                                        "<<",
                                                                                                        67
                                                                                                    ),
                                                                                                    ">>",
                                                                                                    68
                                                                                                ),
                                                                                                "=",
                                                                                                69
                                                                                            ),
                                                                                            "+=",
                                                                                            70
                                                                                        ),
                                                                                        "&=",
                                                                                        71
                                                                                    ),
                                                                                    "|=",
                                                                                    72
                                                                                ),
                                                                                "^=",
                                                                                73
                                                                            ),
                                                                            "/=",
                                                                            74
                                                                        ),
                                                                        "*=",
                                                                        75
                                                                    ),
                                                                    "%=",
                                                                    76
                                                                ),
                                                                "<<=",
                                                                77
                                                            ),
                                                            ">>=",
                                                            78
                                                        ),
                                                        "-=",
                                                        79
                                                    ),
                                                    ":",
                                                    80
                                                ),
                                                ",",
                                                81
                                            ),
                                            ".",
                                            82
                                        ),
                                        "{",
                                        83
                                    ),
                                    "[",
                                    84
                                ),
                                "(",
                                85
                            ),
                            "?",
                            86
                        ),
                        "}",
                        87
                    ),
                    "]",
                    88
                ),
                ")",
                89
            ),
            ";",
            90
        ),
        Jg = j(
            j(
                j(
                    j(
                        j(
                            j(
                                j(
                                    j(
                                        j(
                                            j(
                                                j(
                                                    j(
                                                        j(
                                                            j(
                                                                j(
                                                                    j(
                                                                        j(
                                                                            j(
                                                                                j(
                                                                                    j(
                                                                                        j(
                                                                                            j(
                                                                                                j(
                                                                                                    j(
                                                                                                        j(
                                                                                                            j(
                                                                                                                j(
                                                                                                                    j(
                                                                                                                        j(
                                                                                                                            j(
                                                                                                                                j(
                                                                                                                                    j(
                                                                                                                                        j(
                                                                                                                                            j(
                                                                                                                                                j(
                                                                                                                                                    j(
                                                                                                                                                        j(
                                                                                                                                                            j(
                                                                                                                                                                j(
                                                                                                                                                                    j(
                                                                                                                                                                        j(
                                                                                                                                                                            j(
                                                                                                                                                                                j(
                                                                                                                                                                                    j(
                                                                                                                                                                                        j(
                                                                                                                                                                                            j(
                                                                                                                                                                                                j(
                                                                                                                                                                                                    j(
                                                                                                                                                                                                        j(
                                                                                                                                                                                                            new Map(),
                                                                                                                                                                                                            "asm",
                                                                                                                                                                                                            0
                                                                                                                                                                                                        ),
                                                                                                                                                                                                        "cast",
                                                                                                                                                                                                        0
                                                                                                                                                                                                    ),
                                                                                                                                                                                                    "class",
                                                                                                                                                                                                    0
                                                                                                                                                                                                ),
                                                                                                                                                                                                "default",
                                                                                                                                                                                                0
                                                                                                                                                                                            ),
                                                                                                                                                                                            "double",
                                                                                                                                                                                            0
                                                                                                                                                                                        ),
                                                                                                                                                                                        "dvec2",
                                                                                                                                                                                        0
                                                                                                                                                                                    ),
                                                                                                                                                                                    "dvec3",
                                                                                                                                                                                    0
                                                                                                                                                                                ),
                                                                                                                                                                                "dvec4",
                                                                                                                                                                                0
                                                                                                                                                                            ),
                                                                                                                                                                            "enum",
                                                                                                                                                                            0
                                                                                                                                                                        ),
                                                                                                                                                                        "extern",
                                                                                                                                                                        0
                                                                                                                                                                    ),
                                                                                                                                                                    "external",
                                                                                                                                                                    0
                                                                                                                                                                ),
                                                                                                                                                                "fixed",
                                                                                                                                                                0
                                                                                                                                                            ),
                                                                                                                                                            "flat",
                                                                                                                                                            0
                                                                                                                                                        ),
                                                                                                                                                        "fvec2",
                                                                                                                                                        0
                                                                                                                                                    ),
                                                                                                                                                    "fvec3",
                                                                                                                                                    0
                                                                                                                                                ),
                                                                                                                                                "fvec4",
                                                                                                                                                0
                                                                                                                                            ),
                                                                                                                                            "goto",
                                                                                                                                            0
                                                                                                                                        ),
                                                                                                                                        "half",
                                                                                                                                        0
                                                                                                                                    ),
                                                                                                                                    "hvec2",
                                                                                                                                    0
                                                                                                                                ),
                                                                                                                                "hvec3",
                                                                                                                                0
                                                                                                                            ),
                                                                                                                            "hvec4",
                                                                                                                            0
                                                                                                                        ),
                                                                                                                        "inline",
                                                                                                                        0
                                                                                                                    ),
                                                                                                                    "input",
                                                                                                                    0
                                                                                                                ),
                                                                                                                "interface",
                                                                                                                0
                                                                                                            ),
                                                                                                            "long",
                                                                                                            0
                                                                                                        ),
                                                                                                        "namespace",
                                                                                                        0
                                                                                                    ),
                                                                                                    "noinline",
                                                                                                    0
                                                                                                ),
                                                                                                "output",
                                                                                                0
                                                                                            ),
                                                                                            "packed",
                                                                                            0
                                                                                        ),
                                                                                        "public",
                                                                                        0
                                                                                    ),
                                                                                    "sampler1D",
                                                                                    0
                                                                                ),
                                                                                "sampler1DShadow",
                                                                                0
                                                                            ),
                                                                            "sampler2DRect",
                                                                            0
                                                                        ),
                                                                        "sampler2DRectShadow",
                                                                        0
                                                                    ),
                                                                    "sampler2DShadow",
                                                                    0
                                                                ),
                                                                "sampler3D",
                                                                0
                                                            ),
                                                            "sampler3DRect",
                                                            0
                                                        ),
                                                        "short",
                                                        0
                                                    ),
                                                    "sizeof",
                                                    0
                                                ),
                                                "static",
                                                0
                                            ),
                                            "superp",
                                            0
                                        ),
                                        "switch",
                                        0
                                    ),
                                    "template",
                                    0
                                ),
                                "this",
                                0
                            ),
                            "typedef",
                            0
                        ),
                        "union",
                        0
                    ),
                    "unsigned",
                    0
                ),
                "using",
                0
            ),
            "volatile",
            0
        ),
        Y = K(new Tb(-1, null, "bool", null)),
        Lb = K(new Tb(-2, null, "bvec2", null)),
        Mb = K(new Tb(-3, null, "bvec3", null)),
        Nb = K(new Tb(-4, null, "bvec4", null)),
        M = K(new Tb(-5, null, "<error>", null)),
        da = K(new Tb(-6, null, "float", null)),
        ga = K(new Tb(-7, null, "int", null)),
        vb = K(new Tb(-8, null, "ivec2", null)),
        wb = K(new Tb(-9, null, "ivec3", null)),
        xb = K(new Tb(-10, null, "ivec4", null)),
        ob = K(new Tb(-11, null, "mat2", null)),
        pb = K(new Tb(-12, null, "mat3", null)),
        qb = K(new Tb(-13, null, "mat4", null)),
        Ng = Ke(K(new Tb(-14, null, "sampler2D", null))),
        Og = Ke(K(new Tb(-15, null, "samplerCube", null))),
        Fa = K(new Tb(-16, null, "vec2", null)),
        Ga = K(new Tb(-17, null, "vec3", null)),
        Ha = K(new Tb(-18, null, "vec4", null)),
        zd = K(new Tb(-19, null, "void", null)),
        Pg = [Y, Lb, Mb, Nb, da, ga, vb, wb, xb, ob, pb, qb, Ng, Og, Fa, Ga, Ha],
        Se = j(j(j(j(j(new Map(), "json", 0), "js", 1), "c++", 2), "skew", 3), "rust", 4),
        Te = j(j(j(new Map(), "all", 0), "internal-only", 1), "none", 2),
        oh = ["ERROR", "WARNING"],
        Ug = [
            "GLOBAL",
            "STRUCT_BLOCK",
            "VARIABLE",
            "BLOCK",
            "BREAK",
            "CONTINUE",
            "DISCARD",
            "DO_WHILE",
            "EXPRESSION",
            "EXTENSION",
            "FOR",
            "FUNCTION",
            "IF",
            "MODIFIER_BLOCK",
            "PRECISION",
            "RETURN",
            "STRUCT",
            "VARIABLES",
            "VERSION",
            "WHILE",
            "CALL",
            "DOT",
            "HOOK",
            "NAME",
            "PARSE_ERROR",
            "SEQUENCE",
            "TYPE",
            "UNKNOWN_CONSTANT",
            "BOOL",
            "FLOAT",
            "INT",
            "NEGATIVE",
            "NOT",
            "POSITIVE",
            "PREFIX_DECREMENT",
            "PREFIX_INCREMENT",
            "POSTFIX_DECREMENT",
            "POSTFIX_INCREMENT",
            "ADD",
            "DIVIDE",
            "EQUAL",
            "GREATER_THAN",
            "GREATER_THAN_OR_EQUAL",
            "INDEX",
            "LESS_THAN",
            "LESS_THAN_OR_EQUAL",
            "LOGICAL_AND",
            "LOGICAL_OR",
            "LOGICAL_XOR",
            "MULTIPLY",
            "NOT_EQUAL",
            "SUBTRACT",
            "ASSIGN",
            "ASSIGN_ADD",
            "ASSIGN_DIVIDE",
            "ASSIGN_MULTIPLY",
            "ASSIGN_SUBTRACT",
        ],
        Qe = [
            "SINGLE_LINE_COMMENT",
            "MULTI_LINE_COMMENT",
            "ATTRIBUTE",
            "BOOL",
            "BREAK",
            "BVEC2",
            "BVEC3",
            "BVEC4",
            "CONST",
            "CONTINUE",
            "DISCARD",
            "DO",
            "ELSE",
            "FALSE",
            "FLOAT",
            "FOR",
            "HIGHP",
            "IF",
            "IN",
            "INOUT",
            "INT",
            "INVARIANT",
            "IVEC2",
            "IVEC3",
            "IVEC4",
            "LOWP",
            "MAT2",
            "MAT3",
            "MAT4",
            "MEDIUMP",
            "OUT",
            "PRECISION",
            "RETURN",
            "SAMPLER2D",
            "SAMPLERCUBE",
            "STRUCT",
            "TRUE",
            "UNIFORM",
            "VARYING",
            "VEC2",
            "VEC3",
            "VEC4",
            "VOID",
            "WHILE",
            "EXPORT",
            "IMPORT",
            "COMPLEMENT",
            "DECREMENT",
            "INCREMENT",
            "NOT",
            "BITWISE_AND",
            "BITWISE_OR",
            "BITWISE_XOR",
            "DIVIDE",
            "EQUAL",
            "GREATER_THAN",
            "GREATER_THAN_OR_EQUAL",
            "LESS_THAN",
            "LESS_THAN_OR_EQUAL",
            "LOGICAL_AND",
            "LOGICAL_OR",
            "LOGICAL_XOR",
            "MINUS",
            "MULTIPLY",
            "NOT_EQUAL",
            "PLUS",
            "REMAINDER",
            "SHIFT_LEFT",
            "SHIFT_RIGHT",
            "ASSIGN",
            "ASSIGN_ADD",
            "ASSIGN_BITWISE_AND",
            "ASSIGN_BITWISE_OR",
            "ASSIGN_BITWISE_XOR",
            "ASSIGN_DIVIDE",
            "ASSIGN_MULTIPLY",
            "ASSIGN_REMAINDER",
            "ASSIGN_SHIFT_LEFT",
            "ASSIGN_SHIFT_RIGHT",
            "ASSIGN_SUBTRACT",
            "COLON",
            "COMMA",
            "DOT",
            "LEFT_BRACE",
            "LEFT_BRACKET",
            "LEFT_PARENTHESIS",
            "QUESTION",
            "RIGHT_BRACE",
            "RIGHT_BRACKET",
            "RIGHT_PARENTHESIS",
            "SEMICOLON",
            "EXTENSION",
            "VERSION",
            "INCLUDE",
            "PRAGMA",
            "FLOAT_LITERAL",
            "IDENTIFIER",
            "INT_LITERAL",
            "STRING_LITERAL",
            "END_OF_FILE",
        ],
        kh = Oa(Oa(Oa(Oa(Oa(Oa(Oa(Oa(Oa(new Map(), 0, 0), 1, 1), 2, 90), 3, 31), 4, 32), 5, 33), 6, 34), 7, 35), 8, 36);
    ci();
})();
