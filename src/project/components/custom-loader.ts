import { Mesh, MeshStandardMaterial, Color, SkeletonHelper, AnimationMixer, InstancedBufferAttribute, InstancedBufferGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export class CustomLoader {
    static loader: GLTFLoader = new GLTFLoader();
    static loadedModels: { [key: string]: GLTF } = {};


    static load(path: string): Promise<GLTF> {
        return !this.loadedModels[path]
            ? this.loader
                .loadAsync(path)
                .then(this.assignGLTF(path))
                .then(castShadow)
            : Promise.resolve(this.loadedModels[path]);
    }

    static assignGLTF(path: string) {
        return (gltf: GLTF) => {
            this.loadedModels[path] = gltf;
            return gltf;
        }
    }
}

function castShadow(gltf: GLTF): GLTF {
    gltf.scene.traverse((obj) => {
        obj.castShadow = true;
        // obj.receiveShadow = true;
    })
    return gltf;
}