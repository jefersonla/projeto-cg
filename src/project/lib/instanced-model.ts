import {Object3D, DynamicDrawUsage, InstancedMesh, Mesh} from "three";

/**
 * Abstração de instanced mesh para um modelo
 */
export class InstancedModel {

    /* Instance meshes que serão utilizados */
    instancedMeshes: InstancedMesh[];

    /* Elemento padrão para posicionamento */
    private dummyPositional: Object3D;

    /**
     * Constroi um modelo que pode ser instanciado diversas vezes
     *
     * @param model Modelo a ser replicado
     * @param instanceCounts
     */
    constructor(public model: Object3D, private instanceCounts: number) {
        this.instancedMeshes = [];
        this.dummyPositional = new Object3D();

        // Extrai todos os meshes, transforma estes em instanced mesh
        model.traverse(el => {
            if (el instanceof Mesh) {
                const instancedMesh = new InstancedMesh(el.geometry, el.material, instanceCounts);

                // Configura a instância
                instancedMesh.instanceMatrix.setUsage(DynamicDrawUsage);
                instancedMesh.receiveShadow = true;
                instancedMesh.castShadow = true;

                // Remove o mesh anterior e adiciona o mesh instanciado
                model.parent.children = model.parent.children.filter(gel => gel != el);
                model.parent.children.push(instancedMesh);

                // Salva a estrutura para uso posterior
                this.instancedMeshes.push(instancedMesh);
            }
        });
    }
}
