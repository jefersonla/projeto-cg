var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as Scene, P as PerspectiveCamera, W as WebGLRenderer, s as sRGBEncoding, C as Clock, O as OrbitControls, H as HemisphereLight, a as SpotLight, b as SpotLightHelper, c as PlaneGeometry, M as MeshStandardMaterial, d as Mesh, e as MathUtils, B as BoxGeometry, f as MeshPhongMaterial, G as GLTFLoader, g as Color, h as SkeletonHelper, A as AnimationMixer, i as Stats, j as GUI$1, k as SvelteComponent, l as init, m as safe_not_equal, n as element, o as attr, p as set_style, q as insert, r as listen, t as detach, u as space, v as toggle_class, w as append, x as noop, y as destroy_each, z as run_all, D as createEventDispatcher, E as binding_callbacks, F as is_function, I as create_component, J as mount_component, K as transition_in, L as transition_out, N as destroy_component, Q as onMount } from "./vendor.7c5fa0f8.js";
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
  constructor(canvasContainer, debugEnabled = false) {
    __publicField(this, "isRunning");
    __publicField(this, "animationFrameHandler");
    __publicField(this, "debugMenu");
    __publicField(this, "debugStats");
    __publicField(this, "canvasContainer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "renderer");
    __publicField(this, "controls");
    __publicField(this, "mixers");
    __publicField(this, "clock");
    __publicField(this, "cube");
    __publicField(this, "hatMaterial");
    __publicField(this, "hairMaterial");
    this.debugEnabled = debugEnabled;
    this.canvasContainer = canvasContainer;
    if (debugEnabled) {
      this.initDebugOptions();
    }
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
    this.canvasContainer.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
    this.controls.enablePan = true;
    this.controls.enableDamping = true;
    const hemisphereLight = new HemisphereLight(4469555, 1118498);
    this.scene.add(hemisphereLight);
    const spotLight = new SpotLight(16777215);
    spotLight.position.set(10, 10, 10);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 130;
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
            this.hatMaterial = o.material;
            o.material.color = new Color("#2e7bd9");
          } else if (o.name == "Hair") {
            this.hairMaterial = o.material;
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
  initDebugOptions() {
    this.debugStats = Stats();
    this.canvasContainer.appendChild(this.debugStats.dom);
    this.debugMenu = new GUI$1();
  }
  updateDebugStats() {
    this.debugStats.update();
  }
  changePlayerMaterial(materialName, materialColor) {
    if (materialName == "hat") {
      this.hatMaterial.color = new Color(materialColor);
    } else if (materialName == "hair") {
      this.hairMaterial.color = new Color(materialColor);
    }
  }
  isPageRatioAllowed() {
    return window.innerWidth / window.innerHeight >= 1;
  }
  setRenderSize() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const borderPercentage = 0.01;
    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * (1 - borderPercentage), window.innerHeight * (1 - borderPercentage * aspectRatio));
  }
  step() {
    if (this.debugEnabled) {
      this.updateDebugStats();
    }
    this.cube.rotation.y += 0.01;
    this.cube.castShadow = true;
    this.controls.update();
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
  child_ctx[11] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "color-button svelte-cesdah");
      set_style(div, "background-color", ctx[11]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", ctx[7](ctx[11]));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$2(ctx) {
  let div5;
  let div2;
  let div0;
  let t2;
  let div1;
  let t5;
  let div3;
  let t6;
  let div4;
  let t8;
  let div6;
  let mounted;
  let dispose;
  let each_value = ctx[3];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div5 = element("div");
      div2 = element("div");
      div0 = element("div");
      div0.innerHTML = `<span class="material-icons-outlined">school</span> Hat`;
      t2 = space();
      div1 = element("div");
      div1.innerHTML = `<span class="material-icons-outlined">face</span> Hair`;
      t5 = space();
      div3 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t6 = space();
      div4 = element("div");
      div4.innerHTML = `<span class="material-icons-outlined">close</span>`;
      t8 = space();
      div6 = element("div");
      div6.innerHTML = `<span class="material-icons-outlined">face</span>`;
      attr(div0, "class", "object-button svelte-cesdah");
      toggle_class(div0, "buttonSelected", ctx[1] === "hat");
      attr(div1, "class", "object-button svelte-cesdah");
      toggle_class(div1, "buttonSelected", ctx[1] === "hair");
      attr(div2, "class", "object-selection svelte-cesdah");
      attr(div3, "class", "colors svelte-cesdah");
      attr(div4, "class", "close-button svelte-cesdah");
      attr(div5, "class", "color-menu svelte-cesdah");
      toggle_class(div5, "modalActive", ctx[2]);
      attr(div6, "class", "open-menu close-button svelte-cesdah");
      toggle_class(div6, "hidden", !ctx[2]);
    },
    m(target, anchor) {
      insert(target, div5, anchor);
      append(div5, div2);
      append(div2, div0);
      ctx[8](div0);
      append(div2, t2);
      append(div2, div1);
      ctx[9](div1);
      append(div5, t5);
      append(div5, div3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div3, null);
      }
      append(div5, t6);
      append(div5, div4);
      insert(target, t8, anchor);
      insert(target, div6, anchor);
      if (!mounted) {
        dispose = [
          listen(div0, "click", ctx[4]("hat")),
          listen(div1, "click", ctx[4]("hair")),
          listen(div4, "click", ctx[5]),
          listen(div6, "click", ctx[6])
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 2) {
        toggle_class(div0, "buttonSelected", ctx2[1] === "hat");
      }
      if (dirty & 2) {
        toggle_class(div1, "buttonSelected", ctx2[1] === "hair");
      }
      if (dirty & 136) {
        each_value = ctx2[3];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div3, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
      if (dirty & 4) {
        toggle_class(div5, "modalActive", ctx2[2]);
      }
      if (dirty & 4) {
        toggle_class(div6, "hidden", !ctx2[2]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div5);
      ctx[8](null);
      ctx[9](null);
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(t8);
      if (detaching)
        detach(div6);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  const cores = [
    "#795548",
    "#333333",
    "#607D8B",
    "#9E9E9E",
    "#FFC107",
    "#FFEB3B",
    "#CDDC39",
    "#4CAF50",
    "#009688",
    "#00BCD4",
    "#03A9F4",
    "#3F51B5",
    "#673AB7",
    "#9C27B0",
    "#E91E63",
    "#F44331"
  ];
  const buttonElements = { "hat": null, "hair": null };
  let buttonSelected = "hat";
  let modalActive = true;
  const toggleButton = (buttonName) => {
    return () => {
      $$invalidate(1, buttonSelected = buttonName);
    };
  };
  const closeMenu = () => $$invalidate(2, modalActive = true);
  const openMenu = () => $$invalidate(2, modalActive = false);
  const dispatch = createEventDispatcher();
  const colorChanged = (colorName) => {
    return () => dispatch("colorChanged", JSON.stringify({
      materialColor: colorName,
      materialName: buttonSelected
    }));
  };
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      buttonElements.hat = $$value;
      $$invalidate(0, buttonElements);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      buttonElements.hair = $$value;
      $$invalidate(0, buttonElements);
    });
  }
  return [
    buttonElements,
    buttonSelected,
    modalActive,
    cores,
    toggleButton,
    closeMenu,
    openMenu,
    colorChanged,
    div0_binding,
    div1_binding
  ];
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
  colormenu.$on("colorChanged", function() {
    if (is_function(ctx[2]))
      ctx[2].apply(this, arguments);
  });
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
      ctx[3](div);
      current = true;
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (ctx[1]) {
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
      ctx[3](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let canvasArea;
  let displayAlert = false;
  let colorChanged;
  onMount(() => {
    const game = new MainGame(canvasArea, true);
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
    $$invalidate(2, colorChanged = (event) => {
      const val = JSON.parse(event.detail);
      console.log(JSON.parse(event.detail));
      game.changePlayerMaterial(val.materialName, val.materialColor);
    });
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvasArea = $$value;
      $$invalidate(0, canvasArea);
    });
  }
  return [canvasArea, displayAlert, colorChanged, div_binding];
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
