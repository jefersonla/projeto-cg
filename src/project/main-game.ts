import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Classe principal do jogo
 */
export class MainGame {
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;

    cube: THREE.Mesh;

    constructor(canvasArea: HTMLDivElement) {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
            75,
            1,
            0.1,
            1000
        );
        this.camera.position.z = 2

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerHeight * 0.8, window.innerHeight * 0.8);

        canvasArea.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({
            color: 0xff3e00,
            wireframe: true,
        });

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // Mover isso para outro lugar
        window.addEventListener('resize', () => {
            // this.camera.aspect = window.innerWidth / window.innerHeight;
            // this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerHeight * 0.8, window.innerHeight * 0.8);
            this.renderer.render(this.scene, this.camera);
        }, false);
    }

    run() {
        requestAnimationFrame(() => this.run());

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.controls.update();

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
