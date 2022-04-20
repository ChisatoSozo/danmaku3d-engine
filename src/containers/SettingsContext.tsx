import React from "react";
import { PlayableCharacterDefinition } from "../types/gameDefinition/PlayableCharacterDefinition";

export interface Settings {
    selectedCharacter: PlayableCharacterDefinition;
}

export const SettingsContext = React.createContext<Settings | undefined>(undefined);

export const useSettings = () => React.useContext(SettingsContext);
