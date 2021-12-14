import {
    Audio,
    AudioListener,
    BufferAttribute,
    BufferGeometry,
    Color,
    HemisphereLight,
    MathUtils,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    Vector3,
    WebGLRenderer
} from "three";
import type Stats from "three/examples/jsm/libs/stats.module";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";
import {CustomAudioLoader} from "./custom-audio-loader";

/**
 * Cria a cena e a camera
 */
function createSceneAndCamera(): [Scene, PerspectiveCamera] {
    const scene = new Scene();
    const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);

    camera.position.set( -0, 0, 0 );
    camera.rotation.set(0, 0, 0);

    scene.add(camera);

    return [scene, camera];
}

/**
 * Cria a mensagem de sucesso
 */
async function createCongratulationsTextMesh(): Promise<Mesh> {
    const fontLoader = new FontLoader();
    const font = await fontLoader.loadAsync('game/fonts/helvetiker_bold.typeface.json');

    const textGeo = new TextGeometry('Vitoria!', {
        font: font,

        size: 80,
        height: 2,
        curveSegments: 12,

        bevelEnabled: true,
        bevelThickness: 3,
        bevelSize: 1,
        bevelOffset: 1,
        bevelSegments: 5
    });

    const textMesh = new Mesh(textGeo, new MeshPhongMaterial({
        color: new Color('#ffffff'),
    }));

    textMesh.position.set(-210, -40, -300);
    textMesh.rotation.set(0, 0, 0);

    return textMesh;
}

/**
 * Executa um som qualquer uma única vez
 *
 * @param audioBuffer
 * @param audioListener
 * @param volume
 */
function playAudioBuffer(audioBuffer: AudioBuffer, audioListener: AudioListener, volume: number) {
    const sound = new Audio(audioListener);
    sound.setVolume(volume);
    sound.setBuffer(audioBuffer);
    sound.setLoop(false);
    sound.play();
}

/**
 * Define as músicas que essa cena irá utilizar
 */
interface FireworkSongs {
    explode: AudioBuffer,
    launch: AudioBuffer
}

/**
 * Cena com muitas partículas
 */
export class FireworksScene {

    /**
     * Inicia a animação composta
     *
     * @param renderer
     * @param audioListener
     * @return Retorna a cena iniciada
     */
    static async playScene(renderer: WebGLRenderer, audioListener: AudioListener): Promise<FireworksScene> {
        const fireworks = [];

        const [scene, camera] = createSceneAndCamera();

        const textMesh = await createCongratulationsTextMesh();
        scene.add(textMesh);

        const hemisphereLight = new HemisphereLight(0xfffffff, 0x333333);
        scene.add(hemisphereLight);

        const fireworkSongs: FireworkSongs = {
            explode: await CustomAudioLoader.load('game/sounds/firework_explode.ogg'),
            launch: await CustomAudioLoader.load('game/sounds/firework_launch.ogg')
        };

        return new FireworksScene(camera, scene, renderer, fireworks, fireworkSongs, audioListener);
    }

    /* Indica se a cena está sendo executada */
    private isRunning: boolean;

    /* Indica se a cópia da cena atingiu seu fim */
    done: boolean;

    /* Propriedades para as partículas na cena */
    vertices: Vector3[];
    dest: Vector3[];
    colors: Color[];
    points: Points;

    /* Geometria inicial */
    geometry: BufferGeometry;

    /* Material da cena */
    material: PointsMaterial;

    /* Id da execução do frame para cancelamento */
    animationFrameHandler: number;

    /* Debug status */
    stats?: Stats;

    /**
     * Constrói a cena
     *
     * @param camera
     * @param scene
     * @param renderer
     * @param fireworks
     * @param fireworkSongs
     * @param audioListener
     */
    constructor(
        public camera: PerspectiveCamera,
        public scene: Scene,
        public renderer: WebGLRenderer,
        public fireworks: FireworksScene[],
        public fireworkSongs: FireworkSongs,
        public audioListener: AudioListener
    ) {
        this.isRunning = false; // Apenas o método RUN pode modificar essa propriedade
        this.done = false;

        this.vertices = [];
        this.dest = [];
        this.colors = [];
        this.points = null;

        this.geometry = null;
        this.material = new PointsMaterial({

            size: 16,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false,
        });

        this.launch();
    }

    /**
     * Reinicia a cena
     */
    reset() {
        this.scene.remove(this.points);

        this.vertices = [];
        this.dest = [];
        this.colors = [];
        this.points = null;

        this.geometry = null;
    }

