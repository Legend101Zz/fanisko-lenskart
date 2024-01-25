import{GLTFLoader as e}from"https://unpkg.com/three@0.147.0/examples/jsm/loaders/GLTFLoader.js";import*as o from"three";export const loadGLTF=o=>new Promise((t,r)=>{let a=new e;a.load(o,e=>{t(e)})});export const loadTexture=e=>new Promise((t,r)=>{let a=new o.TextureLoader;a.load(e,e=>{t(e)})});

