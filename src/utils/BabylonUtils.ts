import { Matrix, Quaternion, TransformNode, Vector3 } from "@babylonjs/core";

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
