var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, a as space, t as text, b as src_url_equal, c as attr, d as set_style, f as insert, g as append, h as set_data, j as create_out_transition, k as detach, l as empty, m as transition_in, n as group_outros, o as transition_out, p as check_outros, q as fade, r as toggle_class, u as listen, v as is_function, w as destroy_each, x as run_all, y as noop, z as add_render_callback, A as create_bidirectional_transition, B as createEventDispatcher, C as fly, D as binding_callbacks, G as GLTFLoader, E as AudioLoader, F as AnimationMixer, V as Vector3, H as Audio, I as nipplejs, J as Scene, P as PerspectiveCamera, K as CameraHelper, O as OrbitControls, W as WebGLRenderer, L as sRGBEncoding, M as AxesHelper, N as HemisphereLight, Q as SpotLight, R as SpotLightHelper, T as PlaneGeometry, U as MeshStandardMaterial, X as Mesh, Y as MathUtils, Z as Clock, _ as AudioListener, $ as Color, a0 as SkeletonHelper, a1 as BoxGeometry, a2 as MeshPhongMaterial, a3 as Fog, a4 as Stats, a5 as GUI$1, a6 as bind, a7 as create_component, a8 as mount_component, a9 as add_flush_callback, aa as destroy_component, ab as onMount } from "./vendor.61b0b7f0.js";
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
var LoadBar_svelte_svelte_type_style_lang = "";
function create_if_block$4(ctx) {
  let div2;
  let img;
  let img_src_value;
  let t0;
  let div1;
  let div0;
  let t1_value = ctx[0].toFixed(0) + "";
  let t1;
  let t2;
  let div0_aria_valuenow_value;
  let div2_outro;
  let current;
  return {
    c() {
      div2 = element("div");
      img = element("img");
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      t1 = text(t1_value);
      t2 = text("%");
      if (!src_url_equal(img.src, img_src_value = "images/escolinha.png"))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Escolinha logo");
      attr(img, "class", "svelte-qcupuw");
      attr(div0, "class", "progress-bar svelte-qcupuw");
      attr(div0, "role", "progressbar");
      set_style(div0, "width", ctx[0].toFixed(0) + "%");
      attr(div0, "aria-valuenow", div0_aria_valuenow_value = ctx[0].toFixed(0));
      attr(div0, "aria-valuemin", "0");
      attr(div0, "aria-valuemax", "100");
      attr(div1, "class", "progress svelte-qcupuw");
      attr(div2, "class", "load-bar svelte-qcupuw");
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
      if ((!current || dirty & 1) && t1_value !== (t1_value = ctx2[0].toFixed(0) + ""))
        set_data(t1, t1_value);
      if (!current || dirty & 1) {
        set_style(div0, "width", ctx2[0].toFixed(0) + "%");
      }
      if (!current || dirty & 1 && div0_aria_valuenow_value !== (div0_aria_valuenow_value = ctx2[0].toFixed(0))) {
        attr(div0, "aria-valuenow", div0_aria_valuenow_value);
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
function create_fragment$5(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !ctx[1] && create_if_block$4(ctx);
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
          if_block = create_if_block$4(ctx2);
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
function instance$4($$self, $$props, $$invalidate) {
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
    init(this, options, instance$4, create_fragment$5, safe_not_equal, { progressValue: 0, disabled: 1 });
  }
}
var ColorMenu_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
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
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
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
      attr(div0, "class", "object-button svelte-1sucbb4");
      toggle_class(div0, "buttonSelected", ctx[2] === ctx[0].HAT);
      attr(div1, "class", "object-button svelte-1sucbb4");
      toggle_class(div1, "buttonSelected", ctx[2] === ctx[0].HAIR);
      attr(div2, "class", "object-selection svelte-1sucbb4");
      attr(div3, "class", "colors svelte-1sucbb4");
      attr(div4, "class", "close-button svelte-1sucbb4");
      attr(div5, "class", "color-menu svelte-1sucbb4");
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
          const child_ctx = get_each_context$1(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
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
function create_each_block$1(ctx) {
  let div;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "color-button svelte-1sucbb4");
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
function create_if_block$3(ctx) {
  let div;
  let div_transition;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="material-icons-outlined">face</span>`;
      attr(div, "class", "open-menu close-button svelte-1sucbb4");
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
function create_fragment$4(ctx) {
  let t;
  let if_block1_anchor;
  let current;
  let if_block0 = !ctx[3] && create_if_block_1(ctx);
  let if_block1 = ctx[3] && create_if_block$3(ctx);
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
          if_block1 = create_if_block$3(ctx2);
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
function instance$3($$self, $$props, $$invalidate) {
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
    init(this, options, instance$3, create_fragment$4, safe_not_equal, {});
  }
}
var StartMenu_svelte_svelte_type_style_lang = "";
function create_if_block$2(ctx) {
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
function create_fragment$3(ctx) {
  let if_block_anchor;
  let current;
  let if_block = !ctx[0] && create_if_block$2(ctx);
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
          if_block = create_if_block$2(ctx2);
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
function instance$2($$self, $$props, $$invalidate) {
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
    init(this, options, instance$2, create_fragment$3, safe_not_equal, { disabled: 0 });
  }
}
var FloatMessage_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  return child_ctx;
}
function create_if_block$1(ctx) {
  let div2;
  let div0;
  let t6;
  let div1;
  let div2_outro;
  let current;
  let each_value = ctx[1];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      div0.innerHTML = `<h2 class="svelte-10inn77">Sua Miss\xE3o!</h2> 
            <h3 class="svelte-10inn77">Pegue os elementos correspondentes as <b>PALAVRAS</b> abaixo no mapa conforme a ordem.
                <b>N\xE3o vale pegar os elementos das cores das palavras abaixo!</b></h3>`;
      t6 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "title svelte-10inn77");
      attr(div1, "class", "elements svelte-10inn77");
      attr(div2, "class", "float-message svelte-10inn77");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t6);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div1, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 2) {
        each_value = ctx2[1];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
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
      destroy_each(each_blocks, detaching);
      if (detaching && div2_outro)
        div2_outro.end();
    }
  };
}
function create_each_block(ctx) {
  let div;
  let t0_value = ctx[2].name + "";
  let t0;
  let t1;
  return {
    c() {
      div = element("div");
      t0 = text(t0_value);
      t1 = space();
      attr(div, "class", "cor-element svelte-10inn77");
      set_style(div, "color", ctx[2].textColor);
      toggle_class(div, "correct", ctx[2].correct);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t0);
      append(div, t1);
    },
    p(ctx2, dirty) {
      if (dirty & 2 && t0_value !== (t0_value = ctx2[2].name + ""))
        set_data(t0, t0_value);
      if (dirty & 2) {
        set_style(div, "color", ctx2[2].textColor);
      }
      if (dirty & 2) {
        toggle_class(div, "correct", ctx2[2].correct);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
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
  let { disabled = false } = $$props;
  let { elements = [] } = $$props;
  $$self.$$set = ($$props2) => {
    if ("disabled" in $$props2)
      $$invalidate(0, disabled = $$props2.disabled);
    if ("elements" in $$props2)
      $$invalidate(1, elements = $$props2.elements);
  };
  return [disabled, elements];
}
class FloatMessage extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, { disabled: 0, elements: 1 });
  }
}
class CustomModelLoader {
  static load(path) {
    return !this.loadedModels[path] ? this.loader.loadAsync(path).then(this.assignGLTF(path)).then(castShadow) : Promise.resolve(this.loadedModels[path]);
  }
  static assignGLTF(path) {
    return (gltf) => {
      this.loadedModels[path] = gltf;
      return gltf;
    };
  }
  constructor() {
  }
}
__publicField(CustomModelLoader, "loader", new GLTFLoader());
__publicField(CustomModelLoader, "loadedModels", {});
function castShadow(gltf) {
  gltf.scene.traverse((obj) => {
    obj.castShadow = true;
  });
  return gltf;
}
class CustomAudioLoader {
  static load(path) {
    return !this.loadedAudios[path] ? this.loader.loadAsync(path).then(this.assignAudioBuffer(path)) : Promise.resolve(this.loadedAudios[path]);
  }
  static assignAudioBuffer(path) {
    return (audio) => {
      this.loadedAudios[path] = audio;
      return audio;
    };
  }
  constructor() {
  }
}
__publicField(CustomAudioLoader, "loader", new AudioLoader());
__publicField(CustomAudioLoader, "loadedAudios", {});
var Movements;
(function(Movements2) {
  Movements2[Movements2["FRONT"] = 0] = "FRONT";
  Movements2[Movements2["BACK"] = 1] = "BACK";
  Movements2[Movements2["LEFT"] = 2] = "LEFT";
  Movements2[Movements2["RIGHT"] = 3] = "RIGHT";
})(Movements || (Movements = {}));
const _Player = class {
  constructor(gltf, frontCamera, footStepSound) {
    __publicField(this, "model");
    __publicField(this, "movementVector");
    __publicField(this, "currentLookingVector");
    __publicField(this, "activeCommands", {
      [2]: false,
      [0]: false,
      [1]: false,
      [3]: false
    });
    __publicField(this, "currentRunState");
    __publicField(this, "animationMixer");
    __publicField(this, "runAction");
    __publicField(this, "idleAction");
    __publicField(this, "previousAction");
    __publicField(this, "activeAction");
    this.gltf = gltf;
    this.frontCamera = frontCamera;
    this.footStepSound = footStepSound;
    this.model = gltf.scene.children[0];
    this.animationMixer = new AnimationMixer(this.model);
    this.movementVector = new Vector3(0, 0, 0);
    this.currentLookingVector = _Player.movementBaseVector.clone();
    this.currentRunState = false;
    const animations = gltf.animations;
    this.idleAction = this.animationMixer.clipAction(animations[0]);
    this.runAction = this.animationMixer.clipAction(animations[1]);
    this.setupAnimations();
    this.setupControls();
    this.idleAction.paused = false;
    this.idleAction.play();
  }
  static async loadPlayer(frontCamera, audioListener) {
    const stepSound = await CustomAudioLoader.load("game/sounds/footstep_sound.ogg").then((audioBuffer) => {
      const sound = new Audio(audioListener);
      sound.setVolume(0.15);
      sound.setBuffer(audioBuffer);
      sound.setLoop(true);
      sound.play();
      sound.stop();
      return sound;
    });
    return new _Player(await CustomModelLoader.load("game/models/cau.glb"), frontCamera, stepSound);
  }
  setupControls() {
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
  setupMobileControls(canvasContainer) {
    let screenJoystick = nipplejs.create({
      zone: canvasContainer,
      mode: "dynamic",
      catchDistance: 150,
      color: "white",
      position: { left: "10%", top: "80%" }
    });
    screenJoystick.on("move", (_, data) => {
      this.movementVector.x = data.vector.x;
      this.movementVector.z = data.vector.y * -1;
    });
    screenJoystick.on("end", () => {
      this.movementVector.x = 0;
      this.movementVector.z = 0;
    });
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
  updatePlayerPosition() {
    if (!this.hasMovement) {
      return;
    }
    this.model.position.x += this.movementVector.x * _Player.baseSpeed;
    this.model.position.z += this.movementVector.z * _Player.baseSpeed;
    this.currentLookingVector = this.model.position.clone().add(this.movementVector.normalize());
    this.updateFrontCameraPosition();
    this.model.lookAt(this.currentLookingVector);
  }
  updateFrontCameraPosition() {
    const cameraPosition = this.model.position.clone().add(this.movementVector.clone().normalize().multiplyScalar(6));
    this.frontCamera.position.x = cameraPosition.x;
    this.frontCamera.position.z = cameraPosition.z;
    const targetPosition = this.model.position.clone();
    targetPosition.y = 3;
    this.frontCamera.lookAt(targetPosition);
  }
  updateIsometricCameraPosition(camera) {
    camera.position.x = this.model.position.x;
    camera.position.z = this.model.position.z + 15;
    camera.position.y = this.model.position.y + 20;
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
      if (this.hasMovement) {
        this.footStepSound.play(0.5);
      } else {
        this.footStepSound.stop();
      }
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
function isMobileOrTablet() {
  let check = false;
  (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
class MainGame {
  constructor(canvasContainer, gameElements, notify = () => {
  }, debugEnabled = false, loadCallback = () => {
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
    __publicField(this, "audioListener");
    __publicField(this, "animationsMixer");
    __publicField(this, "clock");
    __publicField(this, "debugOptions", {
      enableSkeleton: false,
      skeletonHelper: null,
      enableSpotlightHelper: false,
      spotlightHelper: null,
      enableCameraHelper: false,
      cameraHelper: null,
      enableFrontCameraHelper: false,
      frontCameraHelper: null,
      enableAxesHelper: false,
      axesHelper: null,
      enableOrbitControl: false,
      updateOrbitControl: false,
      orbitControl: null,
      resetCamera: () => this.resetCamera()
    });
    __publicField(this, "hatMaterial");
    __publicField(this, "hairMaterial");
    __publicField(this, "backgroundMusic");
    __publicField(this, "successSound");
    __publicField(this, "failureSound");
    this.gameElements = gameElements;
    this.notify = notify;
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
    this.initAudio();
    loadCallback(25, false);
    this.initAnimationMixer();
    loadCallback(50, false);
    this.initScene(loadCallback).then(() => loadCallback(100, true));
  }
  initCamera() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.camera.position.z = 15;
    this.camera.position.y = 20;
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.debugOptions.cameraHelper = new CameraHelper(this.camera);
    this.debugOptions.orbitControl = new OrbitControls(this.camera, this.canvasContainer);
    this.debugOptions.orbitControl.enabled = false;
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
    this.debugOptions.axesHelper = new AxesHelper(10);
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
    this.debugOptions.spotlightHelper = new SpotLightHelper(spotLight);
  }
  initGroundPlane() {
    const planeGeometry = new PlaneGeometry(4e3, 4e3, 32, 32);
    const planeMaterial = new MeshStandardMaterial({ color: 3330126 });
    const groundPlane = new Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = MathUtils.degToRad(-90);
    groundPlane.receiveShadow = true;
    this.scene.add(groundPlane);
  }
  initAnimationMixer() {
    this.animationsMixer = [];
    this.clock = new Clock();
  }
  initAudio() {
    this.audioListener = new AudioListener();
    this.camera.add(this.audioListener);
  }
  async initPlayer() {
    this.frontCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
    this.frontCamera.position.z = 6;
    this.frontCamera.position.y = 3;
    this.frontCamera.lookAt(new Vector3(0, 3, 0));
    this.debugOptions.frontCameraHelper = new CameraHelper(this.frontCamera);
    this.player = await Player.loadPlayer(this.frontCamera, this.audioListener);
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
    if (isMobileOrTablet()) {
      this.player.setupMobileControls(this.canvasContainer);
    }
    this.animationsMixer.push(this.player.animationMixer);
    this.debugOptions.skeletonHelper = new SkeletonHelper(this.player.model);
    this.scene.add(this.frontCamera);
    this.scene.add(this.player.model);
  }
  createDummyCube(pos, color) {
    const cubeSize = 1;
    const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
    geometry.translate(pos.x, cubeSize / 2, pos.z);
    const material = new MeshPhongMaterial({
      color: new Color(color)
    });
    const cube = new Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    this.scene.add(cube);
  }
  async initScene(loadCallback) {
    const totalNumberOperations = 6;
    const updateProgressBar = (operationNumber) => {
      loadCallback(operationNumber * 100 / totalNumberOperations, false);
    };
    this.initGroundPlane();
    updateProgressBar(1);
    for (let el of this.gameElements) {
      this.createDummyCube(el.position, el.nameColor);
    }
    updateProgressBar(2);
    this.scene.fog = new Fog(16777215, 58, 60);
    updateProgressBar(3);
    await this.initPlayer();
    updateProgressBar(4);
    await this.initBackgroundMusic();
    updateProgressBar(5);
    await this.initGameSounds();
    updateProgressBar(5);
  }
  async initGameSounds() {
    const successSoundBuf = await CustomAudioLoader.load("game/sounds/success_sound.ogg");
    this.successSound = new Audio(this.audioListener);
    this.successSound.setBuffer(successSoundBuf);
    this.successSound.setLoop(false);
    this.successSound.setVolume(0.5);
    const failureSoundBuf = await CustomAudioLoader.load("game/sounds/failure_sound.ogg");
    this.failureSound = new Audio(this.audioListener);
    this.failureSound.setBuffer(failureSoundBuf);
    this.failureSound.setLoop(false);
    this.failureSound.setVolume(0.5);
  }
  async initBackgroundMusic() {
    const backgroundMusicBuf = await CustomAudioLoader.load("game/sounds/fluffing_a_duck_ambient.ogg");
    this.backgroundMusic = new Audio(this.audioListener);
    this.backgroundMusic.setBuffer(backgroundMusicBuf);
    this.backgroundMusic.setLoop(true);
    this.backgroundMusic.setVolume(0.2);
    this.backgroundMusic.play();
  }
  resetCamera() {
    this.camera.position.x = this.player.model.position.x;
    this.camera.position.z = this.player.model.position.z + 15;
    this.camera.position.y = this.player.model.position.y + 20;
    this.camera.lookAt(this.player.model.position);
  }
  initDebugOptions() {
    this.debugStats = Stats();
    this.canvasContainer.appendChild(this.debugStats.dom);
    this.debugMenu = new GUI$1();
    this.debugMenu.close();
    this.debugMenu.add(this.debugOptions, "resetCamera");
    const debug = this.debugMenu.addFolder("helpers");
    const updateDebug = (prop) => {
      return (state) => {
        switch (prop) {
          case "enableSkeleton":
            state ? this.scene.add(this.debugOptions.skeletonHelper) : this.scene.remove(this.debugOptions.skeletonHelper);
            break;
          case "enableSpotlightHelper":
            state ? this.scene.add(this.debugOptions.spotlightHelper) : this.scene.remove(this.debugOptions.spotlightHelper);
            break;
          case "enableCameraHelper":
            state ? this.scene.add(this.debugOptions.cameraHelper) : this.scene.remove(this.debugOptions.cameraHelper);
            break;
          case "enableFrontCameraHelper":
            state ? this.scene.add(this.debugOptions.frontCameraHelper) : this.scene.remove(this.debugOptions.frontCameraHelper);
            break;
          case "enableAxesHelper":
            state ? this.scene.add(this.debugOptions.axesHelper) : this.scene.remove(this.debugOptions.axesHelper);
            break;
          case "enableOrbitControl":
            this.debugOptions.orbitControl.enabled = state;
            break;
        }
      };
    };
    const debugProperties = [
      debug.add(this.debugOptions, "enableSkeleton", false),
      debug.add(this.debugOptions, "enableSpotlightHelper", false),
      debug.add(this.debugOptions, "enableCameraHelper", false),
      debug.add(this.debugOptions, "enableFrontCameraHelper", false),
      debug.add(this.debugOptions, "enableAxesHelper", false),
      debug.add(this.debugOptions, "enableOrbitControl", false)
    ];
    debugProperties.forEach((debugProperty) => debugProperty.onChange(updateDebug(debugProperty.property)));
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
    return window.innerWidth / window.innerHeight >= 1 && window.innerWidth / window.innerHeight <= 3;
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
  checkQuestTask() {
    let i = 0;
    for (const el of this.gameElements) {
      if (this.player.checkCollision(el.position, 4)) {
        if (i == 0 && this.gameElements[1].correct == true) {
          this.gameElements.forEach((gel) => gel.correct = false);
          this.failureSound.play();
        } else if (i == 0 && this.gameElements[1].correct == false || this.gameElements[i - 1].correct === true) {
          this.successSound.play();
          el.correct = true;
        } else {
          this.gameElements.forEach((gel) => gel.correct = false);
          this.failureSound.play();
        }
        this.notify();
      }
      i++;
    }
  }
  step() {
    if (this.debugEnabled) {
      this.updateDebugStats();
    }
    if (this.debugOptions.updateOrbitControl) {
      this.debugOptions.orbitControl.update();
    }
    let mixerUpdateDelta = this.clock.getDelta();
    for (const animationMixer of this.animationsMixer) {
      animationMixer.update(mixerUpdateDelta);
    }
    if (!!this.player) {
      this.player.updateAnimation();
      this.player.updatePlayerPosition();
      this.player.updateIsometricCameraPosition(this.camera);
      this.checkQuestTask();
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
var Game_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let div;
  let div_transition;
  let current;
  return {
    c() {
      div = element("div");
      div.innerHTML = `<span class="material-icons-outlined">screen_rotation</span> 
        <h1 class="svelte-kqw3m3">Vire o Smartphone ou maximize a tela para come\xE7ar!</h1>`;
      attr(div, "class", "alert-overlay svelte-kqw3m3");
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
  let floatmessage;
  let updating_elements;
  let t2;
  let t3;
  let colormenu;
  let t4;
  let div;
  let current;
  function startmenu_disabled_binding(value) {
    ctx[11](value);
  }
  let startmenu_props = {};
  if (ctx[4] !== void 0) {
    startmenu_props.disabled = ctx[4];
  }
  startmenu = new StartMenu({ props: startmenu_props });
  binding_callbacks.push(() => bind(startmenu, "disabled", startmenu_disabled_binding));
  startmenu.$on("gameStateChanged", ctx[10]);
  function loadbar_disabled_binding(value) {
    ctx[12](value);
  }
  function loadbar_progressValue_binding(value) {
    ctx[13](value);
  }
  let loadbar_props = {};
  if (ctx[5] !== void 0) {
    loadbar_props.disabled = ctx[5];
  }
  if (ctx[9] !== void 0) {
    loadbar_props.progressValue = ctx[9];
  }
  loadbar = new LoadBar({ props: loadbar_props });
  binding_callbacks.push(() => bind(loadbar, "disabled", loadbar_disabled_binding));
  binding_callbacks.push(() => bind(loadbar, "progressValue", loadbar_progressValue_binding));
  function floatmessage_elements_binding(value) {
    ctx[14](value);
  }
  let floatmessage_props = {
    disabled: !(ctx[3] && !ctx[2] && !ctx[0])
  };
  if (ctx[8] !== void 0) {
    floatmessage_props.elements = ctx[8];
  }
  floatmessage = new FloatMessage({ props: floatmessage_props });
  binding_callbacks.push(() => bind(floatmessage, "elements", floatmessage_elements_binding));
  let if_block = ctx[2] && create_if_block();
  colormenu = new ColorMenu({});
  colormenu.$on("colorChanged", function() {
    if (is_function(ctx[6]))
      ctx[6].apply(this, arguments);
  });
  colormenu.$on("menuStateChanged", function() {
    if (is_function(ctx[7]))
      ctx[7].apply(this, arguments);
  });
  return {
    c() {
      create_component(startmenu.$$.fragment);
      t0 = space();
      create_component(loadbar.$$.fragment);
      t1 = space();
      create_component(floatmessage.$$.fragment);
      t2 = space();
      if (if_block)
        if_block.c();
      t3 = space();
      create_component(colormenu.$$.fragment);
      t4 = space();
      div = element("div");
      attr(div, "class", "canvas-area svelte-kqw3m3");
      toggle_class(div, "focusedCamera", ctx[0]);
    },
    m(target, anchor) {
      mount_component(startmenu, target, anchor);
      insert(target, t0, anchor);
      mount_component(loadbar, target, anchor);
      insert(target, t1, anchor);
      mount_component(floatmessage, target, anchor);
      insert(target, t2, anchor);
      if (if_block)
        if_block.m(target, anchor);
      insert(target, t3, anchor);
      mount_component(colormenu, target, anchor);
      insert(target, t4, anchor);
      insert(target, div, anchor);
      ctx[15](div);
      current = true;
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      const startmenu_changes = {};
      if (!updating_disabled && dirty & 16) {
        updating_disabled = true;
        startmenu_changes.disabled = ctx[4];
        add_flush_callback(() => updating_disabled = false);
      }
      startmenu.$set(startmenu_changes);
      const loadbar_changes = {};
      if (!updating_disabled_1 && dirty & 32) {
        updating_disabled_1 = true;
        loadbar_changes.disabled = ctx[5];
        add_flush_callback(() => updating_disabled_1 = false);
      }
      if (!updating_progressValue && dirty & 512) {
        updating_progressValue = true;
        loadbar_changes.progressValue = ctx[9];
        add_flush_callback(() => updating_progressValue = false);
      }
      loadbar.$set(loadbar_changes);
      const floatmessage_changes = {};
      if (dirty & 13)
        floatmessage_changes.disabled = !(ctx[3] && !ctx[2] && !ctx[0]);
      if (!updating_elements && dirty & 256) {
        updating_elements = true;
        floatmessage_changes.elements = ctx[8];
        add_flush_callback(() => updating_elements = false);
      }
      floatmessage.$set(floatmessage_changes);
      if (ctx[2]) {
        if (if_block) {
          if (dirty & 4) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block();
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t3.parentNode, t3);
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
      transition_in(floatmessage.$$.fragment, local);
      transition_in(if_block);
      transition_in(colormenu.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(startmenu.$$.fragment, local);
      transition_out(loadbar.$$.fragment, local);
      transition_out(floatmessage.$$.fragment, local);
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
      destroy_component(floatmessage, detaching);
      if (detaching)
        detach(t2);
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(t3);
      destroy_component(colormenu, detaching);
      if (detaching)
        detach(t4);
      if (detaching)
        detach(div);
      ctx[15](null);
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
  let gameItens = [
    {
      name: "Verde",
      nameColor: "green",
      textColor: "blue",
      correct: false,
      position: new Vector3(10, 0, 15)
    },
    {
      name: "Azul",
      nameColor: "blue",
      textColor: "orange",
      correct: false,
      position: new Vector3(0, 0, 10)
    },
    {
      name: "Preto",
      nameColor: "black",
      textColor: "red",
      correct: false,
      position: new Vector3(8, 0, 5)
    },
    {
      name: "Vermelho",
      nameColor: "red",
      textColor: "black",
      correct: false,
      position: new Vector3(4, 0, 3)
    },
    {
      name: "Amarelo",
      nameColor: "yellow",
      textColor: "green",
      correct: false,
      position: new Vector3(10, 0, 2)
    },
    {
      name: "Rosa",
      nameColor: "pink",
      textColor: "purple",
      correct: false,
      position: new Vector3(10, 0, 30)
    }
  ];
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
  const notify = () => {
    $$invalidate(8, gameItens);
  };
  const gameStateChanged = () => {
    $$invalidate(4, startMenuDisabled = true);
    $$invalidate(5, loadBarDisabled = false);
    $$invalidate(3, gameStarted = true);
    game = new MainGame(canvasArea, gameItens, notify, true, (progress, finished) => {
      if (finished) {
        setTimeout(() => $$invalidate(5, loadBarDisabled = true), 600);
      }
      $$invalidate(9, progressValue = progress);
    });
    window.addEventListener("resize", resizeAndControlGame);
    $$invalidate(6, colorChanged = (event) => {
      const val = JSON.parse(event.detail);
      game.changePlayerMaterial(val.materialName, val.materialColor);
    });
    $$invalidate(7, menuStateChanged = (event) => {
      $$invalidate(0, focusedCamera = !JSON.parse(event.detail));
      game.useFrontCamera = focusedCamera;
    });
    resizeAndControlGame();
  };
  {
    onMount(() => {
      $$invalidate(4, startMenuDisabled = true);
      $$invalidate(5, loadBarDisabled = true);
      $$invalidate(3, gameStarted = true);
      gameStateChanged();
    });
  }
  function startmenu_disabled_binding(value) {
    startMenuDisabled = value;
    $$invalidate(4, startMenuDisabled);
  }
  function loadbar_disabled_binding(value) {
    loadBarDisabled = value;
    $$invalidate(5, loadBarDisabled);
  }
  function loadbar_progressValue_binding(value) {
    progressValue = value;
    $$invalidate(9, progressValue);
  }
  function floatmessage_elements_binding(value) {
    gameItens = value;
    $$invalidate(8, gameItens);
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
    gameStarted,
    startMenuDisabled,
    loadBarDisabled,
    colorChanged,
    menuStateChanged,
    gameItens,
    progressValue,
    gameStateChanged,
    startmenu_disabled_binding,
    loadbar_disabled_binding,
    loadbar_progressValue_binding,
    floatmessage_elements_binding,
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
      attr(main, "class", "svelte-p3128u");
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
