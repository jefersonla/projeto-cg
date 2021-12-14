import * as dat from 'dat.gui';
import {
    Mesh,
    Color,
    MeshStandardMaterial,
    SkeletonHelper,
    AnimationMixer,
    MathUtils,
    PlaneBufferGeometry,
    SpotLightHelper,
    SpotLight,
    HemisphereLight,
    sRGBEncoding,
    Clock,
    WebGLRenderer,
    PerspectiveCamera,
    Scene,
    Vector3,
    AxesHelper,
    CameraHelper,
    Fog,
    AudioListener,
    Audio,
    RepeatWrapping,
    MeshPhongMaterial,
    TextureLoader,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Player } from './lib/player';
import type { GameElement } from './entities/game-element.entity';
import type {NotifyCallback, ProgressBarCallback} from './utils/utils';
import {createDummyCube, isMobileOrTablet} from './utils/utils';
import {CustomAudioLoader} from './lib/custom-audio-loader';
import {CustomModelLoader} from './lib/custom-model-loader';
import {FireworksScene} from './lib/fireworks-scene';

import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar';

/**
 * Classe principal do jogo
 */
export class MainGame {
    /** ---------- System Properties --------- **/

    /* Player do jogo */
    player: Player;

    /* Indica que o jogo está rodando ou não */
    isRunning: boolean;

    /* Animation Frame Handler */
    animationFrameHandler: number;

    /** ---------- Debug Properties ---------- **/

    /* Debug Menu */
    debugMenu: dat.GUI;

    /* Debug Frame Status */
    debugStats: Stats;

    // Opções de debug
    debugOptions = {
        enableSkeleton: false,
        skeletonHelper: null as SkeletonHelper,

        enableSpotlightHelper: false,
        spotlightHelper: null as SpotLightHelper,

        enableCameraHelper: false,
        cameraHelper: null as CameraHelper,

        enableFrontCameraHelper: false,
        frontCameraHelper: null as CameraHelper,

        enableAxesHelper: false,
        axesHelper: null as AxesHelper,

        enableOrbitControl: false,
        updateOrbitControl: false,
        orbitControl: null as OrbitControls,

        resetCamera: () => this.resetCamera()
    };

    /** ---------- Game Properties --------- **/

    /* Cena atual do jogo */
    scene: Scene;

    /* Camera da aplicação */
    camera: PerspectiveCamera;

    /* Camera de frente do personagem */
    frontCamera: PerspectiveCamera;

    /* Define se é para ser usado a camera 100% ou não */
    useFrontCamera: boolean;

    /* Render da aplicação */
    renderer: WebGLRenderer;

    /* */
    audioListener: AudioListener;

    /* Controle de animação */
    animationsMixer: AnimationMixer[];

    /* Controle de tempo de execução */
    clock: Clock;

    /* Cena com fogos para o fim do game */
    private fireworkScene: FireworksScene;

    /* Material do Boné */
    private hatMaterial?: MeshStandardMaterial;

    /* Material do Cabelo */
    private hairMaterial?: MeshStandardMaterial;

    /* Música de fundo */
    private backgroundMusic?: Audio;

    /* Som de sucesso (ao acertar) */
    private successSound?: Audio;

    /* Som de falha (ao errar) */
    private failureSound?: Audio;

    /**
     * Constrói a aplicação
     *
     * @param canvasContainer Container para renderização
     * @param gameElements Elementos do jogo
     * @param notify Callback de notificação de mudança de estado
     * @param debugEnabled Habilita ou desabilita o debug da aplicação
     * @param loadCallback Carrega o load
     */
    constructor(
        private readonly canvasContainer: HTMLDivElement,
        public gameElements: GameElement[],
        public notify: NotifyCallback = () => {},
        public debugEnabled = false,
        loadCallback: ProgressBarCallback = () => {}
    ) {
        this.useFrontCamera = false;

        // Inicializa o sistema de debug
        if (debugEnabled) {
            this.initDebugOptions();
        }

        // Cria a cena que irá abrigar os dados
        this.scene = new Scene();

        // Configura o jogo
        this.initRender();
        this.initCamera();
        this.initLights()
        this.initAudio();
        loadCallback(25, false);

        // Controle de animação
        this.initAnimationMixer();
        loadCallback(50, false);

        // Inicia a cena
        this.initScene(loadCallback)
            .then(() => loadCallback(100, true));
    }

