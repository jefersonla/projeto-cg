import {
    BufferAttribute,
    BufferGeometry,
    Color,
    MathUtils,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    Vector3
} from "three";

/**
 * Cena com muitas particulas
 */
export class FireworksScene {
    scene: Scene;
    done: boolean;
    dest: Vector3[];
    colors: Color[];
    geometry: BufferGeometry;
    points: Points;
    material: PointsMaterial;

    constructor(scene) {
        this.scene = scene;
        this.done = false;
        this.dest = [];
        this.colors = [];
        this.geometry = null;
        this.points = null;
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

    reset() {
        this.scene.remove(this.points);
        this.dest = [];
        this.colors = [];
        this.geometry = null;
        this.points = null;
    }

    // launch
    launch() {
        let x = MathUtils.randInt( -window.innerWidth, window.innerWidth );
        let y = MathUtils.randInt( 100, 800 );
        let z = MathUtils.randInt( -1000, -3000 );

        let from = new Vector3( x, -800, z );
        let to   = new Vector3( x, y, z );

        let color = new Color();
        color.setHSL(MathUtils.randFloat(0.1, 0.9 ), 1, 0.9);
        this.colors.push(color);

        this.geometry = new BufferGeometry();
        this.points   = new Points(this.geometry, this.material);

        const normalizedColors: number[] = this.colors
            .map(el => el.toArray())
            .reduce((acc, el) => [...acc, ...el], [] as number[]);

        const normalizedVertices = this.dest.reduce((acc, el) => [...acc, ...el.toArray()], [] as number[]);

        this.geometry.setAttribute('color', new BufferAttribute(normalizedColors, 3));
        this.geometry.setAttribute('vertices', new BufferAttribute(normalizedVertices, 3));

        this.dest.push( to );
        this.colors.push( color );
        this.scene.add( this.points );
    }

    // explode
    explode(vector) {
        this.scene.remove( this.points );
        this.dest = [];
        this.colors = [];
        this.geometry = new BufferGeometry();
        this.points = new Points( this.geometry, this.material );

        for( let i = 0; i < 80; i++ )
        {
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

            this.geometry.vertices.push( from );

            this.dest.push(to);
        }

        this.geometry.colors = this.colors;
        this.scene.add( this.points );
    }

    // update
    update() {
        // only if objects exist
        if( this.points && this.geometry )
        {
            let total = this.geometry.attributes['vertices'].length;

            // lerp particle positions
            for(let i = 0; i < total; i++)
            {
                this.geometry.attributes['vertices'][i].x += ( this.dest[i].x - this.geometry.attributes['vertices'][i].x ) / 20;
                this.geometry.attributes['vertices'][i].y += ( this.dest[i].y - this.geometry.attributes['vertices'][i].y ) / 20;
                this.geometry.attributes['vertices'][i].z += ( this.dest[i].z - this.geometry.attributes['vertices'][i].z ) / 20;
                this.geometry.verticesNeedUpdate = true;
            }

            // watch first particle for explosion
            if( total === 1 ) {
                if( Math.ceil(this.geometry.vertices[0].y) > (this.dest[0].y - 20)) {
                    this.explode(this.geometry.vertices[0]);
                    return;
                }
            }
            // fade out exploded particles
            if(total > 1)
            {
                this.material.opacity -= 0.015;
                (this.material as any).colorsNeedUpdate = true;
            }

            // remove, reset and stop animating
            if(this.material.opacity <= 0)
            {
                this.reset();
                this.done = true;
                return;
            }
        }
    }
}

/**
 * Stage setup
 */
const to = { px: 0, py: 0, pz: 500 };
const fireworks = [];

const scene = new Scene();
const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 20000);
camera.position.set( 0, 0, 0 );
camera.rotation.set( 0, 0, 0 );

// animation loop
function draw()
{
    // add fireworks
    if(MathUtils.randInt( 1, 20 ) === 10) {
        fireworks.push(new FireworksScene(scene));
    }

    // update fireworks
    for(let i = 0; i < fireworks.length; i++) {
        if( fireworks[i].done ) {
            fireworks.splice(i, 1);
            continue;
        }
        fireworks[i].update();
    }

    // lerp camera position
    camera.position.x += (to.px - camera.position.x) / 40;
    camera.position.y += (to.py - camera.position.y) / 40;
    camera.position.z += (to.pz - camera.position.z) / 40;

    // render
    renderer.render(scene, camera);

    requestAnimationFrame(draw);
}

// run
draw();










