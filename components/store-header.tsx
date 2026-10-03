"use client";
import Link from "next/link";
import { Heart, House, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";
import { useStore } from "./store-provider";
import { useHydrated } from "@/lib/hydration";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
const shopLinks = [{label:"New in",href:"/shop"},{label:"Dresses",href:"/shop?category=Dresses"},{label:"Sets",href:"/shop?category=Sets"},{label:"Our story",href:"/about"}];
const experienceLinks = [{label:"Fashion Lab",href:"/fashion-lab"},{label:"Journal",href:"/journal"},{label:"Runway",href:"/fashion-show"},{label:"Style gallery",href:"/community"},{label:"My closet",href:"/closet"}];
export function StoreHeader(){
  const [menu,setMenu]=useState(false); const {count}=useStore(); const hydrated=useHydrated();
  return <><header className="site-header editorial-header">
    <Sheet open={menu} onOpenChange={setMenu}>
      <SheetTrigger className="menu-trigger" disabled={!hydrated} aria-label="Open navigation"><Menu size={23}/></SheetTrigger>
      <SheetContent side="left" className="editorial-menu" aria-describedby={undefined}>
        <SheetHeader><SheetTitle>VELMORA</SheetTitle></SheetHeader>
        <nav aria-label="Mobile navigation">
          {shopLinks.map(link=><a key={link.href} href={link.href} onClick={()=>setMenu(false)}>{link.label}</a>)}
          <div className="menu-experiences">{experienceLinks.map(link=><a key={link.href} href={link.href} onClick={()=>setMenu(false)}>{link.label}</a>)}</div>
          <a href="/account" onClick={()=>setMenu(false)}>My account</a>
        </nav>
      </SheetContent>
    </Sheet>
    <Link href="/" className="wordmark" aria-label="Velmora home">VELMORA</Link>
    <nav aria-label="Primary navigation" className="desktop-nav">
      {shopLinks.map(link=><a key={link.href} href={link.href}>{link.label}</a>)}
      <details className="explore-menu"><summary>Explore</summary><div>{experienceLinks.map(link=><a key={link.href} href={link.href}>{link.label}</a>)}</div></details>
    </nav>
    <div className="header-actions"><a href="/search" aria-label="Search"><Search size={20}/></a><a href="/account" aria-label="My account" className="account-link"><UserRound size={20}/></a><a href="/bag" aria-label={`Bag, ${count} items`}><ShoppingBag size={20}/><span className="header-label">Bag ({count})</span></a></div>
  </header><nav className="mobile-bottom-nav" aria-label="Mobile shop navigation"><Link href="/"><House size={19}/>Home</Link><a href="/shop"><Search size={19}/>Shop</a><a href="/fashion-lab"><Heart size={19}/>Style</a><a href="/bag"><ShoppingBag size={19}/>Bag ({count})</a></nav></>
}
export function StoreFooter(){return <footer className="site-footer"><div><span className="footer-logo">VELMORA</span><small>© 2026 VELMORA</small></div><div><strong>Shop</strong><a href="/shop">All pieces</a><a href="/shop?category=Dresses">Dresses</a><a href="/closet">My closet</a></div><div><strong>Explore</strong><a href="/fashion-lab">Fashion Lab</a><a href="/fashion-show">Fashion show</a><a href="/journal">Journal</a><a href="/community">Style gallery</a></div><div><strong>Help</strong><a href="/size-guide">Size guide</a><a href="/delivery-returns">Delivery & returns</a><a href="/account">Account</a></div></footer>}
