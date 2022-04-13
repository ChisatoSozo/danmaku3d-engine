import { Scene } from "@babylonjs/core/scene";
import { useEffect } from "react";
import { useScene } from "react-babylonjs";

interface SceneElevatorProps {
    setScene: (scene: Scene) => void;
}

export const SceneElevator: React.FC<SceneElevatorProps> = ({ setScene }) => {
    const scene = useScene();
    useEffect(() => {
        if (!scene) return;
        setScene(scene);
    }, [scene, setScene]);
    return null;
};
