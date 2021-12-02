import { AnimationMixer, MathUtils, Object3D, PerspectiveCamera, Vector2, Vector3 } from "three";
import type { AnimationAction } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { CustomLoader } from "./custom-loader";

export enum Movements {
    FRONT,
    BACK,
    LEFT,
    RIGHT,
}

export class Player {
    static readonly keysToCommand = {
        'A': Movements.LEFT,
        'W': Movements.FRONT,
        'S': Movements.BACK,
        'D': Movements.RIGHT,
        'ARROWUP': Movements.FRONT,
        'ARROWDOWN': Movements.BACK,
        'ARROWRIGHT': Movements.RIGHT,
        'ARROWLEFT': Movements.LEFT,
    };

    static readonly baseSpeed = 0.05;
    static readonly movementBaseVector = new Vector3(0, 0, 1);

    model: Object3D;
    animationMixer: AnimationMixer;

    movementVector: Vector3;
    currentLookingVector: Vector3;

    activeCommands = {
        [Movements.LEFT]: false,
        [Movements.FRONT]: false,
        [Movements.BACK]: false,
        [Movements.RIGHT]: false,
    };

    currentRunState: boolean;

    runAction: AnimationAction;
    idleAction: AnimationAction;

    static async loadPlayer() {
        return new Player(await CustomLoader.load('game/models/cau.glb'));
    }

    constructor(private gltf: GLTF) {
        this.model = gltf.scene.children[0];
        this.animationMixer = new AnimationMixer(this.model);
        this.movementVector = new Vector3(0, 0, 0);
        this.currentLookingVector = Player.movementBaseVector.clone();
        this.currentRunState = false;

        const animations = gltf.animations;

        this.idleAction = this.animationMixer.clipAction(animations[0]);
        this.runAction = this.animationMixer.clipAction(animations[1]);

        // Configura as animações
        this.setupAnimations();

        // Mantem o personagem pausado by default
        this.idleAction.paused = false;
        this.idleAction.play();

        // Troca o estado da tecla pressionada
        const changeKeyState = (state: boolean) => {
            return (evt: KeyboardEvent) => {
                const keyPressed = Player.keysToCommand[evt.key.toUpperCase()];

                if (!this.activeCommands.hasOwnProperty(keyPressed)) {
                    return;
                }

                this.activeCommands[keyPressed] = state;
                this.convertCommandToMovementVector();
            };
        };

        // Ativa o movimento
        document.addEventListener('keydown', changeKeyState(true));
        document.addEventListener('keyup', changeKeyState(false));
    }

    private setupAnimations() {
        this.runAction.enabled = true;
        this.runAction.setEffectiveTimeScale(1);
        this.runAction.setEffectiveWeight(1);

        this.idleAction.enabled = true;
        this.idleAction.setEffectiveTimeScale(1);
        this.idleAction.setEffectiveWeight(1);
    }

    convertCommandToMovementVector() {
        if (this.activeCommands[Movements.FRONT] || this.activeCommands[Movements.BACK]) {
            this.movementVector.z = this.activeCommands[Movements.FRONT] ? 1 : -1;
        } else {
            this.movementVector.z = 0;
        }

        if (this.activeCommands[Movements.LEFT] || this.activeCommands[Movements.RIGHT]) {
            this.movementVector.x = this.activeCommands[Movements.RIGHT] ? -1 : 1;
        } else {
            this.movementVector.x = 0;
        }

        // this.movementVector = this.movementVector.normalize();
    }

    get hasMovement() {
        return Math.abs(this.movementVector.x) !== 0 || Math.abs(this.movementVector.z) !== 0;
    }

    updatePlayerMovement() {
        if (!this.hasMovement) {
            return;
        }

        this.model.position.x += this.movementVector.x * Player.baseSpeed;
        this.model.position.z += this.movementVector.z * Player.baseSpeed;

        const playerRotation = Player.movementBaseVector.angleTo(this.currentLookingVector.normalize());
        const movementRotation = Player.movementBaseVector.angleTo(this.movementVector.normalize());

        if (playerRotation !== movementRotation) {
            this.currentLookingVector = this.movementVector.clone();

            this.model.rotateOnAxis(
                new Vector3(0, 1, 0),
                playerRotation - movementRotation
            );
        }
    }

    updateIsometricCamera(camera: PerspectiveCamera) {
        camera.position.x += this.movementVector.x * Player.baseSpeed;
        camera.position.z += this.movementVector.z * Player.baseSpeed;
    }

    checkColision(obj: Vector3, diameter: number) {
        return this.model.position.distanceTo(obj) < (diameter / 2);
    }

    updateAnimation() {
        // Se o movimento mudou de estado
        if (this.hasMovement != this.currentRunState) {
            this.currentRunState = this.hasMovement;

            // Atualiza a animação
            if (this.currentRunState) {
                this.idleAction.paused = true;
                this.idleAction.stopFading();

                this.runAction.paused = false;
                this.runAction.play();
            } else {
                this.runAction.paused = true;
                this.runAction.stopFading();

                this.idleAction.paused = false;
                this.idleAction.play();
            }
        }
    }
}

