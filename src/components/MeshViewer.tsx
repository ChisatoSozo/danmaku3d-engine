import { Vector3 } from "@babylonjs/core";
import { Suspense, useEffect, useRef, useState } from "react";
import { ILoadedModel, Model, Scene } from "react-babylonjs";
import Engine from "../forks/Engine";

interface MeshViewerProps {
    gameDefinitionName: string;
    url: string;
}

export const MeshViewer: React.FC<MeshViewerProps> = ({ gameDefinitionName, url }) => {
    const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
    const [model, setModel] = useState<ILoadedModel>();

    const divRef = useRef<HTMLDivElement>(null);
    const observer = useRef(
        new ResizeObserver((entries) => {
            // Only care about the first element, we expect one element ot be watched
            const { width, height } = entries[0].contentRect;

            setSize({ width, height });
        })
    );

    useEffect(() => {
        if (!divRef.current) return;
        const curDiv = divRef.current;
        const curObserver = observer.current;
        curObserver.observe(curDiv);

        return () => {
            curObserver.unobserve(curDiv);
        };
    }, []);

    useEffect(() => {
        return () => {
            if (model) {
                model.dispose();
            }
        };
    }, [model]);

    return (
        <div style={{ width: "100%", height: "100%" }} ref={divRef}>
            <Engine width={size.width} height={size.height} antialias canvasId="meshViewer">
                <Scene>
                    <arcRotateCamera
                        name="camera1"
                        alpha={Math.PI / 2}
                        beta={Math.PI / 2}
                        radius={9.0}
                        target={Vector3.Zero()}
                        minZ={0.1}
                        maxZ={500}
                    />
                    <hemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
                    <Suspense fallback={null}>
                        <Model
                            onModelLoaded={setModel}
                            name="viewedModel"
                            rootUrl={`/games/${gameDefinitionName}/meshes/`}
                            sceneFilename={url}
                            position={new Vector3(0, 0, 0)}
                        />
                    </Suspense>
                </Scene>
            </Engine>
        </div>
    );
};
