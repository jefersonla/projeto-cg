/**
 * Global utils
 */
(function() {

    var _w = window,
        _s = window.screen,
        _b = document.body,
        _d = document.documentElement;

    window.Utils = {

        // screen info
        screen: function()
        {
            var width  = Math.max( 0, _w.innerWidth || _d.clientWidth || _b.clientWidth || 0 );
            var height = Math.max( 0, _w.innerHeight || _d.clientHeight || _b.clientHeight || 0 );

            return {
                width   : width,
                height  : height,
                centerx : width / 2,
                centery : height / 2,
                ratio   : width / height,
            };
        },
        // mouse info
        mouse: function( e )
        {
            var x = Math.max( 0, e.pageX || e.clientX || 0 );
            var y = Math.max( 0, e.pageY || e.clientY || 0 );
            var s = this.screen();

            return {
                x : x,
                y : y,
                centerx : ( x - s.centerx ),
                centery : ( y - s.centery ),
            };
        },
    };
})();

/**
 * Firework object
 */
(function() {

    // constructor
    var Firework = function( scene )
    {
        this.scene    = scene;
        this.done     = false;
        this.dest     = [];
        this.colors   = [];
        this.geometry = null;
        this.points   = null;
        this.material = new THREE.PointsMaterial({
            size: 16,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false,
        });
        this.launch();
    };

    // prototype
    Firework.prototype = {
        constructor: Firework,

        // reset
        reset: function()
        {
            this.scene.remove( this.points );
            this.dest     = [];
            this.colors   = [];
            this.geometry = null;
            this.points   = null;
        },

        // launch
        launch: function()
        {
            var s = Utils.screen();
            var x = THREE.Math.randInt( -s.width, s.width );
            var y = THREE.Math.randInt( 100, 800 );
            var z = THREE.Math.randInt( -1000, -3000 );

            var from = new THREE.Vector3( x, -800, z );
            var to   = new THREE.Vector3( x, y, z );

            var color = new THREE.Color();
            color.setHSL( THREE.Math.randFloat( 0.1, 0.9 ), 1, 0.9 );
            this.colors.push( color );

            this.geometry = new THREE.Geometry();
            this.points   = new THREE.Points( this.geometry, this.material );

            this.geometry.colors = this.colors;
            this.geometry.vertices.push( from );
            this.dest.push( to );
            this.colors.push( color );
            this.scene.add( this.points );
        },

        // explode
        explode: function( vector )
        {
            this.scene.remove( this.points );
            this.dest     = [];
            this.colors   = [];
            this.geometry = new THREE.Geometry();
            this.points   = new THREE.Points( this.geometry, this.material );

            for( var i = 0; i < 80; i++ )
            {
                var color = new THREE.Color();
                color.setHSL( THREE.Math.randFloat( 0.1, 0.9 ), 1, 0.5 );
                this.colors.push( color );

                var from = new THREE.Vector3(
                    THREE.Math.randInt( vector.x - 10, vector.x + 10 ),
                    THREE.Math.randInt( vector.y - 10, vector.y + 10 ),
                    THREE.Math.randInt( vector.z - 10, vector.z + 10 )
                );
                var to = new THREE.Vector3(
                    THREE.Math.randInt( vector.x - 1000, vector.x + 1000 ),
                    THREE.Math.randInt( vector.y - 1000, vector.y + 1000 ),
                    THREE.Math.randInt( vector.z - 1000, vector.z + 1000 )
                );
                this.geometry.vertices.push( from );
                this.dest.push( to );
            }
            this.geometry.colors = this.colors;
            this.scene.add( this.points );
        },

        // update
        update: function()
        {
            // only if objects exist
            if( this.points && this.geometry )
            {
                var total = this.geometry.vertices.length;

                // lerp particle positions
                for( var i = 0; i < total; i++ )
                {
                    this.geometry.vertices[i].x += ( this.dest[i].x - this.geometry.vertices[i].x ) / 20;
                    this.geometry.vertices[i].y += ( this.dest[i].y - this.geometry.vertices[i].y ) / 20;
                    this.geometry.vertices[i].z += ( this.dest[i].z - this.geometry.vertices[i].z ) / 20;
                    this.geometry.verticesNeedUpdate = true;
                }
                // watch first particle for explosion
                if( total === 1 )
                {
                    if( Math.ceil( this.geometry.vertices[0].y ) > ( this.dest[0].y - 20 ) )
                    {
                        this.explode( this.geometry.vertices[0] );
                        return;
                    }
                }
                // fade out exploded particles
                if( total > 1 )
                {
                    this.material.opacity -= 0.015;
                    this.material.colorsNeedUpdate = true;
                }
                // remove, reset and stop animating
                if( this.material.opacity <= 0 )
                {
                    this.reset();
                    this.done = true;
                    return;
                }
            }
        },
    };

    // export
    window.Firework = Firework;
})();

/**
 * Stage setup
 */
(function() {

    var screen    = Utils.screen(),
        renderer  = null,
        camera    = null,
        scene     = null,
        to        = { px: 0, py: 0, pz: 500 },
        fireworks = [];

    try {
        renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
        camera   = new THREE.PerspectiveCamera( 60, screen.ratio, 0.1, 20000 );
        scene    = new THREE.Scene();
    }
    catch( e ) {
        alert( "THREE.JS Error: " + e.toString() );
        return;
    }

    // on screen resize
    function onResize( e )
    {
        var s = Utils.screen();
        renderer.setSize( s.width, s.height );
        camera.aspect = s.ratio;
        camera.updateProjectionMatrix();
    };

    // on mouse move
    function onMouse( e )
    {
        var mouse = Utils.mouse( e );
        to.px =  ( mouse.centerx * 0.95 );
        to.py = -( mouse.centery * 0.95 );
    };

    // on click/tap
    function onPress( e )
    {
        to.pz -= 1000;
    };

    // on click/tap release
    function onRelease( e )
    {
        to.pz += 1000;
    };

    // setup stage
    function setup()
    {
        camera.position.set( 0, 0, 0 );
        camera.rotation.set( 0, 0, 0 );

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor( 0x000000, 0 );
        renderer.sortObjects = true;
        renderer.domElement.style["display"]  = "block";
        renderer.domElement.style["position"] = "fixed";
        renderer.domElement.style["width"]    = "100%";
        renderer.domElement.style["height"]   = "100%";
        renderer.domElement.style["z-index"]  = "-1";

        window.addEventListener( "resize", onResize, false );
        window.addEventListener( "mousemove", onMouse, false );
        window.addEventListener( "mousedown", onPress, false );
        window.addEventListener( "touchstart", onPress, false );
        window.addEventListener( "mouseup", onRelease, false );
        window.addEventListener( "touchsend", onRelease, false );

        document.body.appendChild( renderer.domElement );
    };

    // animation loop
    function draw()
    {
        requestAnimationFrame( draw );

        // if( !document.hasFocus() ) return;

        // add fireworks
        if( THREE.Math.randInt( 1, 20 ) === 10 )
        {
            fireworks.push( new Firework( scene ) );
        }
        // update fireworks
        for( var i = 0; i < fireworks.length; i++ )
        {
            if( fireworks[ i ].done ) // cleanup
            {
                fireworks.splice( i, 1 );
                continue;
            }
            fireworks[ i ].update();
        }

        // lerp camera position
        camera.position.x += ( to.px - camera.position.x ) / 40;
        camera.position.y += ( to.py - camera.position.y ) / 40;
        camera.position.z += ( to.pz - camera.position.z ) / 40;

        // render
        renderer.render( scene, camera );
    };

    // run
    onResize();
    setup();
    draw();
})();











