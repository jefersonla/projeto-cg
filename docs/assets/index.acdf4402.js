var L=Object.defineProperty;var M=(o,e,n)=>e in o?L(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n;var l=(o,e,n)=>(M(o,typeof e!="symbol"?e+"":e,n),n);import{S as d,i as m,s as f,e as c,a as u,b as p,l as B,n as i,d as h,c as x,f as _,g as v,m as y,t as $,h as b,j as w,k as C,P as G,W as O,O as P,B as S,M as q,o as A,p as k,q as E}from"./vendor.668bde45.js";const H=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}};H();function j(o){let e,n,a;return{c(){e=c("button"),e.textContent="Play!",u(e,"class","svelte-17ki1yq")},m(t,r){p(t,e,r),n||(a=B(e,"click",I),n=!0)},p:i,i,o:i,d(t){t&&h(e),n=!1,a()}}}function I(){console.log("Inicia o jogo!")}class N extends d{constructor(e){super();m(this,e,null,j,f,{})}}function z(o){let e,n,a,t,r;return t=new N({}),{c(){e=c("nav"),n=c("h1"),n.textContent="\u{1F3EB} LowPolySchool!",a=x(),_(t.$$.fragment),u(n,"class","svelte-1ttixob"),u(e,"class","svelte-1ttixob")},m(s,g){p(s,e,g),v(e,n),v(e,a),y(t,e,null),r=!0},p:i,i(s){r||($(t.$$.fragment,s),r=!0)},o(s){b(t.$$.fragment,s),r=!1},d(s){s&&h(e),w(t)}}}class F extends d{constructor(e){super();m(this,e,null,z,f,{})}}class W{constructor(e){l(this,"scene");l(this,"camera");l(this,"renderer");l(this,"controls");l(this,"cube");this.scene=new C,this.camera=new G(75,1,.1,1e3),this.camera.position.z=2,this.renderer=new O,this.renderer.setSize(window.innerHeight*.8,window.innerHeight*.8),e.appendChild(this.renderer.domElement),this.controls=new P(this.camera,this.renderer.domElement);const n=new S,a=new q({color:16727552,wireframe:!0});this.cube=new A(n,a),this.scene.add(this.cube)}run(){requestAnimationFrame(()=>this.run()),this.cube.rotation.x+=.01,this.cube.rotation.y+=.01,this.controls.update(),this.render()}render(){this.renderer.render(this.scene,this.camera)}}function K(o){let e;return{c(){e=c("div"),u(e,"class","canvas-area svelte-1thyics")},m(n,a){p(n,e,a),o[1](e)},p:i,i,o:i,d(n){n&&h(e),o[1](null)}}}function R(o,e,n){let a;k(()=>{new W(a).run()});function t(r){E[r?"unshift":"push"](()=>{a=r,n(0,a)})}return[a,t]}class D extends d{constructor(e){super();m(this,e,R,K,f,{})}}function J(o){let e,n,a,t,r;return n=new F({}),t=new D({}),{c(){e=c("main"),_(n.$$.fragment),a=x(),_(t.$$.fragment),u(e,"class","svelte-1t8idgt")},m(s,g){p(s,e,g),y(n,e,null),v(e,a),y(t,e,null),r=!0},p:i,i(s){r||($(n.$$.fragment,s),$(t.$$.fragment,s),r=!0)},o(s){b(n.$$.fragment,s),b(t.$$.fragment,s),r=!1},d(s){s&&h(e),w(n),w(t)}}}class Q extends d{constructor(e){super();m(this,e,null,J,f,{})}}new Q({target:document.getElementById("app")});