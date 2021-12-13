import type {Vector3} from "three";

/**
 * Game Element
 */
export class GameElement {
    name: string;
    nameColor: string;
    textColor: string;
    correct: boolean;
    position: Vector3;
}