    /**
     * Inicializa a camera
     *
     * @private
     */
    private initCamera() {
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.z = 15;
        this.camera.position.y = 20;

        this.camera.lookAt(new Vector3(0, 0, 0));

        this.debugOptions.cameraHelper = new CameraHelper(this.camera);
        this.debugOptions.orbitControl = new OrbitControls(this.camera, this.canvasContainer);
        this.debugOptions.orbitControl.enabled = false;
    }

    /**
     * Inicializa o ambiente do AR
     *
     * @experimental
     */
    initArToolkit() {
        // var onRenderFcts= [];
        //
        // const arToolkitSource = new THREEx.ArToolkitSource({
        //     // to read from the webcam or camera
        //     sourceType : 'webcam',
        // });
        //
        // arToolkitSource.init(function onReady(){
        //     setTimeout(() => {
        //         onResize()
        //     }, 2000);
        // })
        //
        // function onResize(){
        //     arToolkitSource.onResizeElement()
        //     arToolkitSource.copyElementSizeTo(renderer.domElement)
        //     if( arToolkitContext.arController !== null ){
        //         arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
        //     }
        // }
        //
        // // create atToolkitContext
        // var arToolkitContext = new THREEx.ArToolkitContext({
        //     cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
        //     detectionMode: 'mono',
        // })
        // // initialize it
        // arToolkitContext.init(function onCompleted(){
        //     // copy projection matrix to camera
        //     camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
        // })
        //
        // // update artoolkit on every frame
        // onRenderFcts.push(function(){
        //     if( arToolkitSource.ready === false )	return
        //
        //     arToolkitContext.update( arToolkitSource.domElement )
        //
        //     // update scene.visible if the marker is seen
        //     scene.visible = camera.visible
        // })
        //
        // ////////////////////////////////////////////////////////////////////////////////
        // //          Create a ArMarkerControls
        // ////////////////////////////////////////////////////////////////////////////////
        //
        // // init controls for camera
        // var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
        //     type : 'pattern',
        //     patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
        //     // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
        //     // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
        //     changeMatrixMode: 'cameraTransformMatrix'
        // })
        // // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
        // scene.visible = false
        //
        // // run the rendering loop
        // var lastTimeMsec= null
        // requestAnimationFrame(function animate(nowMsec){
        //     // keep looping
        //     requestAnimationFrame( animate );
        //     // measure time
        //     lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
        //     var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
        //     lastTimeMsec	= nowMsec
        //     // call each update function
        //     onRenderFcts.forEach(function(onRenderFct){
        //         onRenderFct(deltaMsec/1000, nowMsec/1000)
        //     })
        // })
    }

    /**
     * Inicializa o render
     *
     * @private
     */
    private initRender() {
        // Cria o render
        this.renderer = new WebGLRenderer({
            alpha: true
        });
        this.renderer.setSize(
            window.innerWidth * 0.95,
            window.innerHeight * 0.95
        );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.shadowMap.enabled = true;

        // Insere o render a página
        this.canvasContainer.appendChild(this.renderer.domElement);

        this.renderer.setClearColor(0x72645b, 1);
        // this.renderer.ga = true;
        // this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;

        this.debugOptions.axesHelper = new AxesHelper(10,);
    }

