import { Animation, DynamicTexture, Material, Node, Vector3 } from "@babylonjs/core";
import React, { useEffect, useMemo, useRef } from "react";
import { useScene } from "react-babylonjs";
import { textOnCtx } from "../utils/BabylonUtils";

interface FadeTextProps {
    text: string;
    position: Vector3;
    size: number;
    fontSize: number;
}

export const FadeText: React.FC<FadeTextProps> = ({ text, position, size, fontSize }) => {
    const scene = useScene();
    const textTexture = useMemo(
        () =>
            new DynamicTexture(
                `fadeText-${text}`,
                {
                    width: 1024,
                    height: 512,
                },
                scene,
                true
            ),
        [scene, text]
    );
    const matRef = useRef<Material>();

    const planeRef = useRef();

    useEffect(() => {
        if (!matRef.current) return;
        matRef.current.alpha = 1;
        textTexture.hasAlpha = true;
        const ctx = textTexture.getContext();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const textColor = "white";
        textOnCtx(ctx, text, fontSize, 0, 0.2, textColor);

        textTexture.update();

        window.setTimeout(() => {
            if (!matRef.current) return;
            Animation.CreateAndStartAnimation(
                "quoteAlphaAnim",
                matRef.current as unknown as Node,
                "alpha",
                60,
                120,
                1,
                0,
                Animation.ANIMATIONLOOPMODE_CONSTANT
            );
        }, 5000);
    }, [fontSize, text, textTexture]);

    return (
        <plane ref={planeRef} name="dialoguePlane" position={position} width={size} height={size / 2}>
            <standardMaterial
                ref={matRef}
                disableLighting={true}
                useAlphaFromDiffuseTexture
                name="dialogueMaterial"
                diffuseTexture={textTexture}
                emissiveTexture={textTexture}
            />
        </plane>
    );
};
