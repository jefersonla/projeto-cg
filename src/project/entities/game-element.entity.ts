import type {Mesh, Vector3, BoxGeometry, MeshPhongMaterial} from "three";

/**
 * Game Element
 */
export class GameElement {
    cube?: Mesh<BoxGeometry, MeshPhongMaterial>;
    name: string;
    nameColor: string;
    textColor: string;
    correct: boolean;
    position: Vector3;
}