    /**
     * Inicializa as luzes
     *
     * @private
     */
    private initLights() {
        // Create an hemisphere light and add it to scene
        const hemisphereLight = new HemisphereLight(0x443333, 0x111122);
        this.scene.add(hemisphereLight);

        // Create an spotlight, which can cast shadows
        const spotLight = new SpotLight(0xffffff, 0.7);
        spotLight.position.set(35, 80, 20);


        // Enable shadow
        spotLight.castShadow = true;

        // Configure map size
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        // Configure shadow
        spotLight.shadow.camera.near = 25;
        spotLight.shadow.camera.far = 130;
        spotLight.shadow.camera.fov = 1;

        // Add spotlight to scene
        this.scene.add(spotLight);

        // Add a spotlight helper to help orientation
        this.debugOptions.spotlightHelper = new SpotLightHelper(spotLight);
    }

    /**
     * Inicia o terreno do jogo
     *
     * @private
     */
    private async initGroundPlane() {
        // Carrega a textura do chão
        const textureLoader = new TextureLoader();
        const texture = await textureLoader.loadAsync('game/textures/floor.png');
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(3, 3);

        // Cria os componentes do chão (geometria e material)
        const planeGeometry = new PlaneBufferGeometry(137, 137, 32, 32);
        const planeMaterial = new MeshPhongMaterial({ map: texture });

        // Instancia o plano
        const groundPlane = new Mesh(planeGeometry, planeMaterial);
        groundPlane.rotation.x = MathUtils.degToRad(-90);
        groundPlane.receiveShadow = true;

        this.scene.add(groundPlane);
    }

    /**
     * Inicia o mixer de animações
     *
     * @private
     */
    private initAnimationMixer() {
        this.animationsMixer = [];

        this.clock = new Clock();
    }

    /**
     * Inicializa a cena final com os fogos de artificio
     *
     * @private
     */
    private async initFireworkScene() {
        this.fireworkScene = await FireworksScene.playScene(this.renderer, this.audioListener);
    }

    /**
     * Inicializa a interface de audio do jogo
     *
     * @private
     */
    private initAudio() {
        this.audioListener = new AudioListener();
        this.camera.add(this.audioListener);
    }

    /**
     * Inicializa o player
     *
     * @private
     */
    private async initPlayer() {
        // Inicializa a camera frontal
        this.frontCamera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.frontCamera.position.z = 6;
        this.frontCamera.position.y = 3;

        this.frontCamera.lookAt(new Vector3(0, 3, 0));

        this.debugOptions.frontCameraHelper = new CameraHelper(this.frontCamera);

        // Carrega o player
        this.player = await Player.loadPlayer(this.frontCamera, this.audioListener);

        // Extrai elementos para personalização
        this.player.model.traverse(o => {
            if (o instanceof Mesh) {
                if (o.name == 'Hat') {
                    this.hatMaterial = (o.material as MeshStandardMaterial);
                    (o.material as MeshStandardMaterial).color = new Color('#2e7bd9');
                } else if (o.name == 'Hair') {
                    this.hairMaterial = (o.material as MeshStandardMaterial);
                    (o.material as MeshStandardMaterial).color = new Color('#b109d7');
                }
            }
        });

        // Ativa os controles mobile se smartphone ou tablet
        if (isMobileOrTablet()) {
            this.player.setupMobileControls(this.canvasContainer);
        }

        // Salva as demais propriedades
        this.animationsMixer.push(this.player.animationMixer);

        // Debug
        this.debugOptions.skeletonHelper = new SkeletonHelper(this.player.model);

        // Adiciona elementos a cena
        this.scene.add(this.frontCamera);
        this.scene.add(this.player.model);
    }

    /**
     * Inicializa a cena
     *
     * @private
     */
    private async initScene(loadCallback: ProgressBarCallback) {
        const totalNumberOperations = 9;
        const updateProgressBar = (operationNumber) => {
            loadCallback(50 + ((((operationNumber * 100) / totalNumberOperations) / 100) * 50), false);
        };

        // Carrega os cubos
        for (let el of this.gameElements) {
            el.cube = createDummyCube(el.position, el.nameColor, 2);
            this.scene.add(el.cube);
        }
        updateProgressBar(1);

        // TODO REMOVE ou USA
        this.scene.fog = new Fog(0xffffff, 58, 60);
        updateProgressBar(2);

        // Carrega o player
        await this.initPlayer();
        updateProgressBar(3);

        // Carrega a música de fundo
        await this.initBackgroundMusic();
        updateProgressBar(4);

        // Carrega as musicas do jogo
        await this.initGameSounds();
        updateProgressBar(5);

        // Carrega o plano
        await this.initGroundPlane();
        updateProgressBar(6);

        // Carrega a cerca
        await this.initFence();
        updateProgressBar(7);

        // Cena final
        await this.initFireworkScene();
        updateProgressBar(8);

        // Carrega arvores e outros items de maneira randômica
        await this.initRandomElements()
        updateProgressBar(9);
    }

