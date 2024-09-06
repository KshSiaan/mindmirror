import { createContext, useContext } from "react";

export interface Audio {
    bgm:boolean;
    sfx:boolean;
}

export const audioContext = createContext<Audio | undefined >(undefined);

export function useAudio(){
    const audio = useContext(audioContext)
    if (audio === undefined) {
        throw new Error("The audio context is undefined");
    }

    return audio;
}