    /**
     * Lançamento do objeto
     */
    launch() {
        playAudioBuffer(this.fireworkSongs.launch, this.audioListener, MathUtils.randFloat(0.05, 0.12));

        const x = MathUtils.randInt( -window.innerWidth, window.innerWidth );
        const y = MathUtils.randInt( 100, 800 );
        const z = MathUtils.randInt( -1000, -3000 );

        const from = new Vector3( x, -800, z );
        const to = new Vector3( x, y, z );

        let color = new Color();
        color.setHSL(MathUtils.randFloat(0.1, 0.9 ), 1, 0.9);
        this.colors.push(color);

        this.vertices.push(from);

        this.geometry = new BufferGeometry();
        this.points = new Points(this.geometry, this.material);

        const normalizedColors: number[] = this.colors
            .map(el => el.toArray())
            .reduce((acc, el) => [...acc, ...el], [] as number[]);

        const normalizedVertices = this.vertices
            .map(el => el.toArray())
            .reduce((acc, el) => [...acc, ...el], [] as number[]);

        this.geometry.setAttribute('color', new BufferAttribute(new Float32Array(normalizedColors), 3));
        this.geometry.setAttribute('position', new BufferAttribute(new Float32Array(normalizedVertices), 3));

        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.color.needsUpdate = true;

        this.dest.push(to);
        this.colors.push(color);
        this.scene.add(this.points);
    }

    /**
     * Explosão
     *
     * @param vector
     */
    explode(vector) {
        playAudioBuffer(this.fireworkSongs.explode, this.audioListener, MathUtils.randFloat(0.1, 0.25));

        this.scene.remove(this.points);
        this.dest = [];
        this.colors = [];
        this.geometry = new BufferGeometry();
        this.points = new Points(this.geometry, this.material);

        for(let i = 0; i < 80; i++) {
            let color = new Color();
            color.setHSL( MathUtils.randFloat(0.1, 0.9 ), 1, 0.5);
            this.colors.push( color );

            let from = new Vector3(
                MathUtils.randInt(vector.x - 10, vector.x + 10),
                MathUtils.randInt(vector.y - 10, vector.y + 10),
                MathUtils.randInt(vector.z - 10, vector.z + 10)
            );

            let to = new Vector3(
                MathUtils.randInt(vector.x - 1000, vector.x + 1000),
                MathUtils.randInt(vector.y - 1000, vector.y + 1000),
                MathUtils.randInt(vector.z - 1000, vector.z + 1000)
            );

            this.vertices.push(from);

            const normalizedVertices = this.vertices
                .map(el => el.toArray())
                .reduce((acc, el) => [...acc, ...el], [] as number[]);

            this.geometry.setAttribute('position', new BufferAttribute(new Float32Array(normalizedVertices), 3));

            this.dest.push(to);
        }

        const normalizedColors: number[] = this.colors
            .map(el => el.toArray())
            .reduce((acc, el) => [...acc, ...el], [] as number[]);

        this.geometry.setAttribute('color', new BufferAttribute(new Float32Array(normalizedColors), 3));

        this.scene.add(this.points);
    }

    /**
     * Atualiza a animação
     */
    update() {
        // Apenas se existir pontos e geometria
        if (!this.points || !this.geometry) {
            return;
        }

        let total = Math.min(this.vertices.length, this.dest.length);

        // Ler da posição das partículas
        for (let i = 0; i < total; i++) {
            this.vertices[i].x += (this.dest[i].x - this.vertices[i].x) / 20;
            this.vertices[i].y += (this.dest[i].y - this.vertices[i].y) / 20;
            this.vertices[i].z += (this.dest[i].z - this.vertices[i].z) / 20;
        }

        const normalizedVertices = this.vertices
            .map(el => el.toArray())
            .reduce((acc, el) => [...acc, ...el], [] as number[]);

        this.geometry.setAttribute('position', new BufferAttribute(new Float32Array(normalizedVertices), 3));

        // Observa a explosão da primeira partícula
        if (total === 1) {
            if (Math.ceil(this.vertices[0].y) > (this.dest[0].y - 20)) {
                this.explode(this.vertices[0]);
                return;
            }
        }

        // Fad Out para partículas que já explodiram
        if (total > 1) {
            this.material.opacity -= 0.015;
            (this.material as any).colorsNeedUpdate = true;
        }

        // Remove, reinicia e para a animação
        if (this.material.opacity <= 0) {
            this.reset();
            this.done = true;
            return;
        }
    }

    /**
     * Executa frame a frame da cena
     *
     * @private
     */
    private step() {
        // Adiciona um fogo de artificio toda vez que atingimos um certo valor randômico
        if(MathUtils.randInt(1, 20) === 10) {
            this.fireworks.push(new FireworksScene(
                this.camera,
                this.scene,
                this.renderer,
                this.fireworks,
                this.fireworkSongs,
                this.audioListener
            ));
        }

        // Atualiza a execução dos fogos de artificio que não tiverem sido finalizados
        for(let i = 0; i < this.fireworks.length; i++) {
            if(this.fireworks[i].done) {
                this.fireworks.splice(i, 1);
                continue;
            }

            this.fireworks[i].update();
        }

        // Renderiza a cena
        this.render();

        // Chama o próximo frame
        this.animationFrameHandler = requestAnimationFrame(() => this.step());
    }

    /**
     * Executa a aplicação
     */
    start(stats?: Stats) {
        this.stats = stats;

        // Inicia loop de renderização se jogo estiver parado
        if (!this.isRunning) {
            this.isRunning = true;
            this.renderer.setClearColor(new Color('#000000'));
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
        }
    }

    /**
     * Renderiza a cena usando a camera padrão
     */
    render() {
        if (this.stats) {
            this.stats.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}











