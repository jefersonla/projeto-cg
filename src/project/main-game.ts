import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import type {SkinnedMesh} from "three";

/**
 * Classe principal do jogo
 */
export class MainGame {
    /* Cena atual do jogo */
    scene: THREE.Scene;

    /* Camera da aplicação */
    camera: THREE.PerspectiveCamera;

    /* Render da aplicação */
    renderer: THREE.WebGLRenderer;

    /* Controle de Orbita */
    controls: OrbitControls;

    mixers: THREE.AnimationMixer[];
    clock: THREE.Clock;

    stats: Stats;

    // TODO REMOVER - usado apenas no teste
    cube: THREE.Mesh;

    /**
     * Constroi a aplicação
     * @param canvasArea 
     */
    constructor(canvasArea: HTMLDivElement) {
        // Cria a cena que irá abrigar os dados
        this.scene = new THREE.Scene()

        // Cria a camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        );
        this.camera.position.x = 5;
        this.camera.position.y = 5;
        this.camera.position.z = 5;

        // Cria o render
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(Math.min(window.innerHeight, window.innerWidth) * 0.8, Math.min(window.innerHeight, window.innerWidth) * 0.8);
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;

        this.clock = new THREE.Clock();

        // Insere o render a página
        canvasArea.appendChild(this.renderer.domElement);

        // Adiciona controles de órbita para a aplicação
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // this.controls.target.set( 0, 0.5, 0 );
        this.controls.update();
        this.controls.enablePan = true;
        this.controls.enableDamping = true;

        this.stats = Stats();
        canvasArea.appendChild( this.stats.dom );

        // Create an hemisphere light and add it to scene
        const hemisphereLight = new THREE.HemisphereLight(0x443333, 0x111122);
        this.scene.add(hemisphereLight);

        // Create an spotlight, which can cast shadows
        const spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 10, 10, 10 );

        // Enable shadow
        spotLight.castShadow = true;

        // Configure map size
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;

        // Configure shadow
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 30;
        spotLight.shadow.camera.fov = 1;

        // Add spotlight to scene
        this.scene.add(spotLight);

        // Add a spotlight helper to help orientation
        const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        this.scene.add( spotLightHelper );

        // Add a plane to represent ground on this scene
        const planeGeometry = new THREE.PlaneBufferGeometry(4000, 4000, 32, 32);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xfffffff });
        const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
        groundPlane.rotation.x = THREE.MathUtils.degToRad(-90);
        groundPlane.receiveShadow = true;
        this.scene.add(groundPlane);

        // TODO REMOVER - Apenas para teste
        // Cria um elemento qualquer
        const geometry = new THREE.BoxGeometry();
        geometry.translate(0, 0.5, 0)

        const material = new THREE.MeshPhongMaterial({
            color: 0xff3e00,
            // wireframe: true,
        });
        this.cube = new THREE.Mesh(geometry, material);

        this.cube.castShadow = true;
        this.cube.receiveShadow = true;

        this.scene.add(this.cube);
        // this.scene.fog = new THREE.Fog( 0x72645b, 10, 30 );

        this.renderer.setClearColor(0x72645b, 1);
        // this.renderer.ga = true;
        // this.renderer.gammaOutput = true;
        this.renderer.shadowMap.enabled = true;

        this.mixers = [];

        const loader = new GLTFLoader();
        loader.load( 'game/models/scout_girl.glb', ( gltf ) => {

            const model = gltf.scene.children[0];

            model.children.forEach((o) => {

                if (o.type == 'SkinnedMesh') {
                    const child: SkinnedMesh = o as any;

                    const uniforms = {
                        u_helmet_texture: { value: null }
                    };

                    uniforms.u_helmet_texture.value = (child.material as any).map;
                    child.material =  new THREE.ShaderMaterial({
                        uniforms: uniforms,
                        vertexShader: "\
varying vec3 vPosition;\
varying vec2 vUv;\
\
uniform float radius;\
uniform sampler2D textureBg;\
\
void main() {\
    gl_Position = vec4(position, 10);\
    vPosition = vec3(position);\
    vUv = uv;\
}",
                        fragmentShader:  "\
varying vec3 vPosition;\
varying vec2 vUv;\
\
uniform float radius;\
uniform sampler2D textureBg;\
\
const float pi = 3.141592653589793;\
\
vec3 hsl2rgb(in vec3 c)\
{\
vec3 rgb = clamp(\
abs(\
mod(\
c.x * 6.0 + vec3(0.0,4.0,2.0),\
6.0\
) - 3.0\
) - 1.0,\
0.0,\
1.0\
);\
\
    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));\
}\
\
void main() {\
    gl_FragColor = texture2D(textureBg, vUv);\
    gl_FragColor.x = 1.0;\
    \
    gl_FragColor.a = 1.0;\
}",
                    });

                    o.castShadow = true;
                    // o.receiveShadow = true; -- checar problemas
                }
            });

            this.scene.add( model );
            model.castShadow = true;
            model.receiveShadow = true;

            model.translateX(2);

            const skeleton = new THREE.SkeletonHelper( model );
            skeleton.visible = true;

            this.scene.add( skeleton );

            const animations = gltf.animations;

            const objMixer = new THREE.AnimationMixer( model );
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
     * Executa a aplicação
     */
    run() {
        // Loop de renderização
        requestAnimationFrame(() => this.run());

        // Game Logic

        // TODO REMOVER - Rotaciona o cubo
        //this.cube.rotation.x += 0.01;
        //this.cube.rotation.y += 0.01;

        // Atualiza o controle de órbita
        this.controls.update();

        this.stats.update();

        let mixerUpdateDelta = this.clock.getDelta();
        for (const mixer of this.mixers) {
            mixer.update( mixerUpdateDelta );
        }

        // Renderiza a cena
        this.render();
    }

    /**
     * Renderiza a cena usando a camera padrão
     */
    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