    /**
     * Carrega elementos extras a cena como arvores, pedras, etc
     *
     * @private
     */
    private async initRandomElements() {
        // TODO
    }

    /**
     * Carrega e instancia a cerca
     *
     * @private
     */
    private async initFence() {
        const gltfModel = await CustomModelLoader.load('game/models/fence/scene.gltf');
        const fenceObj = gltfModel.scene.children[0];
        fenceObj.scale.multiplyScalar(0.25);

        const defaultHeight = 1.2;
        const fenceWidth = 15;

        const cornerTop = new Vector3(60, 0, 69);
        const cornerBottom = new Vector3(60, 0, -66);

        const cornerLeft = new Vector3(-69, 0, 60);
        const cornerRight = new Vector3(66, 0, 60);

        // Adiciona a cerca aos arredores do plano
        for (let i = 0; i < 9; i++) {
            // Top
            const topFence = fenceObj.clone(true);
            topFence.position.set(cornerTop.x - (fenceWidth * i), defaultHeight, cornerTop.z);
            this.scene.add(topFence);

            // Bottom
            const bottomFence = fenceObj.clone(true);
            bottomFence.position.set(cornerBottom.x - (fenceWidth * i), defaultHeight, cornerBottom.z);
            this.scene.add(bottomFence);

            // Left
            const leftFence = fenceObj.clone(true);
            leftFence.position.set(cornerLeft.x, defaultHeight, cornerLeft.z - (fenceWidth * i));
            leftFence.rotateZ(MathUtils.degToRad(-90));
            this.scene.add(leftFence);

            // Right
            const rightFence = fenceObj.clone(true);
            rightFence.position.set(cornerRight.x, defaultHeight, cornerRight.z - (fenceWidth * i));
            rightFence.rotateZ(MathUtils.degToRad(-90));
            this.scene.add(rightFence);
        }
    }

    /**
     * Inicializa os sons do jogo
     *
     * @private
     */
    private async initGameSounds() {
        // Carrega a música de sucesso
        const successSoundBuf = await CustomAudioLoader
            .load('game/sounds/success_sound.ogg');
        this.successSound = new Audio(this.audioListener);

        // Configura a música de sucesso
        this.successSound.setBuffer(successSoundBuf);
        this.successSound.setLoop(false);
        this.successSound.setVolume(0.5);

        // Carrega a música de falha
        const failureSoundBuf = await CustomAudioLoader
            .load('game/sounds/failure_sound.ogg');
        this.failureSound = new Audio(this.audioListener);

        // Configura a música de falha
        this.failureSound.setBuffer(failureSoundBuf);
        this.failureSound.setLoop(false);
        this.failureSound.setVolume(0.5);
    }

    /**
     * Inicializa a música de fundo
     *
     * @private
     */
    private async initBackgroundMusic() {
        // Carrega a música de fundo
        const backgroundMusicBuf = await CustomAudioLoader
            .load('game/sounds/fluffing_a_duck_ambient.ogg');
        this.backgroundMusic = new Audio(this.audioListener);

        // Configura a música de fundo
        this.backgroundMusic.setBuffer( backgroundMusicBuf );
        this.backgroundMusic.setLoop(true);
        this.backgroundMusic.setVolume(0.12);
        this.backgroundMusic.play();
    }

    /**
     * Reset a camera para a posição default
     *
     * @private
     */
    private resetCamera() {
        this.camera.position.x = this.player.model.position.x;
        this.camera.position.z = this.player.model.position.z + 15;
        this.camera.position.y = this.player.model.position.y + 20;

        this.camera.lookAt(this.player.model.position);
    }

