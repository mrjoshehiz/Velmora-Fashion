"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Product, naira } from "@/lib/shared";

export function DressCarousel({products}:{products:Product[]}){
  const track=useRef<HTMLDivElement>(null);
  const paused=useRef(false);
  const [current,setCurrent]=useState(0);
  const [active,setActive]=useState(false);
  const count=products.length;
  function go(index:number){const next=(index+count)%count;const node=track.current;if(!node)return;const card=node.querySelector<HTMLElement>(".dress-slide");if(!card)return;node.scrollTo({left:next*(card.offsetWidth+parseFloat(getComputedStyle(node).gap||"0")),behavior:"smooth"});setCurrent(next)}
  useEffect(()=>{
    const node=track.current;if(!node)return;
    const observer=new IntersectionObserver(([entry])=>setActive(entry.isIntersecting),{threshold:.15});observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!active||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const timer=window.setInterval(()=>{if(!paused.current)go(current+1)},3200);
    return()=>window.clearInterval(timer);
  },[active,current,count]);
  function onScroll(){const node=track.current;const card=node?.querySelector<HTMLElement>(".dress-slide");if(!node||!card)return;const step=card.offsetWidth+parseFloat(getComputedStyle(node).gap||"0");setCurrent(Math.min(count-1,Math.max(0,Math.round(node.scrollLeft/step))))}
  return <div className="dress-carousel">
    <div className="carousel-head"><div><span className="eyebrow">THE DRESS EDIT</span><h2>Dresses</h2></div><div className="carousel-controls"><span aria-live="polite">{String(current+1).padStart(2,"0")} / {String(count).padStart(2,"0")}</span><button type="button" onClick={()=>go(current-1)} aria-label="Previous dress"><ArrowLeft size={18}/></button><button type="button" onClick={()=>go(current+1)} aria-label="Next dress"><ArrowRight size={18}/></button></div></div>
    <div className="dress-track" ref={track} onScroll={onScroll} onPointerEnter={()=>paused.current=true} onPointerLeave={()=>paused.current=false} onFocusCapture={()=>paused.current=true} onBlurCapture={()=>paused.current=false} onTouchStart={()=>paused.current=true} onTouchEnd={()=>{window.setTimeout(()=>paused.current=false,5000)}}>
      {products.map(product=><a className="dress-slide" href={`/product/${product.slug}`} key={product.id}><div className="dress-slide-image"><img src={product.image} alt={`${product.name} in ${product.color}`} loading="lazy"/></div><div className="dress-slide-details"><div><strong>{product.name}</strong><span>{product.color}</span></div><b>{naira(product.price)}</b></div></a>)}
      <div className="dress-track-end" aria-hidden="true"/>
    </div>
    <a className="carousel-all" href="/shop?category=Dresses">View all dresses <ArrowRight size={17}/></a>
  </div>
}
