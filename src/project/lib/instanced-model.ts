import {Object3D, DynamicDrawUsage, InstancedMesh, Mesh, Vector3} from "three";

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
     * @param numberOfInstances
     */
    constructor(public model: Object3D, private numberOfInstances: number) {
        this.instancedMeshes = [];
        this.dummyPositional = new Object3D();

        // Extrai todos os meshes, transforma estes em instanced mesh
        model.traverse(el => {
            if (el instanceof Mesh) {
                const instancedMesh = new InstancedMesh(el.geometry, el.material, numberOfInstances);

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

    /**
     * Move uma instância para uma nova posição
     *
     * @param instance
     * @param position
     */
    moveTo(instance: number, position: Vector3) {
        if (instance < 0 || instance > this.numberOfInstances) {
            throw new Error('Instância fora do range');
        }

        this.dummyPositional.position.set(position.x, position.y, position.z);
        this.dummyPositional.updateMatrix();

        for (const mesh of this.instancedMeshes) {
            mesh.setMatrixAt(instance, this.dummyPositional.matrix);
            mesh.instanceMatrix.needsUpdate = true;
        }
    }

    /**
     * Rotaciona no eixo Y utilizando angulo
     *
     * @param instance
     * @param deg
     */
    rotateY(instance: number, deg: number) {
        if (instance < 0 || instance > this.numberOfInstances) {
            throw new Error('Instância fora do range');
        }


    }
}