    /**
     * Inicializa as opções de Debug da aplicação
     *
     * @private
     */
    private initDebugOptions() {
        this.debugStats = Stats();
        this.canvasContainer.appendChild(this.debugStats.dom);

        this.debugMenu = new dat.GUI();
        this.debugMenu.close();

        // Outside options
        this.debugMenu.add(this.debugOptions, 'resetCamera');

        const debug = this.debugMenu.addFolder('helpers');

        const updateDebug = (prop: string) => {
            return (state: boolean) => {
                switch(prop) {
                    case 'enableSkeleton':
                        state
                            ? this.scene.add(this.debugOptions.skeletonHelper)
                            : this.scene.remove(this.debugOptions.skeletonHelper);
                        break;
                    case 'enableSpotlightHelper':
                        state
                            ? this.scene.add(this.debugOptions.spotlightHelper)
                            : this.scene.remove(this.debugOptions.spotlightHelper);
                        break;
                    case 'enableCameraHelper':
                        state
                            ? this.scene.add(this.debugOptions.cameraHelper)
                            : this.scene.remove(this.debugOptions.cameraHelper);
                        break;
                    case 'enableFrontCameraHelper':
                        state
                            ? this.scene.add(this.debugOptions.frontCameraHelper)
                            : this.scene.remove(this.debugOptions.frontCameraHelper);
                        break;
                    case 'enableAxesHelper':
                        state
                            ? this.scene.add(this.debugOptions.axesHelper)
                            : this.scene.remove(this.debugOptions.axesHelper);
                        break;
                    case 'enableOrbitControl':
                        this.debugOptions.orbitControl.enabled = state;
                        break;
                }
            }
        };

        const debugProperties = [
            debug.add(this.debugOptions, 'enableSkeleton', false),
            debug.add(this.debugOptions, 'enableSpotlightHelper', false),
            debug.add(this.debugOptions, 'enableCameraHelper', false),
            debug.add(this.debugOptions, 'enableFrontCameraHelper', false),
            debug.add(this.debugOptions, 'enableAxesHelper', false),
            debug.add(this.debugOptions, 'enableOrbitControl', false),
        ];
        debugProperties.forEach(debugProperty => debugProperty.onChange(updateDebug(debugProperty.property)));
    }

    /**
     * Atualiza status das opções de DEBUG
     */
    private updateDebugStats() {
        this.debugStats.update();
    }

    /**
     * Troca a cor de elementos do personagem principal
     *
     * @param materialName
     * @param materialColor
     */
    changePlayerMaterial(materialName: string, materialColor) {
        if (materialName == 'hat' && !!this.hatMaterial) {
            this.hatMaterial.color = new Color(materialColor);
        } else if (materialName == 'hair' && !!this.hairMaterial) {
            this.hairMaterial.color = new Color(materialColor);
        }
    }

    /**
     * Indica se a página contém a proporção básica para operar
     */
    isPageRatioAllowed() {
        return (window.innerWidth / window.innerHeight) >= 1 && (window.innerWidth / window.innerHeight) <= 3;
    }

    /**
     * Redimensiona a tela do jogo
     */
    setRenderSize() {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const borderPercentage = 0.01;

        // Atualiza as cameras
        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix();

        this.frontCamera.aspect = aspectRatio;
        this.frontCamera.updateProjectionMatrix();

        if (this.fireworkScene) {
            this.fireworkScene.camera.aspect = aspectRatio;
            this.fireworkScene.camera.updateProjectionMatrix();
        }

        // Atualiza o render
        this.renderer.setSize(
            window.innerWidth * (1 - borderPercentage),
            window.innerHeight * (1 - (borderPercentage * aspectRatio))
        );
    }

    private resetGameElements() {
        this.gameElements.forEach(gel => {
            gel.correct = false;
            gel.cube.material.transparent = false;
            gel.cube.material.opacity = 1.0;
        });
    }

