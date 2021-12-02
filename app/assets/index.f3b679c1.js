var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { G as GLTFLoader, A as AnimationMixer, V as Vector3, S as Scene, P as PerspectiveCamera, W as WebGLRenderer, s as sRGBEncoding, a as AxesHelper, H as HemisphereLight, b as SpotLight, c as SpotLightHelper, d as PlaneGeometry, M as MeshStandardMaterial, e as Mesh, f as MathUtils, C as Clock, g as Color, B as BoxGeometry, h as MeshPhongMaterial, i as Stats, j as GUI$1, k as SvelteComponent, l as init, m as safe_not_equal, n as element, o as space, t as text, p as src_url_equal, q as attr, r as set_style, u as insert, v as append, w as set_data, x as create_out_transition, y as detach, z as empty, D as transition_in, E as group_outros, F as transition_out, I as check_outros, J as fade, K as toggle_class, L as listen, N as is_function, O as destroy_each, Q as run_all, R as noop, T as add_render_callback, U as create_bidirectional_transition, X as createEventDispatcher, Y as fly, Z as binding_callbacks, _ as bind, $ as create_component, a0 as mount_component, a1 as add_flush_callback, a2 as destroy_component } from "./vendor.77a67044.js";
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
    __publicField(this, "previousAction");
    __publicField(this, "activeAction");
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
    this.previousAction = this.idleAction;
    this.activeAction = this.idleAction;
  }
  setMovementVector(movement) {
    this.movementVector = movement;
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
    this.updateFrontCamera();
    this.model.lookAt(this.currentLookingVector);
  }
  updateFrontCamera() {
    const cameraPosition = this.model.position.clone().add(this.movementVector.clone().normalize().multiplyScalar(6));
    this.frontCamera.position.x = cameraPosition.x;
    this.frontCamera.position.z = cameraPosition.z;
    const targetPosition = this.model.position.clone();
    targetPosition.y = 3;
    this.frontCamera.lookAt(targetPosition);
  }
  updateIsometricCamera(camera) {
    camera.position.x += this.movementVector.x * _Player.baseSpeed;
    camera.position.z += this.movementVector.z * _Player.baseSpeed;
  }
  checkCollision(obj, diameter) {
    return this.model.position.distanceTo(obj) < diameter / 2;
  }
  fadeToAction(duration) {
    this.previousAction = this.activeAction;
    this.activeAction = this.currentRunState ? this.runAction : this.idleAction;
    if (this.previousAction !== this.activeAction) {
      this.previousAction.fadeOut(duration);
    }
    this.activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(0.8).fadeIn(duration).play();
  }
  updateAnimation() {
    if (this.hasMovement != this.currentRunState) {
      this.currentRunState = this.hasMovement;
      this.fadeToAction(0.5);
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
__publicField(Player, "baseSpeed", 0.15);
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
    loadCallback(25, false);
    this.initAnimationMixer();
    this.initBasicControl();
    loadCallback(50, false);
    this.initScene().then(() => loadCallback(100, true));
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
    this.debugMenu.close();
    const debug = this.debugMenu.addFolder("helpers");
    debug.add(this.debugOptions, "enableSkeleton", false);
    debug.add(this.debugOptions, "enableSpotlightHelper", false);
    debug.add(this.debugOptions, "enableCameraHelper", false);
    debug.add(this.debugOptions, "enableAxesHelper", false);
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
  updateDebugOptions() {
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
function create_if_block$3(ctx) {
  let div2;
  let img;
  let img_src_value;
  let t0;
  let div1;
  let div0;
  let t1;
  let t2;
  let div2_outro;
  let current;
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
      attr(img, "class", "svelte-4qvl44");
      attr(div0, "class", "progress-bar svelte-4qvl44");
      attr(div0, "role", "progressbar");
      set_style(div0, "width", ctx[0] + "%");
      attr(div0, "aria-valuenow", ctx[0]);
      attr(div0, "aria-valuemin", "0");
      attr(div0, "aria-valuemax", "100");
      attr(div1, "class", "progress svelte-4qvl44");
      attr(div2, "class", "load-bar svelte-4qvl44");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, img);
      append(div2, t0);
      append(div2, div1);
      append(div1, div0);
      append(div0, t1);
      append(div0, t2);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & 1)
        set_data(t1, ctx2[0]);
      if (!current || dirty & 1) {
        set_style(div0, "width", ctx2[0] + "%");
      }
      if (!current || dirty & 1) {
        attr(div0, "aria-valuenow", ctx2[0]);
      }
    },
    i(local) {
      if (current)
        return;
      if (div2_outro)
        div2_outro.end(1);
      current = true;
    },
    o(local) {
      div2_outro = create_out_transition(div2, fade, {});
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div2);
      if (detaching && div2_outro)
        div2_outro.end();
    }
  };
}
function create_fragment$4(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !ctx[1] && create_if_block$3(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!ctx2[1]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let { progressValue = 0 } = $$props;
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
    init(this, options, instance$3, create_fragment$4, safe_not_equal, { progressValue: 0, disabled: 1 });
  }
}
var ColorMenu_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let div5;
  let div2;
  let div0;
  let t2;
  let div1;
  let t5;
  let div3;
  let t6;
  let div4;
  let div5_outro;
  let current;
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
      attr(div0, "class", "object-button svelte-qk5yo2");
      toggle_class(div0, "buttonSelected", ctx[2] === ctx[0].HAT);
      attr(div1, "class", "object-button svelte-qk5yo2");
      toggle_class(div1, "buttonSelected", ctx[2] === ctx[0].HAIR);
      attr(div2, "class", "object-selection svelte-qk5yo2");
      attr(div3, "class", "colors svelte-qk5yo2");
      attr(div4, "class", "close-button svelte-qk5yo2");
      attr(div5, "class", "color-menu svelte-qk5yo2");
      toggle_class(div5, "modalActive", ctx[3]);
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
      current = true;
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
          listen(div4, "click", ctx[6])
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
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
    },
    i(local) {
      if (current)
        return;
      if (div5_outro)
        div5_outro.end(1);
      current = true;
    },
    o(local) {
      div5_outro = create_out_transition(div5, fly, { duration: 200 });
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div5);
      ctx[9](null);
      ctx[10](null);
      destroy_each(each_blocks, detaching);
      if (detaching && div5_outro)
        div5_outro.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_each_block(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "color-button svelte-qk5yo2");
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
function create_if_block$2(ctx) {
  let div;
  let div_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="material-icons-outlined">face</span>`;
      attr(div, "class", "open-menu close-button svelte-qk5yo2");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      current = true;
      if (!mounted) {
        dispose = listen(div, "click", ctx[7]);
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, {}, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, {}, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$3(ctx) {
  let t;
  let if_block1_anchor;
  let current;
  let if_block0 = !ctx[3] && create_if_block_1(ctx);
  let if_block1 = ctx[3] && create_if_block$2(ctx);
  return {
    c() {
      if (if_block0)
        if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if (if_block0)
        if_block0.m(target, anchor);
      insert(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!ctx2[3]) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t.parentNode, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (ctx2[3]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty & 8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (if_block0)
        if_block0.d(detaching);
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
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
    init(this, options, instance$2, create_fragment$3, safe_not_equal, {});
  }
}
var StartMenu_svelte_svelte_type_style_lang = "";
function create_if_block$1(ctx) {
  let div1;
  let img;
  let img_src_value;
  let t0;
  let div0;
  let button;
  let div1_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      img = element("img");
      t0 = space();
      div0 = element("div");
      button = element("button");
      button.textContent = "Play!";
      if (!src_url_equal(img.src, img_src_value = "images/escolinha.png"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Escolinha logo");
      attr(img, "class", "svelte-1damn0o");
      attr(button, "type", "button");
      attr(button, "class", "button btn btn-primary svelte-1damn0o");
      attr(div0, "class", "menu svelte-1damn0o");
      attr(div1, "class", "load-bar svelte-1damn0o");
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, img);
      append(div1, t0);
      append(div1, div0);
      append(div0, button);
      current = true;
      if (!mounted) {
        dispose = listen(button, "click", ctx[1]);
        mounted = true;
      }
    },
    p: noop,
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div1_transition)
          div1_transition = create_bidirectional_transition(div1, fade, {}, true);
        div1_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div1_transition)
        div1_transition = create_bidirectional_transition(div1, fade, {}, false);
      div1_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (detaching && div1_transition)
        div1_transition.end();
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$2(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !ctx[0] && create_if_block$1(ctx);
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & 1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let { disabled = true } = $$props;
  const dispatcher = createEventDispatcher();
  const startGame = () => {
    dispatcher("gameStateChanged", true);
  };
  $$self.$$set = ($$props2) => {
    if ("disabled" in $$props2)
      $$invalidate(0, disabled = $$props2.disabled);
  };
  return [disabled, startGame];
}
class StartMenu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, { disabled: 0 });
  }
}
var Game_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let div;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="material-icons-outlined">screen_rotation</span> 
        <h1 class="svelte-h6eprq">Vire o Smartphone para come\xE7ar!</h1>`;
      attr(div, "class", "alert-overlay svelte-h6eprq");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      current = true;
    },
    i(local) {
      if (current)
        return;
      add_render_callback(() => {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, fade, {}, true);
        div_transition.run(1);
      });
      current = true;
    },
    o(local) {
      if (!div_transition)
        div_transition = create_bidirectional_transition(div, fade, {}, false);
      div_transition.run(0);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
    }
  };
}
function create_fragment$1(ctx) {
  let startmenu;
  let updating_disabled;
  let t0;
  let loadbar;
  let updating_disabled_1;
  let updating_progressValue;
  let t1;
  let t2;
  let colormenu;
  let t3;
  let div;
  let current;
  function startmenu_disabled_binding(value) {
    ctx[9](value);
  }
  let startmenu_props = {};
  if (ctx[3] !== void 0) {
    startmenu_props.disabled = ctx[3];
  }
  startmenu = new StartMenu({ props: startmenu_props });
  binding_callbacks.push(() => bind(startmenu, "disabled", startmenu_disabled_binding));
  startmenu.$on("gameStateChanged", ctx[8]);
  function loadbar_disabled_binding(value) {
    ctx[10](value);
  }
  function loadbar_progressValue_binding(value) {
    ctx[11](value);
  }
  let loadbar_props = {};
  if (ctx[4] !== void 0) {
    loadbar_props.disabled = ctx[4];
  }
  if (ctx[7] !== void 0) {
    loadbar_props.progressValue = ctx[7];
  }
  loadbar = new LoadBar({ props: loadbar_props });
  binding_callbacks.push(() => bind(loadbar, "disabled", loadbar_disabled_binding));
  binding_callbacks.push(() => bind(loadbar, "progressValue", loadbar_progressValue_binding));
  let if_block = ctx[2] && create_if_block();
  colormenu = new ColorMenu({});
  colormenu.$on("colorChanged", function() {
    if (is_function(ctx[5]))
      ctx[5].apply(this, arguments);
  });
  colormenu.$on("menuStateChanged", function() {
    if (is_function(ctx[6]))
      ctx[6].apply(this, arguments);
  });
  return {
    c() {
      create_component(startmenu.$$.fragment);
      t0 = space();
      create_component(loadbar.$$.fragment);
      t1 = space();
      if (if_block)
        if_block.c();
      t2 = space();
      create_component(colormenu.$$.fragment);
      t3 = space();
      div = element("div");
      attr(div, "class", "canvas-area svelte-h6eprq");
      toggle_class(div, "focusedCamera", ctx[0]);
    },
    m(target, anchor) {
      mount_component(startmenu, target, anchor);
      insert(target, t0, anchor);
      mount_component(loadbar, target, anchor);
      insert(target, t1, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t2, anchor);
      mount_component(colormenu, target, anchor);
      insert(target, t3, anchor);
      insert(target, div, anchor);
      ctx[12](div);
      current = true;
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      const startmenu_changes = {};
      if (!updating_disabled && dirty & 8) {
        updating_disabled = true;
        startmenu_changes.disabled = ctx[3];
        add_flush_callback(() => updating_disabled = false);
      }
      startmenu.$set(startmenu_changes);
      const loadbar_changes = {};
      if (!updating_disabled_1 && dirty & 16) {
        updating_disabled_1 = true;
        loadbar_changes.disabled = ctx[4];
        add_flush_callback(() => updating_disabled_1 = false);
      }
      if (!updating_progressValue && dirty & 128) {
        updating_progressValue = true;
        loadbar_changes.progressValue = ctx[7];
        add_flush_callback(() => updating_progressValue = false);
      }
      loadbar.$set(loadbar_changes);
      if (ctx[2]) {
        if (if_block) {
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t2.parentNode, t2);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & 1) {
        toggle_class(div, "focusedCamera", ctx[0]);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(startmenu.$$.fragment, local);
      transition_in(loadbar.$$.fragment, local);
      transition_in(if_block);
      transition_in(colormenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(startmenu.$$.fragment, local);
      transition_out(loadbar.$$.fragment, local);
      transition_out(if_block);
      transition_out(colormenu.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(startmenu, detaching);
      if (detaching)
        detach(t0);
      destroy_component(loadbar, detaching);
      if (detaching)
        detach(t1);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t2);
      destroy_component(colormenu, detaching);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(div);
      ctx[12](null);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let focusedCamera = false;
  let canvasArea;
  let displayAlert = false;
  let gameStarted = false;
  let startMenuDisabled = false;
  let loadBarDisabled = true;
  let colorChanged;
  let menuStateChanged;
  let game;
  const resizeAndControlGame = () => {
    game.setRenderSize();
    if (game.isPageRatioAllowed()) {
      $$invalidate(2, displayAlert = false);
      if (gameStarted) {
        game.run();
      }
    } else {
      $$invalidate(2, displayAlert = true);
      game.stop();
    }
  };
  let progressValue = 0;
  const gameStateChanged = () => {
    $$invalidate(3, startMenuDisabled = true);
    $$invalidate(4, loadBarDisabled = false);
    gameStarted = true;
    game = new MainGame(canvasArea, true, (progress, finished) => {
      if (finished) {
        setTimeout(() => $$invalidate(4, loadBarDisabled = true), 600);
      }
      $$invalidate(7, progressValue = progress);
    });
    window.addEventListener("resize", resizeAndControlGame);
    $$invalidate(5, colorChanged = (event) => {
      const val = JSON.parse(event.detail);
      console.log(JSON.parse(event.detail));
      game.changePlayerMaterial(val.materialName, val.materialColor);
    });
    $$invalidate(6, menuStateChanged = (event) => {
      $$invalidate(0, focusedCamera = !JSON.parse(event.detail));
      game.useFrontCamera = focusedCamera;
    });
    resizeAndControlGame();
  };
  function startmenu_disabled_binding(value) {
    startMenuDisabled = value;
    $$invalidate(3, startMenuDisabled);
  }
  function loadbar_disabled_binding(value) {
    loadBarDisabled = value;
    $$invalidate(4, loadBarDisabled);
  }
  function loadbar_progressValue_binding(value) {
    progressValue = value;
    $$invalidate(7, progressValue);
  }
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
    startMenuDisabled,
    loadBarDisabled,
    colorChanged,
    menuStateChanged,
    progressValue,
    gameStateChanged,
    startmenu_disabled_binding,
    loadbar_disabled_binding,
    loadbar_progressValue_binding,
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
      attr(main, "class", "svelte-pmke04");
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
