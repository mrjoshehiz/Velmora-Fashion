"use client";
import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
const Gradient=lazy(()=>import('./shader-colour'));
const Metal=lazy(()=>import('./liquid-brand'));
class EffectBoundary extends Component<{children:ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?null:this.props.children}}
export function RepositoryColour(){
 const ref=useRef<HTMLDivElement>(null);const [visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const mq=matchMedia('(prefers-reduced-motion: reduce)');const observer=new IntersectionObserver(([e])=>setVisible(e.isIntersecting&&!mq.matches),{rootMargin:'100px'});observer.observe(node);return()=>observer.disconnect()},[]);
 return <div className="repository-colour" ref={ref} aria-hidden="true">{visible&&<EffectBoundary><Suspense fallback={null}><Gradient/><Metal/></Suspense></EffectBoundary>}</div>
}
export function RepositoryGlass(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const host=ref.current;if(!host||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let cancelled=false;let dispose:(()=>void)|undefined;
 const observer=new IntersectionObserver(async([entry])=>{if(!entry.isIntersecting||dispose)return;observer.disconnect();try{const {Container}=await import('@/lib/effects/liquid-glass');if(cancelled)return;
 // Snapshot only the nearby campaign image, rather than the whole shop or private form data.
 const photo=host.closest('.atelier-hero-image')?.querySelector('img');if(!photo)return;if(!photo.complete)await photo.decode();if(cancelled)return;
 const snapshot=document.createElement('canvas');snapshot.width=innerWidth;snapshot.height=innerHeight;const ctx=snapshot.getContext('2d');if(!ctx)return;const bounds=photo.getBoundingClientRect();ctx.fillStyle='#b8afa3';ctx.fillRect(0,0,snapshot.width,snapshot.height);ctx.drawImage(photo,bounds.left,bounds.top,bounds.width,bounds.height);Container.pageSnapshot=snapshot;
 const glass=new Container({borderRadius:16,type:'rounded',tintOpacity:.12});glass.element.style.cssText='position:absolute;inset:0;isolation:isolate;border-radius:16px';glass.canvas.style.zIndex='0';glass.canvas.style.boxShadow='none';glass.element.setAttribute('aria-hidden','true');host.appendChild(glass.element);glass.updateSizeFromDOM();dispose=()=>glass.destroy();
 }catch{/* The readable static panel remains available. */}},{threshold:.15});observer.observe(host);return()=>{cancelled=true;observer.disconnect();dispose?.()};},[]);
 return <div className="repository-glass" ref={ref} aria-hidden="true"/>;
}
