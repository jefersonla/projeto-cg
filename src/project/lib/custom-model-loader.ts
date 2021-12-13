import { Mesh, MeshStandardMaterial, Color, SkeletonHelper, AnimationMixer, InstancedBufferAttribute, InstancedBufferGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

/**
 * Armazena todos modelos carregados
 */
export class CustomModelLoader {
    /* Static Loader */
    static loader: GLTFLoader = new GLTFLoader();

    /* Todos modelos carregados */
    static loadedModels: { [key: string]: GLTF } = {};

    /**
     * Carrega um modelo
     *
     * @param path
     */
    static load(path: string): Promise<GLTF> {
        return !this.loadedModels[path]
            ? this.loader
                .loadAsync(path)
                .then(this.assignGLTF(path))
                .then(castShadow)
            : Promise.resolve(this.loadedModels[path]);
    }

    /**
     * Salva o modelo na memória
     *
     * @param path
     */
    static assignGLTF(path: string) {
        return (gltf: GLTF) => {
            this.loadedModels[path] = gltf;
            return gltf;
        }
    }

    /**
     * Disabled constructor
     * @private
     */
    private constructor() {}
}

/**
 * Habilita as sombras para o modelo carregado
 *
 * @param gltf
 */
function castShadow(gltf: GLTF): GLTF {
    gltf.scene.traverse((obj) => {
        obj.castShadow = true;
        // obj.receiveShadow = true;
    })
    return gltf;
}
