import {AnimationMixer, Object3D, PerspectiveCamera, Vector3} from "three";
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

    static readonly baseSpeed = 0.1;
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

    previousAction: AnimationAction;
    activeAction: AnimationAction;

    static async loadPlayer(frontCamera: PerspectiveCamera) {
        return new Player(await CustomLoader.load('game/models/cau.glb'), frontCamera);
    }

    constructor(
        private gltf: GLTF,
        public frontCamera: PerspectiveCamera
    ) {
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

        this.previousAction = this.idleAction;
        this.activeAction = this.idleAction;
    }

    convertCommandToMovementVector() {
        if (this.activeCommands[Movements.FRONT] || this.activeCommands[Movements.BACK]) {
            this.movementVector.z = this.activeCommands[Movements.FRONT] ? -1 : 1;
        } else {
            this.movementVector.z = 0;
        }

        if (this.activeCommands[Movements.LEFT] || this.activeCommands[Movements.RIGHT]) {
            this.movementVector.x = this.activeCommands[Movements.RIGHT] ? 1 : -1;
        } else {
            this.movementVector.x = 0;
        }
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

        this.currentLookingVector = this.model.position
            .clone()
            .add(this.movementVector.normalize());

        this.model.lookAt(this.currentLookingVector);
    }

    updateFrontCamera() {
        const cameraPosition = this.model.position
            .clone()
            .add(this.movementVector
                .clone()
                .normalize()
                .multiplyScalar(6));

        this.frontCamera.position.x = cameraPosition.x;
        this.frontCamera.position.z = cameraPosition.z;

        const targetPosition = this.model.position.clone();
        targetPosition.y = 3;

        this.frontCamera.lookAt(targetPosition);
    }

    updateIsometricCamera(camera: PerspectiveCamera) {
        camera.position.x += this.movementVector.x * Player.baseSpeed;
        camera.position.z += this.movementVector.z * Player.baseSpeed;
    }

    checkCollision(obj: Vector3, diameter: number) {
        return this.model.position.distanceTo(obj) < (diameter / 2);
    }

    private fadeToAction(duration) {
        this.previousAction = this.activeAction;
        this.activeAction = this.currentRunState ? this.runAction : this.idleAction;

        if (this.previousAction !== this.activeAction) {
            this.previousAction.fadeOut(duration);
        }

        this.activeAction
            .reset()
            .setEffectiveTimeScale(1)
            .setEffectiveWeight(0.8)
            .fadeIn(duration)
            .play();
    }

    updateAnimation() {
        // Se o movimento mudou de estado
        if (this.hasMovement != this.currentRunState) {
            this.currentRunState = this.hasMovement;

            // Atualiza a animação
            if (this.currentRunState) {
                this.fadeToAction(0.5);
                // this.idleAction.paused = true;
                // this.idleAction.stopFading();
                //
                // this.runAction.paused = false;
                // this.runAction.play();
            } else {
                this.fadeToAction(0.5);
                // this.runAction.paused = true;
                // this.runAction.stopFading();
                //
                // this.idleAction.paused = false;
                // this.idleAction.play();
            }
        }
    }
}

