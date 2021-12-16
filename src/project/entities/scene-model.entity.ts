/**
 * Valor com coordenadas X, Y, Z
 */
export interface Vector3Value {
    x: number;
    y: number;
    z: number;
}

/**
 * Modelo de cena
 */
export interface SceneModel {
    /* Path para o item */
    src: string;

    /* Posição do item */
    position: Vector3Value;

    /* Rotação do item */
    rotation: Vector3Value;

    /* Escala o tamanho do item */
    scale?: number;
}
