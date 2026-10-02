"use client";
import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/lib/shared';
import { naira } from '@/lib/shared';
export function CollectionStory({products}:{products:Product[]}){
 const ref=useRef<HTMLDivElement>(null);const [ready,setReady]=useState(false);
 useEffect(()=>{const host=ref.current;if(!host||!products.length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let cancelled=false;let dispose:(()=>void)|undefined;
 import('@/lib/effects/scroll-world').then(({mountScrollWorld})=>{if(cancelled)return;dispose=mountScrollWorld(host,{nav:false,atmosphere:false,diveScroll:.7,hint:'The occasion edit',sections:products.map((p,i)=>({id:p.slug,label:p.color,still:p.image,accent:'#b5c8ff',eyebrow:'THE OCCASION EDIT',title:['A little drama.','A different rhythm.','An effortless entrance.'][i%3],body:`${p.name} · ${naira(p.price)}`,cta:{primary:{label:'See the dress',href:`/product/${p.slug}`}}}))});setReady(true)}).catch(()=>{});return()=>{cancelled=true;dispose?.()};},[products]);
 return <section aria-label="The occasion edit"><div className="repository-story" ref={ref}/>{!ready&&<div className="story-static">{products.map(p=><a href={`/product/${p.slug}`} key={p.id}><img src={p.image} alt={p.name} loading="lazy"/><span>{p.name} · {naira(p.price)}</span></a>)}</div>}</section>
}
