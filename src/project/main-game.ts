import * as dat from 'dat.gui';
import {
    Mesh,
    Color,
    MeshStandardMaterial,
    SkeletonHelper,
    AnimationMixer,
    MeshPhongMaterial,
    MathUtils,
    PlaneBufferGeometry,
    BoxGeometry,
    SpotLightHelper,
    SpotLight,
    HemisphereLight,
    sRGBEncoding,
    Clock,
    WebGLRenderer,
    PerspectiveCamera, Scene, Vector3, AxesHelper, Camera
} from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import type { GLTF, } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Player } from './components/player';


type ProgressBarCallback = (progress?: number, finished?: boolean) => void;

/**
 * Classe principal do jogo
 */
export class MainGame {
    /** ---------- System Properties --------- **/

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

    /* Canvas Container */
    private canvasContainer: HTMLDivElement;

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

    /* Controle de Orbita */
    // controls: OrbitControls;

    /* Controle de animação */
    animationsMixer: AnimationMixer[];

    /* Controle de tempo de execução */
    clock: Clock;

    // TODO REMOVER - usado apenas no teste
    cube: Mesh;

    // Opções de debug
    debugOptions = {
        enableSkeleton: false,
        skeletonHelper: null,

        enableSpotlightHelper: false,
        spotlightHelper: null,

        enableCameraHelper: false,
        cameraHelper: null,

        enableAxesHelper: false,
        axesHelper: null
    };

    private hatMaterial?: MeshStandardMaterial;
    private hairMaterial?: MeshStandardMaterial;

    /**
     * Constrói a aplicação
     *
     * @param canvasContainer
     * @param debugEnabled Habilita ou desabilita o debug da aplicação
     * @param loadCallback Carrega o load
     */
    constructor(
        canvasContainer: HTMLDivElement,
        public debugEnabled = false,
        loadCallback: ProgressBarCallback = () => {}
    ) {
        this.canvasContainer = canvasContainer;
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
        this.initLights();

        loadCallback(25, false);

        // Animação e controle
        this.initAnimationMixer();
        this.initBasicControl();

        loadCallback(50, false);

        // Inicia a cena
        this.initScene()
            .then(() => loadCallback(100, true));
    }

    // Cria a camera
    private initCamera() {
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        // this.camera.rotateOnAxis(new Vector3(0, 1, 0), 45);
        // this.camera.rotateOnAxis(new Vector3(1, 0, 0), MathUtils.degToRad(-45));

        this.camera.position.z = 15;
        this.camera.position.y = 20;
        // this.camera.position.z = 15;

        this.camera.lookAt(new Vector3(0, 0, 0));
    }

    private initRender() {
        // Cria o render
        this.renderer = new WebGLRenderer();
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

        const axesHelper = new AxesHelper(5);
        this.scene.add(axesHelper);
    }

    private initLights() {
        // Create an hemisphere light and add it to scene
        const hemisphereLight = new HemisphereLight(0x443333, 0x111122);
        this.scene.add(hemisphereLight);

        // Create an spotlight, which can cast shadows
        const spotLight = new SpotLight(0xffffff, 0.7);
        spotLight.position.set(25, 60, 25);


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
        const spotLightHelper = new SpotLightHelper(spotLight);
        this.scene.add(spotLightHelper);
    }

    private initGrounPlane() {
        // Add a plane to represent ground on this scene
        const planeGeometry = new PlaneBufferGeometry(4000, 4000, 32, 32);
        const planeMaterial = new MeshStandardMaterial({ color: 0xfffffff });
        const groundPlane = new Mesh(planeGeometry, planeMaterial);
        groundPlane.rotation.x = MathUtils.degToRad(-90);
        groundPlane.receiveShadow = true;
        this.scene.add(groundPlane);

    }

    private initAnimationMixer() {
        this.animationsMixer = [];

        this.clock = new Clock();
    }

    private initBasicControl() {
        // Adiciona controles de órbita para a aplicação
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // this.controls.target.set(0, 0.5, 0);
        // this.controls.target
        // this.controls.update();
        // this.controls.enablePan = true;
        // this.controls.enableDamping = true;
    }

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

        // Carrega o player
        this.player = await Player.loadPlayer(this.frontCamera);

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

        // Salva as demais propriedades
        this.animationsMixer.push(this.player.animationMixer);

        // Adiciona elementos a cena
        this.scene.add(this.frontCamera);
        this.scene.add(this.player.model);
    }

    private createDummyCube() {
        // Cria um elemento qualquer
        const cubeSize = 1;
        const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
        geometry.translate(0, (cubeSize / 2), 0)

        const material = new MeshPhongMaterial({
            color: 0xff3e00,
            // wireframe: true,
        });
        this.cube = new Mesh(geometry, material);

        this.cube.castShadow = true;
        this.cube.receiveShadow = true;

        this.scene.add(this.cube);
    }

    private async initScene() {
        this.initGrounPlane();

        // TODO REMOVER - Apenas para teste
        this.createDummyCube();

        // TODO REMOVE ou USA
        // this.scene.fog = new Fog( 0x72645b, 10, 30 );

        this.initPlayer();
    }



    /**
     * Inicializa as opções de Debug da aplicação
     * @private
     */
    private initDebugOptions() {
        this.debugStats = Stats();
        this.canvasContainer.appendChild(this.debugStats.dom);

        this.debugMenu = new dat.GUI();
        this.debugMenu.close();

        const debug = this.debugMenu.addFolder('helpers');

        debug.add(this.debugOptions, 'enableSkeleton', false);
        debug.add(this.debugOptions, 'enableSpotlightHelper', false);
        debug.add(this.debugOptions, 'enableCameraHelper', false);
        debug.add(this.debugOptions, 'enableAxesHelper', false);

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
        return (window.innerWidth / window.innerHeight) >= 1;
    }

    /**
     * Redimensiona a tela do jogo
     */
    setRenderSize() {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const borderPercentage = 0.01;

        // Atualiza as camera
        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix();

        this.frontCamera.aspect = aspectRatio;
        this.frontCamera.updateProjectionMatrix();

        // Atualiza o render
        this.renderer.setSize(
            window.innerWidth * (1 - borderPercentage),
            window.innerHeight * (1 - (borderPercentage * aspectRatio))
        );
    }

    /**
     * Executa frame a frame do jogo
     *
     * @private
     */
    private step() {
        if (this.debugEnabled) {
            this.updateDebugStats();
        }

        // Game Logic

        // TODO REMOVER - Rotaciona o cubo
        // this.cube.rotation.x += 0.01;
        // this.cube.rotation.y += 0.01;
        this.cube.castShadow = true;

        // Atualiza o controle de órbita
        // this.controls.update();

        let mixerUpdateDelta = this.clock.getDelta();
        for (const animationMixer of this.animationsMixer) {
            animationMixer.update(mixerUpdateDelta);
        }

        // Update player movement
        if (!!this.player) {
            this.player.updateAnimation();
            this.player.updatePlayerMovement();
            // this.player.updateFrontCamera();
            this.player.updateIsometricCamera(this.camera);

            if (this.player.checkCollision(new Vector3(0, 0, 0), 2)) {
                console.log('COLLISION!');
            }
        }

        // Renderiza a cena
        this.render();

        // Chama o próximo frame
        this.animationFrameHandler = requestAnimationFrame(() => this.step());
    }

    updateDebugOptions() {

    }

    /**
     * Executa a aplicação
     */
    run() {
        // Inicia loop de renderização se jogo estiver parado
        if (!this.isRunning) {
            this.animationFrameHandler = requestAnimationFrame(() => this.step());
            this.isRunning = true;
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
