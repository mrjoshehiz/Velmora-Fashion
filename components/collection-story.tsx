"use client";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/shared";
import { naira } from "@/lib/shared";

export function CollectionStory({products}:{products:Product[]}) {
  const ref=useRef<HTMLElement>(null);
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const node=ref.current;
    if(!node || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let frame=0;
    const update=()=>{frame=0;const bounds=node.getBoundingClientRect();const travel=bounds.height-innerHeight;setActive(Math.min(products.length-1,Math.max(0,Math.floor((-bounds.top/Math.max(1,travel))*products.length))));};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){window.addEventListener('scroll',scroll,{passive:true});update();}else window.removeEventListener('scroll',scroll);});
    observer.observe(node);
    return()=>{observer.disconnect();window.removeEventListener('scroll',scroll);cancelAnimationFrame(frame);};
  },[products.length]);
  if(!products.length)return null;
  const words=[['A little','drama.'],['A different','rhythm.'],['An effortless','entrance.']];
  return <section className="collection-story" ref={ref} aria-label="The occasion edit">
    <div className="story-stage"><div className="story-copy"><span className="eyebrow">THE OCCASION EDIT / {String(active+1).padStart(2,'0')}</span><h2>{words[active%3][0]}<br/><em>{words[active%3][1]}</em></h2><p>Shape. Colour. Presence.<br/>Find the piece that feels like you.</p><div className="story-tabs" aria-label="Explore featured dresses">{products.map((p,i)=><button key={p.id} type="button" aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span>{p.color}</button>)}</div><a href="/shop?category=Dresses" className="atelier-link">Explore the dress edit</a></div><div className="story-images">{products.map((p,i)=><a key={p.id} href={`/product/${p.slug}`} className={`story-frame ${active===i?'is-active':''}`} aria-hidden={active!==i} tabIndex={active===i?0:-1}><img src={p.image} alt={`${p.name} in ${p.color}`} loading="lazy"/><div className="story-caption"><span>{p.name}</span><strong>{naira(p.price)}</strong></div></a>)}</div><span className="story-scroll" aria-hidden="true">SCROLL TO DISCOVER</span></div>
  </section>
}
