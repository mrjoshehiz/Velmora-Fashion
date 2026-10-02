"use client";

import { Heart, House, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "./store-provider";
import { useHydrated } from "@/lib/hydration";
export function StoreHeader(){
  const [menu,setMenu]=useState(false);const {count}=useStore();const hydrated=useHydrated();
  const links=[{label:"NEW IN",href:"/shop"},{label:"DRESSES",href:"/shop?category=Dresses"},{label:"SETS",href:"/shop?category=Sets"},{label:"OUR STORY",href:"/about"}];
  const experiences=[{label:"AI STYLIST",href:"/fashion-lab#stylist"},{label:"PHOTO COMPARISON",href:"/fashion-lab#try-on"},{label:"OUTFIT STUDIO",href:"/fashion-lab#studio"},{label:"JOURNAL",href:"/journal"},{label:"RUNWAY",href:"/fashion-show"},{label:"STYLE GALLERY",href:"/community"},{label:"MY CLOSET",href:"/closet"}];
  return <><header className="site-header">
    <button className="menu-trigger" disabled={!hydrated} onClick={()=>setMenu(true)} aria-label="Open menu"><Menu size={24}/></button>
    <a href="/" className="wordmark metallic-mark" aria-label="Velmora home">VELMORA</a>
    <nav aria-label="Primary navigation" className="desktop-nav">{links.map(link=><a key={link.label} href={link.href}>{link.label}</a>)}</nav>
    <div className="header-actions"><a href="/search" aria-label="Search"><Search size={20}/><span className="header-label">SEARCH</span></a><a href="/account" aria-label="My account" className="account-link"><UserRound size={20}/></a><a href="/bag" aria-label={`Bag, ${count} items`}><ShoppingBag size={20}/><span className="header-label">BAG ({count})</span>{count>0&&<span className="bag-dot">{count}</span>}</a></div>
  </header><nav className="experience-nav" aria-label="VELMORA experiences">{experiences.map(item=><a href={item.href} key={item.label}>{item.label}</a>)}</nav>{menu&&<div className="mobile-menu-backdrop" onClick={()=>setMenu(false)}><nav className="mobile-menu" aria-label="Mobile navigation" onClick={e=>e.stopPropagation()}><button onClick={()=>setMenu(false)} aria-label="Close menu"><X/></button><span className="wordmark">VELMORA</span>{links.map(l=><a key={l.label} href={l.href} onClick={()=>setMenu(false)}>{l.label}</a>)}{experiences.map(l=><a key={l.label} href={l.href} onClick={()=>setMenu(false)}>{l.label}</a>)}<a href="/account" onClick={()=>setMenu(false)}>MY ACCOUNT</a></nav></div>}<nav className="mobile-bottom-nav" aria-label="Mobile shop navigation"><a href="/"><House size={19}/>Home</a><a href="/shop"><Search size={19}/>Shop</a><a href="/fashion-lab"><Heart size={19}/>Style</a><a href="/bag"><ShoppingBag size={19}/>Bag{count>0&&<span>{count}</span>}</a></nav></>
}
export function StoreFooter(){return <footer className="site-footer"><div><span className="footer-logo metallic-mark">VELMORA</span><small>© 2026 VELMORA</small></div><div><strong>SHOP</strong><a href="/shop">All pieces</a><a href="/shop?category=Dresses">Dresses</a><a href="/closet">My Closet</a></div><div><strong>EXPERIENCE</strong><a href="/fashion-lab">Fashion Lab</a><a href="/fashion-show">Fashion show</a><a href="/journal">Journal</a><a href="/community">Style gallery</a></div><div><strong>HELP</strong><a href="/size-guide">Size guide</a><a href="/delivery-returns">Delivery & returns</a><a href="/account">Account</a></div></footer>}
