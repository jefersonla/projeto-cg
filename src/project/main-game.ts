import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
        this.camera.position.z = 2

        // Cria o render
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerHeight * 0.8, window.innerHeight * 0.8);

        // Insere o render a página
        canvasArea.appendChild(this.renderer.domElement);

        // Adiciona controles de órbita para a aplicação
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // TODO REMOVER - Apenas para teste
        // Cria um elemento qualquer
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0xff3e00,
            wireframe: true,
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    /**
     * Executa a aplicação
     */
    run() {
        // Loop de renderização
        requestAnimationFrame(() => this.run());

        // Game Logic

        // TODO REMOVER - Rotaciona o cubo
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        // Atualiza o controle de órbita
        this.controls.update();

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
