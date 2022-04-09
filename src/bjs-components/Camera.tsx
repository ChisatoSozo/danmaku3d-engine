import { Matrix, Node, Quaternion, TransformNode, Vector3 } from "@babylonjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEngine } from "react-babylonjs";

interface CameraProps {
    mode: "player" | "free";
}

export const Camera: React.FC<CameraProps> = ({ mode }) => {
    const engine = useEngine();
    const canvas = engine?.getRenderingCanvas();

    const transformNodeRef = useRef<TransformNode>(null);
    const [parent, setParent] = useState<Node | null>();

    useEffect(() => {
        if (!transformNodeRef.current) return;
        setParent(transformNodeRef.current.parent);
    }, [transformNodeRef]);

    useEffect(() => {
        if (!transformNodeRef.current) return;
        if (!parent) return;
        if (mode === "player") {
            transformNodeRef.current.position = new Vector3(0, 0, 0);
            transformNodeRef.current.rotation = new Vector3(0, 0, 0);
            transformNodeRef.current.parent = parent;
        } else if (mode === "free") {
            transformNodeRef.current.parent = null;
        }
    }, [mode, parent, transformNodeRef]);

    const cameraHandler = useCallback(
        (e) => {
            if (!transformNodeRef.current) return;
            if (mode !== "player") return;
            const x = e.offsetX;
            const y = e.offsetY;
            const width = e.target.offsetWidth;
            const height = e.target.offsetHeight;

            const right = x / width - 0.5;
            const up = y / height - 0.5;

            const upM = Matrix.RotationX(Math.PI * up);
            const rightM = Matrix.RotationY(Math.PI * right);

            const matrix = Matrix.Identity().multiply(upM).multiply(rightM);

            const _ = new Vector3();
            const rotation = new Quaternion();

            matrix.decompose(_, rotation);

            transformNodeRef.current.rotationQuaternion = rotation;
        },
        [mode]
    );

    useEffect(() => {
        if (!canvas) return;
        canvas.addEventListener("pointermove", cameraHandler);

        return () => {
            canvas.removeEventListener("pointermove", cameraHandler);
        };
    }, [canvas, cameraHandler]);

    return (
        <transformNode name="cameraRoot" ref={transformNodeRef}>
            {mode === "player" && (
                <targetCamera fov={1.0472} name="camera" minZ={0.01} maxZ={100} position={new Vector3(0, 0, 0)} />
            )}
            {mode === "free" && (
                <arcRotateCamera
                    name="freeCamera"
                    target={Vector3.Zero()}
                    alpha={Math.PI / 2}
                    beta={-Math.PI / 4}
                    radius={20}
                />
            )}
        </transformNode>
    );
};
