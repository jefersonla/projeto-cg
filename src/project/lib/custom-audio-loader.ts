import {AudioLoader} from "three";

/**
 * Armazena todos os audios carregados
 */
export class CustomAudioLoader {
    /* Static Loader */
    static loader: AudioLoader = new AudioLoader();

    /* Todos audios carregados */
    static loadedAudios: { [key: string]: AudioBuffer } = {};

    /**
     * Carrega um audio
     *
     * @param path
     */
    static load(path: string): Promise<AudioBuffer> {
        return !this.loadedAudios[path]
            ? this.loader
                .loadAsync(path)
                .then(this.assignAudioBuffer(path))
            : Promise.resolve(this.loadedAudios[path]);
    }

    /**
     * Salva o buffer do audio na memória para reuso
     *
     * @param path
     */
    static assignAudioBuffer(path: string) {
        return (audio: AudioBuffer): AudioBuffer => {
            this.loadedAudios[path] = audio;
            return audio;
        }
    }

    /**
     * Disabled constructor
     * @private
     */
    private constructor() {}
}
