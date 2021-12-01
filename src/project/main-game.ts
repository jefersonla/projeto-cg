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
    PerspectiveCamera, Scene
} from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';

/**
 * Classe principal do jogo
 */
export class MainGame {
    /** ---------- System Properties --------- **/

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

    /* Render da aplicação */
    renderer: WebGLRenderer;

    /* Controle de Orbita */
    controls: OrbitControls;

    /* Controle de animação */
    mixers: AnimationMixer[];

    /* Controle de tempo de execução */
    clock: Clock;

    // TODO REMOVER - usado apenas no teste
    cube: Mesh;

    private hatMaterial: MeshStandardMaterial;
    private hairMaterial: MeshStandardMaterial;

    /**
     * Constrói a aplicação
     *
     * @param canvasContainer
     * @param debugEnabled Habilita ou desabilita o debug da aplicação
     */
    constructor(
        canvasContainer: HTMLDivElement,
        public debugEnabled = false
    ) {
        this.canvasContainer = canvasContainer;

        // Inicializa o sistema de debug
        if (debugEnabled) {
            this.initDebugOptions();
        }

        // Cria a cena que irá abrigar os dados
        this.scene = new Scene();

        // Cria a camera
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth/window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.x = 5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;

        // Cria o render
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(
            window.innerWidth * 0.95,
            window.innerHeight * 0.95
        );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.shadowMap.enabled = true;

        this.clock = new Clock();

        // Insere o render a página
        this.canvasContainer.appendChild(this.renderer.domElement);

        // Adiciona controles de órbita para a aplicação
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // this.controls.target.set( 0, 0.5, 0 );
        this.controls.update();
        this.controls.enablePan = true;
        this.controls.enableDamping = true;

        // Create an hemisphere light and add it to scene
        const hemisphereLight = new HemisphereLight(0x443333, 0x111122);
        this.scene.add(hemisphereLight);

        // Create an spotlight, which can cast shadows
        const spotLight = new SpotLight( 0xffffff );
        spotLight.position.set( 10, 10, 10 );

        // Enable shadow
        spotLight.castShadow = true;

        // Configure map size
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        // Configure shadow
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 130;
        spotLight.shadow.camera.fov = 1;

        // Add spotlight to scene
        this.scene.add(spotLight);

        // Add a spotlight helper to help orientation
        const spotLightHelper = new SpotLightHelper( spotLight );
        this.scene.add( spotLightHelper );

        // Add a plane to represent ground on this scene
        const planeGeometry = new PlaneBufferGeometry(4000, 4000, 32, 32);
        const planeMaterial = new MeshStandardMaterial({ color: 0xfffffff });
        const groundPlane = new Mesh(planeGeometry, planeMaterial);
        groundPlane.rotation.x = MathUtils.degToRad(-90);
        groundPlane.receiveShadow = true;
        this.scene.add(groundPlane);

        // TODO REMOVER - Apenas para teste
        // Cria um elemento qualquer
        const geometry = new BoxGeometry();
        geometry.translate(0, 0.5, 0)

        const material = new MeshPhongMaterial({
            color: 0xff3e00,
            // wireframe: true,
        });
        this.cube = new Mesh(geometry, material);

        this.cube.castShadow = true;
        this.cube.receiveShadow = true;

        this.scene.add(this.cube);
        // this.scene.fog = new Fog( 0x72645b, 10, 30 );

        this.renderer.setClearColor(0x72645b, 1);
        // this.renderer.ga = true;
        // this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;

        this.mixers = [];

        const loader = new GLTFLoader();
        loader.load( 'game/models/cau.glb', ( gltf ) => {

            const model = gltf.scene.children[0];

            console.log(gltf)

            model.traverse(o => {
                if (o instanceof Mesh) {
                    o.castShadow = true;

                    if (o.name == 'Hat') {
                        this.hatMaterial = (o.material as MeshStandardMaterial);
                        (o.material as MeshStandardMaterial).color = new Color('#2e7bd9');
                    } else if (o.name == 'Hair') {
                        this.hairMaterial = (o.material as MeshStandardMaterial);
                        (o.material as MeshStandardMaterial).color = new Color('#b109d7');
                    }
                }
            });

            // model.children.forEach((o) => {
            //     console.log(o)
            //
            //     if (o.type == 'SkinnedMesh') {
            //         const child: SkinnedMesh = o as any;
            //
            //         const uniforms = {
            //             u_helmet_texture: { value: null }
            //         };
            //
            //         uniforms.u_helmet_texture.value = (child.material as any).map;
            //
            //         if (child.name == "Hair") {
            //             (child.material as MeshStandardMaterial).color = new Color('#333');
            //         }
            //         // child.material =  new ShaderMaterial({
            //         //     uniforms: mergeUniforms( [
            //         //         UniformsLib.common,
            //         //         UniformsLib.envmap,
            //         //         UniformsLib.aomap,
            //         //         UniformsLib.lightmap,
            //         //         UniformsLib.emissivemap,
            //         //         UniformsLib.bumpmap,
            //         //         UniformsLib.normalmap,
            //         //         UniformsLib.displacementmap,
            //         //         UniformsLib.roughnessmap,
            //         //         UniformsLib.metalnessmap,
            //         //         UniformsLib.fog,
            //         //         UniformsLib.lights,
            //         //         {
            //         //             emissive: { value: new Color( 0x000000 ) },
            //         //             roughness: { value: 1.0 },
            //         //             metalness: { value: 0.0 },
            //         //             envMapIntensity: { value: 1 } // temporary
            //         //         }
            //         //     ] ),
            //         //     vertexShader: ShaderChunk.meshphysical_vert,
            //         //     fragmentShader: ShaderChunk.meshphysical_frag
            //         // });
            //
            //         o.castShadow = true;
            //         // o.receiveShadow = true; -- checar problemas
            //     }
            // });

            this.scene.add( model );
            model.castShadow = true;
            model.receiveShadow = true;

            model.translateX(2);

            const skeleton = new SkeletonHelper( model );
            skeleton.visible = true;

            this.scene.add( skeleton );

            const animations = gltf.animations;

            const objMixer = new AnimationMixer( model );
            this.mixers.push(objMixer);

            const idleAction = objMixer.clipAction( animations[ 0 ] );
            const runAction = objMixer.clipAction( animations[ 1 ] );

            runAction.enabled = true;
            runAction.setEffectiveTimeScale( 1 );
            runAction.setEffectiveWeight( 1 );

            idleAction.enabled = true;
            idleAction.setEffectiveTimeScale( 1 );
            idleAction.setEffectiveWeight( 1 );

            idleAction.paused = false;
            idleAction.play();

            document.addEventListener('keydown', (evt) => {
                const allowedKeys = [
                    'A',
                    'W',
                    'S',
                    'D'
                ];

                if (allowedKeys.includes(evt.key.toUpperCase())) {
                    idleAction.paused = true;
                    idleAction.stopFading();

                    runAction.paused = false;
                    runAction.play();

                    switch (evt.key.toUpperCase()) {
                        case 'W':
                            model.position.z += 0.15;
                            break;
                        case 'A':
                            model.position.x -= 0.15;
                            break;
                        case 'S':
                            model.position.z -= 0.15;
                            break;
                        case 'D':
                            model.position.x += 0.15;
                            break;
                    }
                }
            });

            document.addEventListener('keyup', () => {
                runAction.paused = true;
                runAction.stopFading();

                idleAction.paused = false;
                idleAction.play();
            });
        } );
    }

    /**
     * Inicializa as opções de Debug da aplicação
     * @private
     */
    private initDebugOptions() {
        this.debugStats = Stats();
        this.canvasContainer.appendChild( this.debugStats.dom );

        this.debugMenu = new dat.GUI();
        // this.debugMenu.show();
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
        if (materialName == 'hat') {
            this.hatMaterial.color = new Color(materialColor);
        } else if (materialName == 'hair') {
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

        // Atualiza a camera
        this.camera.aspect = aspectRatio;
        this.camera.updateProjectionMatrix();

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
        this.cube.rotation.y += 0.01;
        this.cube.castShadow = true;

        // Atualiza o controle de órbita
        this.controls.update();

        let mixerUpdateDelta = this.clock.getDelta();
        for (const mixer of this.mixers) {
            mixer.update( mixerUpdateDelta );
        }

        // Renderiza a cena
        this.render();

        // Chama o próximo frame
        this.animationFrameHandler = requestAnimationFrame(() => this.step());
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
        this.renderer.render(this.scene, this.camera);
    }
}
