var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as Scene, P as PerspectiveCamera, W as WebGLRenderer, s as sRGBEncoding, C as Clock, O as OrbitControls, a as Stats, H as HemisphereLight, b as SpotLight, c as SpotLightHelper, d as PlaneGeometry, M as MeshStandardMaterial, e as Mesh, f as MathUtils, B as BoxGeometry, g as MeshPhongMaterial, G as GLTFLoader, h as Color, i as SkeletonHelper, A as AnimationMixer, j as SvelteComponent, k as init, l as safe_not_equal, m as element, n as set_style, o as insert, p as noop, q as detach, r as attr, t as destroy_each, u as space, v as create_component, w as mount_component, x as transition_in, y as transition_out, z as destroy_component, D as onMount, E as binding_callbacks } from "./vendor.ab222422.js";
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
class MainGame {
  constructor(canvasArea) {
    __publicField(this, "isRunning");
    __publicField(this, "animationFrameHandler");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "renderer");
    __publicField(this, "controls");
    __publicField(this, "mixers");
    __publicField(this, "clock");
    __publicField(this, "stats");
    __publicField(this, "cube");
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.camera.position.x = 5;
    this.camera.position.y = 5;
    this.camera.position.z = 5;
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.95);
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
    loader.load("game/models/cau.glb", (gltf) => {
      const model = gltf.scene.children[0];
      console.log(gltf);
      model.traverse((o) => {
        if (o instanceof Mesh) {
          o.castShadow = true;
          if (o.name == "Hat") {
            o.material.color = new Color("#2e7bd9");
          } else if (o.name == "Hair") {
            o.material.color = new Color("#b109d7");
          }
        }
      });
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
      runAction.enabled = true;
      runAction.setEffectiveTimeScale(1);
      runAction.setEffectiveWeight(1);
      idleAction.enabled = true;
      idleAction.setEffectiveTimeScale(1);
      idleAction.setEffectiveWeight(1);
      idleAction.paused = false;
      idleAction.play();
      document.addEventListener("keydown", (evt) => {
        const allowedKeys = [
          "A",
          "W",
          "S",
          "D"
        ];
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
  isPageRatioAllowed() {
    return window.innerWidth / window.innerHeight >= 1;
  }
  setRenderSize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.95);
  }
  step() {
    this.cube.rotation.y += 0.01;
    this.cube.castShadow = true;
    this.controls.update();
    this.stats.update();
    let mixerUpdateDelta = this.clock.getDelta();
    for (const mixer of this.mixers) {
      mixer.update(mixerUpdateDelta);
    }
    this.render();
    this.animationFrameHandler = requestAnimationFrame(() => this.step());
  }
  run() {
    if (!this.isRunning) {
      this.animationFrameHandler = requestAnimationFrame(() => this.step());
      this.isRunning = true;
    }
  }
  stop() {
    if (this.isRunning) {
      cancelAnimationFrame(this.animationFrameHandler);
      this.renderer.clear(false);
      this.isRunning = false;
      this.animationFrameHandler = 0;
    }
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
var ColorMenu_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      set_style(div, "background-color", "$" + ctx[1]);
      set_style(div, "width", "30px");
      set_style(div, "heigth", "30px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let each_value = ctx[0];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "color-menu svelte-xdjwc5");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$1($$self) {
  const cores = [
    "#9E9E9E",
    "#FFEB3B",
    "#CDDC39",
    "#00BCD4",
    "#FFC107",
    "#03A9F4",
    "#4CAF50",
    "#2196F3",
    "#607D8B",
    "#009688",
    "#F44331",
    "#E91E63",
    "#795548",
    "#9C27B0",
    "#3F51B5",
    "#673AB7"
  ];
  return [cores];
}
class ColorMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {});
  }
}
var Game_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="material-icons-outlined">screen_rotation</span> 
        <h1 class="svelte-83zkka">Vire o Smartphone para come\xE7ar!</h1>`;
      attr(div, "class", "alert-overlay svelte-83zkka");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$1(ctx) {
  let t0;
  let colormenu;
  let t1;
  let div;
  let current;
  let if_block = ctx[1] && create_if_block();
  colormenu = new ColorMenu({});
  return {
    c() {
      if (if_block)
        if_block.c();
      t0 = space();
      create_component(colormenu.$$.fragment);
      t1 = space();
      div = element("div");
      attr(div, "class", "canvas-area svelte-83zkka");
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t0, anchor);
      mount_component(colormenu, target, anchor);
      insert(target, t1, anchor);
      insert(target, div, anchor);
      ctx[2](div);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (ctx2[1]) {
        if (if_block)
          ;
        else {
          if_block = create_if_block();
          if_block.c();
          if_block.m(t0.parentNode, t0);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(colormenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(colormenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t0);
      destroy_component(colormenu, detaching);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div);
      ctx[2](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let canvasArea;
  let displayAlert = false;
  onMount(() => {
    const game = new MainGame(canvasArea);
    const resizeAndControlGame = () => {
      game.setRenderSize();
      if (game.isPageRatioAllowed()) {
        $$invalidate(1, displayAlert = false);
        game.run();
      } else {
        $$invalidate(1, displayAlert = true);
        game.stop();
      }
    };
    window.addEventListener("resize", resizeAndControlGame);
    resizeAndControlGame();
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvasArea = $$value;
      $$invalidate(0, canvasArea);
    });
  }
  return [canvasArea, displayAlert, div_binding];
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
  let game;
  let current;
  game = new Game({});
  return {
    c() {
      main = element("main");
      create_component(game.$$.fragment);
      attr(main, "class", "svelte-1jgdhcb");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      mount_component(game, main, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(game.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(game.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
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
