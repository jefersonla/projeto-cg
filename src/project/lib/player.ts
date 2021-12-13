import {AnimationMixer, Audio, AudioListener, AudioLoader, Object3D, PerspectiveCamera, Vector2, Vector3} from "three";
import type { AnimationAction } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { CustomModelLoader } from "./custom-model-loader";
import nipplejs from "nipplejs";
import type {JoystickOutputData} from "nipplejs";
import {CustomAudioLoader} from "./custom-audio-loader";

/**
 * Movementos mapeados do teclado
 */
export enum Movements {
    FRONT,
    BACK,
    LEFT,
    RIGHT,
}

/**
 * Classe do jogador
 */
export class Player {

    /** ---------- System Properties --------- **/

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
    static readonly baseSpeed = 0.15;
    static readonly movementBaseVector = new Vector3(0, 0, 1);

    /** ---------- Player Properties --------- **/

    /* Modelo 3D extraído depois que o elemento é carregado */
    model: Object3D;

    /* Vetor de movimento */
    movementVector: Vector3;

    /* Vetor que indica a posição ao qual o personagem está olhando */
    currentLookingVector: Vector3;

    /** ---------- Movement Properties --------- **/

    /* Comandos ativos no momento (teclas pressionadas apenas) */
    activeCommands = {
        [Movements.LEFT]: false,
        [Movements.FRONT]: false,
        [Movements.BACK]: false,
        [Movements.RIGHT]: false,
    };

    /* Estado de movimento atual */
    currentRunState: boolean;

    /** ---------- Animation Properties --------- **/

    /* Mixer de animação */
    animationMixer: AnimationMixer;

    /* Animação de corrida */
    runAction: AnimationAction;

    /* Animação de parado */
    idleAction: AnimationAction;

    /* Animação prévia */
    previousAction: AnimationAction;

    /* Animação atual */
    activeAction: AnimationAction;

    /**
     * Carrega o modulo assincronamente uma vez que não é possível construir o personagem diretamente
     *
     * @param frontCamera
     * @param audioListener
     */
    static async loadPlayer(frontCamera: PerspectiveCamera, audioListener: AudioListener) {
        const stepSound: Audio = await CustomAudioLoader
            .load('game/sounds/footstep_sound.ogg')
            .then(audioBuffer => {
                const sound = new Audio(audioListener);
                sound.setVolume( 0.15 );
                sound.setBuffer(audioBuffer);
                sound.setLoop( true );

                // Para evitar barulho
                sound.play();
                sound.stop();

                return sound;
            });

        return new Player(await CustomModelLoader.load('game/models/players/cau.glb'), frontCamera, stepSound);
    }

    /**
     * Inicializa o jogador
     *
     * @param gltf
     * @param frontCamera
     * @param footStepSound
     * @private
     */
    private constructor(
        private gltf: GLTF,
        public frontCamera: PerspectiveCamera,
        private footStepSound: Audio
    ) {
        // Propriedades básicas do personagem
        this.model = gltf.scene.children[0];
        this.animationMixer = new AnimationMixer(this.model);
        this.movementVector = new Vector3(0, 0, 0);
        this.currentLookingVector = Player.movementBaseVector.clone();
        this.currentRunState = false;

        // Propriedades de animação
        const animations = gltf.animations;
        this.idleAction = this.animationMixer.clipAction(animations[0]);
        this.runAction = this.animationMixer.clipAction(animations[1]);

        // Configura o personagem
        this.setupAnimations();
        this.setupControls();

        // Mantém o personagem pausado by default
        this.idleAction.paused = false;
        this.idleAction.play();

    }

    /**
     * Configura os controles do jogador
     *
     * @private
     */
    private setupControls() {
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

    /**
     * Configura o controle mobile do game
     *
     * @param canvasContainer
     */
    setupMobileControls(canvasContainer: HTMLDivElement) {
        // Cria o controle
        let screenJoystick = nipplejs.create({
            zone: canvasContainer,
            mode: 'dynamic',
            catchDistance: 150,
            color: 'white',
            position: {left: '10%', top: '80%'}
        });

        // Atualiza o movimento
        screenJoystick.on('move', (_, data: JoystickOutputData) => {
            this.movementVector.x = data.vector.x;
            this.movementVector.z = data.vector.y * (-1);
        });

        // Para o movimento
        screenJoystick.on('end', () => {
            this.movementVector.x = 0;
            this.movementVector.z = 0;
        });
    }

    /**
     * Configura as animações
     *
     * @private
     */
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

    /**
     * Converte o comando pressionado para o vetor de movimentação
     */
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

    /**
     * Indica se o player está se movendo ou não
     */
    get hasMovement() {
        return Math.abs(this.movementVector.x) !== 0 || Math.abs(this.movementVector.z) !== 0;
    }

    /**
     * Atualiza a posição do personagem no mapa
     */
    updatePlayerPosition() {
        if (!this.hasMovement) {
            return;
        }

        this.model.position.x += this.movementVector.x * Player.baseSpeed;
        this.model.position.z += this.movementVector.z * Player.baseSpeed;

        this.currentLookingVector = this.model.position
            .clone()
            .add(this.movementVector.normalize());

        this.updateFrontCameraPosition();

        this.model.lookAt(this.currentLookingVector);
    }

    /**
     * Atualiza a posição da camera frontal
     */
    updateFrontCameraPosition() {
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

    /**
     * Atualiza a posição da camera isometrica
     *
     * @param camera
     */
    updateIsometricCameraPosition(camera: PerspectiveCamera) {
        camera.position.x = this.model.position.x;
        camera.position.z = this.model.position.z + 15;
        camera.position.y = this.model.position.y + 20;
    }

    /**
     * Checa se existe colisão com um objeto 3D qualquer
     *
     * @param obj
     * @param diameter
     */
    checkCollision(obj: Vector3, diameter: number) {
        return this.model.position.distanceTo(obj.clone()) < (diameter / 2);
    }

    /**
     * Transição entre ações
     *
     * @param duration
     * @private
     */
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

    /**
     * Atualiza estado da animação
     */
    updateAnimation() {
        // Se o movimento mudou de estado
        if (this.hasMovement != this.currentRunState) {
            if (this.hasMovement) {
                this.footStepSound.play(0.5);
            } else {
                this.footStepSound.stop();
            }

            this.currentRunState = this.hasMovement;
            this.fadeToAction(0.5);
        }
    }
}

