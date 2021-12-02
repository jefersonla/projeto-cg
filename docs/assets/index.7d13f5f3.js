var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { G as GLTFLoader, A as AnimationMixer, V as Vector3, S as Scene, P as PerspectiveCamera, W as WebGLRenderer, s as sRGBEncoding, a as AxesHelper, H as HemisphereLight, b as SpotLight, c as SpotLightHelper, d as PlaneGeometry, M as MeshStandardMaterial, e as Mesh, f as MathUtils, C as Clock, g as Color, B as BoxGeometry, h as MeshPhongMaterial, i as Stats, j as GUI$1, k as SvelteComponent, l as init, m as safe_not_equal, n as element, o as space, t as text, p as src_url_equal, q as attr, r as set_style, u as toggle_class, v as insert, w as append, x as set_data, y as noop, z as detach, D as listen, E as is_function, F as destroy_each, I as run_all, J as createEventDispatcher, K as binding_callbacks, L as create_component, N as mount_component, O as transition_in, Q as transition_out, R as destroy_component, T as onMount } from "./vendor.4ba106ba.js";
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
class CustomLoader {
  static load(path) {
    return !this.loadedModels[path] ? this.loader.loadAsync(path).then(this.assignGLTF(path)).then(castShadow) : Promise.resolve(this.loadedModels[path]);
  }
  static assignGLTF(path) {
    return (gltf) => {
      this.loadedModels[path] = gltf;
      return gltf;
    };
  }
}
__publicField(CustomLoader, "loader", new GLTFLoader());
__publicField(CustomLoader, "loadedModels", {});
function castShadow(gltf) {
  gltf.scene.traverse((obj) => {
    obj.castShadow = true;
  });
  return gltf;
}
var Movements;
(function(Movements2) {
  Movements2[Movements2["FRONT"] = 0] = "FRONT";
  Movements2[Movements2["BACK"] = 1] = "BACK";
  Movements2[Movements2["LEFT"] = 2] = "LEFT";
  Movements2[Movements2["RIGHT"] = 3] = "RIGHT";
})(Movements || (Movements = {}));
const _Player = class {
  constructor(gltf, frontCamera) {
    __publicField(this, "model");
    __publicField(this, "animationMixer");
    __publicField(this, "movementVector");
    __publicField(this, "currentLookingVector");
    __publicField(this, "activeCommands", {
      [2]: false,
      [0]: false,
      [1]: false,
      [3]: false
    });
    __publicField(this, "currentRunState");
    __publicField(this, "runAction");
    __publicField(this, "idleAction");
    this.gltf = gltf;
    this.frontCamera = frontCamera;
    this.model = gltf.scene.children[0];
    this.animationMixer = new AnimationMixer(this.model);
    this.movementVector = new Vector3(0, 0, 0);
    this.currentLookingVector = _Player.movementBaseVector.clone();
    this.currentRunState = false;
    const animations = gltf.animations;
    this.idleAction = this.animationMixer.clipAction(animations[0]);
    this.runAction = this.animationMixer.clipAction(animations[1]);
    this.setupAnimations();
    this.idleAction.paused = false;
    this.idleAction.play();
    const changeKeyState = (state) => {
      return (evt) => {
        const keyPressed = _Player.keysToCommand[evt.key.toUpperCase()];
        if (!this.activeCommands.hasOwnProperty(keyPressed)) {
          return;
        }
        this.activeCommands[keyPressed] = state;
        this.convertCommandToMovementVector();
      };
    };
    document.addEventListener("keydown", changeKeyState(true));
    document.addEventListener("keyup", changeKeyState(false));
  }
  static async loadPlayer(frontCamera) {
    return new _Player(await CustomLoader.load("game/models/cau.glb"), frontCamera);
  }
  setupAnimations() {
    this.runAction.enabled = true;
    this.runAction.setEffectiveTimeScale(1);
    this.runAction.setEffectiveWeight(1);
    this.idleAction.enabled = true;
    this.idleAction.setEffectiveTimeScale(1);
    this.idleAction.setEffectiveWeight(1);
  }
  convertCommandToMovementVector() {
    if (this.activeCommands[0] || this.activeCommands[1]) {
      this.movementVector.z = this.activeCommands[0] ? -1 : 1;
    } else {
      this.movementVector.z = 0;
    }
    if (this.activeCommands[2] || this.activeCommands[3]) {
      this.movementVector.x = this.activeCommands[3] ? 1 : -1;
    } else {
      this.movementVector.x = 0;
    }
  }
  get hasMovement() {
    return Math.abs(this.movementVector.x) !== 0 || Math.abs(this.movementVector.z) !== 0;
  }
  updatePlayerMovement() {
    if (!this.hasMovement) {
      return;
    }
    this.model.position.x += this.movementVector.x * _Player.baseSpeed;
    this.model.position.z += this.movementVector.z * _Player.baseSpeed;
    this.currentLookingVector = this.model.position.clone().add(this.movementVector.normalize());
    const cameraPosition = this.model.position.clone().add(this.movementVector.clone().normalize().multiplyScalar(6));
    this.frontCamera.position.x = cameraPosition.x;
    this.frontCamera.position.z = cameraPosition.z;
    const targetPosition = this.model.position.clone();
    targetPosition.y = 3;
    this.frontCamera.lookAt(targetPosition);
    this.model.lookAt(this.currentLookingVector);
  }
  updateIsometricCamera(camera) {
    camera.position.x += this.movementVector.x * _Player.baseSpeed;
    camera.position.z += this.movementVector.z * _Player.baseSpeed;
  }
  checkColision(obj, diameter) {
    return this.model.position.distanceTo(obj) < diameter / 2;
  }
  updateAnimation() {
    if (this.hasMovement != this.currentRunState) {
      this.currentRunState = this.hasMovement;
      if (this.currentRunState) {
        this.idleAction.paused = true;
        this.idleAction.stopFading();
        this.runAction.paused = false;
        this.runAction.play();
      } else {
        this.runAction.paused = true;
        this.runAction.stopFading();
        this.idleAction.paused = false;
        this.idleAction.play();
      }
    }
  }
};
let Player = _Player;
__publicField(Player, "keysToCommand", {
  "A": 2,
  "W": 0,
  "S": 1,
  "D": 3,
  "ARROWUP": 0,
  "ARROWDOWN": 1,
  "ARROWRIGHT": 3,
  "ARROWLEFT": 2
});
__publicField(Player, "baseSpeed", 0.1);
__publicField(Player, "movementBaseVector", new Vector3(0, 0, 1));
class MainGame {
  constructor(canvasContainer, debugEnabled = false, loadCallback = () => {
  }) {
    __publicField(this, "player");
    __publicField(this, "isRunning");
    __publicField(this, "animationFrameHandler");
    __publicField(this, "debugMenu");
    __publicField(this, "debugStats");
    __publicField(this, "canvasContainer");
    __publicField(this, "scene");
    __publicField(this, "camera");
    __publicField(this, "frontCamera");
    __publicField(this, "useFrontCamera");
    __publicField(this, "renderer");
    __publicField(this, "animationsMixer");
    __publicField(this, "clock");
    __publicField(this, "cube");
    __publicField(this, "debugOptions", {
      enableSkeleton: false,
      skeletonHelper: null,
      enableSpotlightHelper: false,
      spotlightHelper: null,
      enableCameraHelper: false,
      cameraHelper: null,
      enableAxesHelper: false,
      axesHelper: null
    });
    __publicField(this, "hatMaterial");
    __publicField(this, "hairMaterial");
    this.debugEnabled = debugEnabled;
    this.canvasContainer = canvasContainer;
    this.useFrontCamera = false;
    if (debugEnabled) {
      this.initDebugOptions();
    }
    this.scene = new Scene();
    this.initRender();
    this.initCamera();
    this.initLights();
    this.initAnimationMixer();
    this.initBasicControl();
    this.initScene();
  }
  initCamera() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.camera.position.z = 15;
    this.camera.position.y = 20;
    this.camera.lookAt(new Vector3(0, 0, 0));
  }
  initRender() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.95);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.canvasContainer.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(7496795, 1);
    this.renderer.shadowMap.enabled = true;
    const axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
  }
  initLights() {
    const hemisphereLight = new HemisphereLight(4469555, 1118498);
    this.scene.add(hemisphereLight);
    const spotLight = new SpotLight(16777215, 0.7);
    spotLight.position.set(25, 60, 25);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 25;
    spotLight.shadow.camera.far = 130;
    spotLight.shadow.camera.fov = 1;
    this.scene.add(spotLight);
    const spotLightHelper = new SpotLightHelper(spotLight);
    this.scene.add(spotLightHelper);
  }
  initGrounPlane() {
    const planeGeometry = new PlaneGeometry(4e3, 4e3, 32, 32);
    const planeMaterial = new MeshStandardMaterial({ color: 268435455 });
    const groundPlane = new Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = MathUtils.degToRad(-90);
    groundPlane.receiveShadow = true;
    this.scene.add(groundPlane);
  }
  initAnimationMixer() {
    this.animationsMixer = [];
    this.clock = new Clock();
  }
  initBasicControl() {
  }
  async initPlayer() {
    this.frontCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.frontCamera.position.z = 6;
    this.frontCamera.position.y = 3;
    this.frontCamera.lookAt(new Vector3(0, 3, 0));
    this.player = await Player.loadPlayer(this.frontCamera);
    this.player.model.traverse((o) => {
      if (o instanceof Mesh) {
        if (o.name == "Hat") {
          this.hatMaterial = o.material;
          o.material.color = new Color("#2e7bd9");
        } else if (o.name == "Hair") {
          this.hairMaterial = o.material;
          o.material.color = new Color("#b109d7");
        }
      }
    });
    this.animationsMixer.push(this.player.animationMixer);
    this.scene.add(this.frontCamera);
    this.scene.add(this.player.model);
  }
  createDummyCube() {
    const cubeSize = 1;
    const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    geometry.translate(0, cubeSize / 2, 0);
    const material = new MeshPhongMaterial({
      color: 16727552
    });
    this.cube = new Mesh(geometry, material);
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;
    this.scene.add(this.cube);
  }
  async initScene() {
    this.initGrounPlane();
    this.createDummyCube();
    this.initPlayer();
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
    if (materialName == "hat" && !!this.hatMaterial) {
      this.hatMaterial.color = new Color(materialColor);
    } else if (materialName == "hair" && !!this.hairMaterial) {
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
    this.frontCamera.aspect = aspectRatio;
    this.frontCamera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth * (1 - borderPercentage), window.innerHeight * (1 - borderPercentage * aspectRatio));
  }
  step() {
    if (this.debugEnabled) {
      this.updateDebugStats();
    }
    this.cube.castShadow = true;
    let mixerUpdateDelta = this.clock.getDelta();
    for (const animationMixer of this.animationsMixer) {
      animationMixer.update(mixerUpdateDelta);
    }
    if (!!this.player) {
      this.player.updateAnimation();
      this.player.updatePlayerMovement();
      this.player.updateIsometricCamera(this.camera);
      if (this.player.checkCollision(new Vector3(0, 0, 0), 2)) {
        console.log("COLLISION!");
      }
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
    this.renderer.render(this.scene, this.useFrontCamera ? this.frontCamera : this.camera);
  }
}
var LoadBar_svelte_svelte_type_style_lang = "";
function create_fragment$3(ctx) {
  let div2;
  let img;
  let img_src_value;
  let t0;
  let div1;
  let div0;
  let t1;
  let t2;
  return {
    c() {
      div2 = element("div");
      img = element("img");
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      t1 = text(ctx[0]);
      t2 = text("%");
      if (!src_url_equal(img.src, img_src_value = "images/escolinha.png"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Escolinha logo");
      attr(img, "class", "svelte-12f5yyt");
      attr(div0, "class", "progress-bar svelte-12f5yyt");
      attr(div0, "role", "progressbar");
      set_style(div0, "width", ctx[0] + "%");
      attr(div0, "aria-valuenow", ctx[0]);
      attr(div0, "aria-valuemin", "0");
      attr(div0, "aria-valuemax", "100");
      attr(div1, "class", "progress svelte-12f5yyt");
      attr(div2, "class", "load-bar svelte-12f5yyt");
      toggle_class(div2, "disabled", ctx[1]);
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, img);
      append(div2, t0);
      append(div2, div1);
      append(div1, div0);
      append(div0, t1);
      append(div0, t2);
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t1, ctx2[0]);
      if (dirty & 1) {
        set_style(div0, "width", ctx2[0] + "%");
      }
      if (dirty & 1) {
        attr(div0, "aria-valuenow", ctx2[0]);
      }
      if (dirty & 2) {
        toggle_class(div2, "disabled", ctx2[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div2);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { progressValue = 24 } = $$props;
  let { disabled = true } = $$props;
  $$self.$$set = ($$props2) => {
    if ("progressValue" in $$props2)
      $$invalidate(0, progressValue = $$props2.progressValue);
    if ("disabled" in $$props2)
      $$invalidate(1, disabled = $$props2.disabled);
  };
  return [progressValue, disabled];
}
class LoadBar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$3, safe_not_equal, { progressValue: 0, disabled: 1 });
  }
}
var ColorMenu_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "color-button svelte-asm9mb");
      set_style(div, "background-color", ctx[12]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = listen(div, "click", ctx[8](ctx[12]));
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
  let each_value = ctx[4];
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
      attr(div0, "class", "object-button svelte-asm9mb");
      toggle_class(div0, "buttonSelected", ctx[2] === ctx[0].HAT);
      attr(div1, "class", "object-button svelte-asm9mb");
      toggle_class(div1, "buttonSelected", ctx[2] === ctx[0].HAIR);
      attr(div2, "class", "object-selection svelte-asm9mb");
      attr(div3, "class", "colors svelte-asm9mb");
      attr(div4, "class", "close-button svelte-asm9mb");
      attr(div5, "class", "color-menu svelte-asm9mb");
      toggle_class(div5, "modalActive", ctx[3]);
      attr(div6, "class", "open-menu close-button svelte-asm9mb");
      toggle_class(div6, "hidden", !ctx[3]);
    },
    m(target, anchor) {
      insert(target, div5, anchor);
      append(div5, div2);
      append(div2, div0);
      ctx[9](div0);
      append(div2, t2);
      append(div2, div1);
      ctx[10](div1);
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
          listen(div0, "click", function() {
            if (is_function(ctx[5](ctx[0].HAT)))
              ctx[5](ctx[0].HAT).apply(this, arguments);
          }),
          listen(div1, "click", function() {
            if (is_function(ctx[5](ctx[0].HAIR)))
              ctx[5](ctx[0].HAIR).apply(this, arguments);
          }),
          listen(div4, "click", ctx[6]),
          listen(div6, "click", ctx[7])
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty & 5) {
        toggle_class(div0, "buttonSelected", ctx[2] === ctx[0].HAT);
      }
      if (dirty & 5) {
        toggle_class(div1, "buttonSelected", ctx[2] === ctx[0].HAIR);
      }
      if (dirty & 272) {
        each_value = ctx[4];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);
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
      if (dirty & 8) {
        toggle_class(div5, "modalActive", ctx[3]);
      }
      if (dirty & 8) {
        toggle_class(div6, "hidden", !ctx[3]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div5);
      ctx[9](null);
      ctx[10](null);
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
  var ButtonOptions;
  (function(ButtonOptions2) {
    ButtonOptions2["HAT"] = "hat";
    ButtonOptions2["HAIR"] = "hair";
  })(ButtonOptions || (ButtonOptions = {}));
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
  const buttonElements = {
    [ButtonOptions.HAT]: null,
    [ButtonOptions.HAIR]: null
  };
  let buttonSelected = ButtonOptions.HAT;
  let modalActive = true;
  const toggleButton = (buttonName) => {
    return () => {
      $$invalidate(2, buttonSelected = buttonName);
    };
  };
  const closeMenu = () => {
    $$invalidate(3, modalActive = true);
    dispatch("menuStateChanged", modalActive);
  };
  const openMenu = () => {
    $$invalidate(3, modalActive = false);
    dispatch("menuStateChanged", modalActive);
  };
  const dispatch = createEventDispatcher();
  const colorChanged = (colorName) => {
    return () => dispatch("colorChanged", JSON.stringify({
      materialColor: colorName,
      materialName: buttonSelected
    }));
  };
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      buttonElements[ButtonOptions.HAT] = $$value;
      $$invalidate(1, buttonElements);
      $$invalidate(0, ButtonOptions);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      buttonElements[ButtonOptions.HAIR] = $$value;
      $$invalidate(1, buttonElements);
      $$invalidate(0, ButtonOptions);
    });
  }
  return [
    ButtonOptions,
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
        <h1 class="svelte-1kxyy8o">Vire o Smartphone para come\xE7ar!</h1>`;
      attr(div, "class", "alert-overlay svelte-1kxyy8o");
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
  let loadbar;
  let t0;
  let t1;
  let colormenu;
  let t2;
  let div;
  let current;
  loadbar = new LoadBar({});
  let if_block = ctx[2] && create_if_block();
  colormenu = new ColorMenu({});
  colormenu.$on("colorChanged", function() {
    if (is_function(ctx[3]))
      ctx[3].apply(this, arguments);
  });
  colormenu.$on("menuStateChanged", function() {
    if (is_function(ctx[4]))
      ctx[4].apply(this, arguments);
  });
  return {
    c() {
      create_component(loadbar.$$.fragment);
      t0 = space();
      if (if_block)
        if_block.c();
      t1 = space();
      create_component(colormenu.$$.fragment);
      t2 = space();
      div = element("div");
      attr(div, "class", "canvas-area svelte-1kxyy8o");
      toggle_class(div, "focusedCamera", ctx[0]);
    },
    m(target, anchor) {
      mount_component(loadbar, target, anchor);
      insert(target, t0, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t1, anchor);
      mount_component(colormenu, target, anchor);
      insert(target, t2, anchor);
      insert(target, div, anchor);
      ctx[5](div);
      current = true;
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (ctx[2]) {
        if (if_block)
          ;
        else {
          if_block = create_if_block();
          if_block.c();
          if_block.m(t1.parentNode, t1);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & 1) {
        toggle_class(div, "focusedCamera", ctx[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(loadbar.$$.fragment, local);
      transition_in(colormenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(loadbar.$$.fragment, local);
      transition_out(colormenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(loadbar, detaching);
      if (detaching)
        detach(t0);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t1);
      destroy_component(colormenu, detaching);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div);
      ctx[5](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let focusedCamera = false;
  let canvasArea;
  let displayAlert = false;
  let colorChanged;
  let menuStateChanged;
  onMount(() => {
    const game = new MainGame(canvasArea, true);
    const resizeAndControlGame = () => {
      game.setRenderSize();
      if (game.isPageRatioAllowed()) {
        $$invalidate(2, displayAlert = false);
        game.run();
      } else {
        $$invalidate(2, displayAlert = true);
        game.stop();
      }
    };
    window.addEventListener("resize", resizeAndControlGame);
    resizeAndControlGame();
    $$invalidate(3, colorChanged = (event) => {
      const val = JSON.parse(event.detail);
      console.log(JSON.parse(event.detail));
      game.changePlayerMaterial(val.materialName, val.materialColor);
    });
    $$invalidate(4, menuStateChanged = (event) => {
      $$invalidate(0, focusedCamera = !JSON.parse(event.detail));
      game.useFrontCamera = focusedCamera;
    });
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvasArea = $$value;
      $$invalidate(1, canvasArea);
    });
  }
  return [
    focusedCamera,
    canvasArea,
    displayAlert,
    colorChanged,
    menuStateChanged,
    div_binding
  ];
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
