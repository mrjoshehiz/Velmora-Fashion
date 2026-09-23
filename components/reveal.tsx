"use client";
import { useEffect, useRef } from "react";
export function Reveal({children,className="",as="div",ariaLabelledBy,id}:{children:React.ReactNode;className?:string;as?:"div"|"section";ariaLabelledBy?:string;id?:string}){
  const ref=useRef<HTMLElement>(null);
  useEffect(()=>{
    const node=ref.current;
    if(node&&id&&window.location.hash===`#${id}`)requestAnimationFrame(()=>node.scrollIntoView());
    if(!node||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}},{threshold:0.08,rootMargin:"0px 0px -5% 0px"});
    node.classList.add("reveal-ready");observer.observe(node);
    return()=>observer.disconnect();
  },[id]);
  const props={className:`reveal ${className}`,"aria-labelledby":ariaLabelledBy,id};
  return as==="section"?<section ref={node=>{ref.current=node}} {...props}>{children}</section>:<div ref={node=>{ref.current=node}} {...props}>{children}</div>;
}
