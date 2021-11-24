var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, a as attr, b as insert, l as listen, n as noop, d as detach, c as space, f as create_component, g as append, m as mount_component, t as transition_in, h as transition_out, j as destroy_component, k as Scene, P as PerspectiveCamera, W as WebGLRenderer, o as sRGBEncoding, C as Clock, O as OrbitControls, p as Stats, H as HemisphereLight, q as SpotLight, r as SpotLightHelper, u as PlaneGeometry, M as MeshStandardMaterial, v as Mesh, w as MathUtils, B as BoxGeometry, x as MeshPhongMaterial, G as GLTFLoader, y as SkeletonHelper, A as AnimationMixer, z as onMount, D as binding_callbacks } from "./vendor.733fc3c0.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
var Button_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let button;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      button.textContent = "Play!";
      attr(button, "class", "svelte-17ki1yq");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (!mounted) {
        dispose = listen(button, "click", startGame);
        mounted = true;
      }
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function startGame() {
  console.log("Inicia o jogo!");
}
class Button extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$3, safe_not_equal, {});
  }
}
var Header_svelte_svelte_type_style_lang = "";
function create_fragment$2(ctx) {
  let nav;
  let h1;
  let t1;
  let button;
  let current;
  button = new Button({});
  return {
    c() {
      nav = element("nav");
      h1 = element("h1");
      h1.textContent = "\u{1F3EB} LowPolySchool!";
      t1 = space();
      create_component(button.$$.fragment);
      attr(h1, "class", "svelte-1ttixob");
      attr(nav, "class", "svelte-1ttixob");
    },
    m(target, anchor) {
      insert(target, nav, anchor);
      append(nav, h1);
      append(nav, t1);
      mount_component(button, nav, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(button.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(button.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(nav);
      destroy_component(button);
    }
  };
}
class Header extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$2, safe_not_equal, {});
  }
}
class MainGame {
  constructor(canvasArea) {
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "renderer");
    __publicField(this, "controls");
    __publicField(this, "mixers");
    __publicField(this, "clock");
    __publicField(this, "stats");
    __publicField(this, "cube");
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, 1, 0.1, 1e3);
    this.camera.position.x = 5;
    this.camera.position.y = 5;
    this.camera.position.z = 5;
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(Math.min(window.innerHeight, window.innerWidth) * 0.8, Math.min(window.innerHeight, window.innerWidth) * 0.8);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.clock = new Clock();
    canvasArea.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.controls.enablePan = true;
    this.controls.enableDamping = true;
    this.stats = Stats();
    canvasArea.appendChild(this.stats.dom);
    const hemisphereLight = new HemisphereLight(4469555, 1118498);
    this.scene.add(hemisphereLight);
    const spotLight = new SpotLight(16777215);
    spotLight.position.set(10, 10, 10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 30;
    spotLight.shadow.camera.fov = 1;
    this.scene.add(spotLight);
    const spotLightHelper = new SpotLightHelper(spotLight);
    this.scene.add(spotLightHelper);
    const planeGeometry = new PlaneGeometry(4e3, 4e3, 32, 32);
    const planeMaterial = new MeshStandardMaterial({ color: 268435455 });
    const groundPlane = new Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = MathUtils.degToRad(-90);
    groundPlane.receiveShadow = true;
    this.scene.add(groundPlane);
    const geometry = new BoxGeometry();
    geometry.translate(0, 0.5, 0);
    const material = new MeshPhongMaterial({
      color: 16727552
    });
    this.cube = new Mesh(geometry, material);
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.scene.add(this.cube);
    this.renderer.setClearColor(7496795, 1);
    this.renderer.shadowMap.enabled = true;
    this.mixers = [];
    const loader = new GLTFLoader();
    loader.load("game/models/scout_girl.glb", (gltf) => {
      const model = gltf.scene;
      this.scene.add(model);
      model.castShadow = true;
      model.receiveShadow = true;
      model.translateX(2);
      const skeleton = new SkeletonHelper(model);
      skeleton.visible = true;
      this.scene.add(skeleton);
      const animations = gltf.animations;
      const objMixer = new AnimationMixer(model);
      this.mixers.push(objMixer);
      const idleAction = objMixer.clipAction(animations[0]);
      const runAction = objMixer.clipAction(animations[1]);
      console.log(runAction.getEffectiveWeight());
      runAction.enabled = true;
      runAction.setEffectiveTimeScale(1);
      runAction.setEffectiveWeight(1);
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1);
      idleAction.setEffectiveWeight(1);
      idleAction.paused = true;
      idleAction.play();
      document.addEventListener("keydown", (evt) => {
        const allowedKeys = [
          "A",
          "W",
          "S",
          "D"
        ];
        console.log(this.clock.getDelta());
        if (allowedKeys.includes(evt.key.toUpperCase())) {
          idleAction.paused = true;
          idleAction.stopFading();
          runAction.paused = false;
          runAction.play();
          switch (evt.key.toUpperCase()) {
            case "W":
              model.position.z += 0.15;
              break;
            case "A":
              model.position.x -= 0.15;
              break;
            case "S":
              model.position.z -= 0.15;
              break;
            case "D":
              model.position.x += 0.15;
              break;
          }
        }
      });
      document.addEventListener("keyup", () => {
        runAction.paused = true;
        runAction.stopFading();
        idleAction.paused = false;
        idleAction.play();
      });
    });
  }
  run() {
    requestAnimationFrame(() => this.run());
    this.controls.update();
    this.stats.update();
    let mixerUpdateDelta = this.clock.getDelta();
    for (const mixer of this.mixers) {
      mixer.update(mixerUpdateDelta);
    }
    this.render();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
var Game_svelte_svelte_type_style_lang = "";
function create_fragment$1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "canvas-area svelte-1thyics");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[1](div);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      ctx[1](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let canvasArea;
  onMount(() => {
    const game = new MainGame(canvasArea);
    game.run();
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvasArea = $$value;
      $$invalidate(0, canvasArea);
    });
  }
  return [canvasArea, div_binding];
}
class Game extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
var App_svelte_svelte_type_style_lang = "";
function create_fragment(ctx) {
  let main;
  let header;
  let t;
  let game;
  let current;
  header = new Header({});
  game = new Game({});
  return {
    c() {
      main = element("main");
      create_component(header.$$.fragment);
      t = space();
      create_component(game.$$.fragment);
      attr(main, "class", "svelte-1t8idgt");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      mount_component(header, main, null);
      append(main, t);
      mount_component(game, main, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(header.$$.fragment, local);
      transition_in(game.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(header.$$.fragment, local);
      transition_out(game.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(header);
      destroy_component(game);
    }
  };
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
new App({
  target: document.getElementById("app")
});