    /**
     * Randomiza as posições dos items do jogo
     */
    randomizeGameItemsPositions() {
        for (const el of this.gameElements) {
            el.cube.position.x = MathUtils.randInt(0, 45);
            el.cube.position.z = MathUtils.randInt(0, 45);

            el.position.x = el.cube.position.x;
            el.position.z = el.cube.position.z;
        }
    }

    /**
     * Checa se a tarefa a ser perfomada está sendo executada adequadamente
     *
     * @private
     */
    private checkQuestTask() {
        let i = 0;
        for (const el of this.gameElements) {
            if (this.player.checkCollision(el.position, 6)) {
                if (i == 0 && this.gameElements[1].correct == true) {
                    if (!el.cube.material.transparent) {
                        // this.randomizeGameItemsPositions();
                        this.resetGameElements();

                        if (!this.failureSound.isPlaying) {
                            this.failureSound.play();
                        }
                    }
                } else if (
                    (i == 0 && this.gameElements[1].correct == false) ||
                    this.gameElements[i - 1].correct === true
                ) {
                    if (!el.cube.material.transparent) {
                        el.correct = true;
                        el.cube.material.transparent = true;
                        el.cube.material.opacity = 0.3;

                        if (!this.successSound.isPlaying) {
                            this.successSound.play();
                        }
                    }
                } else {
                    if (!el.cube.material.transparent) {
                        // this.randomizeGameItemsPositions();
                        this.resetGameElements();

                        if (!this.failureSound.isPlaying) {
                            this.failureSound.play();
                        }
                    }
                }

                this.notify();
                if (this.isRunning && this.gameElements.every(el => el.correct)) {
                    setTimeout(() => this.endGame(), 500);
                }
            }
            i++;
        }
    }

    /**
     * Finaliza o jogo
     */
    endGame() {
        this.stop();
        this.notify('end');
        this.fireworkScene.start(this.debugStats);
    }

    /**
     * Executa frame a frame do jogo
     *
     * @private
     */
    private step() {
        // Para a execução
        if (!this.isRunning) {
            cancelAnimationFrame(this.animationFrameHandler);
            return;
        }

        // Atualiza as statistics de debug
        if (this.debugEnabled) {
            this.updateDebugStats();
        }

        // Game Logic

        // Atualiza o controle de órbita
        if (this.debugOptions.updateOrbitControl) {
            this.debugOptions.orbitControl.update();
        }

        // Mixer de animação
        let mixerUpdateDelta = this.clock.getDelta();
        for (const animationMixer of this.animationsMixer) {
            animationMixer.update(mixerUpdateDelta);
        }

        // Update player movement
        if (!!this.player) {
            this.player.updateAnimation();
            this.player.updatePlayerPosition();
            this.player.updateIsometricCameraPosition(this.camera);
            this.checkQuestTask();
        }

        // Renderiza a cena
        this.render();

        // Chama o próximo frame
        this.animationFrameHandler = requestAnimationFrame(() => this.step());
    }

    /**
     * Executa a aplicação
     */
    start() {
        // Inicia loop de renderização se jogo estiver parado
        if (!this.isRunning) {
            this.isRunning = true;
            this.animationFrameHandler = requestAnimationFrame(() => this.step());
        }
    }

    /**
     * Para a aplicação
     */
    stop() {
        // Para o jogo se jogo estiver rodando
        if (this.isRunning) {
            // Para a animação
            cancelAnimationFrame(this.animationFrameHandler);

            // Limpa o ambiente
            this.renderer.clear(false);

            // Configura as variáveis de estado
            this.isRunning = false;
            this.animationFrameHandler = 0;

            // Para música de fundo
            if (this.backgroundMusic.isPlaying) {
                this.backgroundMusic.stop();
            }

            // Para o player
            this.player.stopPlayer();
        }
    }

    /**
     * Renderiza a cena usando a camera padrão
     */
    render() {
        this.renderer.render(this.scene, this.useFrontCamera
            ? this.frontCamera
            : this.camera
        );
    }
}
