"use client";
import { ArrowRight, Check, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { type Product, naira, sizes } from "@/lib/shared";
import { useHydrated } from "@/lib/hydration";
import { useStore } from "./store-provider";
export function ProductCard({product,initialSaved=false,onUnsave}:{product:Product;initialSaved?:boolean;onUnsave?:(id:string)=>void}){
  const [saved,setSaved]=useState(initialSaved);
  const [picker,setPicker]=useState(false);
  const [added,setAdded]=useState(false);
  const [saveError,setSaveError]=useState("");
  const hydrated=useHydrated();
  const {add}=useStore();
  async function toggleSave(){
    setSaveError("");
    try{const response=await fetch("/api/wishlist",{method:saved?"DELETE":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId:product.id})});if(response.ok){setSaved(!saved);if(saved)onUnsave?.(product.id)}else if(response.status===401)window.location.assign("/account");else setSaveError("Could not save. Try again.")}
    catch{setSaveError("Could not save. Try again.")}
  }
  function selectSize(size:string){add(product,size);setPicker(false);setAdded(true)}
  return <article className="catalog-card"><div className="catalog-image"><a href={`/product/${product.slug}`} aria-label={`View ${product.name}`}><img src={product.image} alt={`${product.name} in ${product.color}`} loading="lazy"/></a><button className={`favorite ${saved?"is-saved":""}`} type="button" disabled={!hydrated} onClick={toggleSave} aria-label={`${saved?"Remove":"Save"} ${product.name}`}><Heart size={14} fill={saved?"currentColor":"none"}/><span>{saved?"SAVED":"SAVE"}</span></button></div>
    <div className="catalog-info"><a href={`/product/${product.slug}`} className="catalog-caption"><span>{product.name}</span><strong>{naira(product.price)}</strong></a><small>{product.color} · {product.category}</small><button type="button" className="quick-add" disabled={!hydrated} onClick={()=>{setPicker(!picker);setAdded(false)}} aria-expanded={picker} aria-label={`Choose size for ${product.name}`}>{picker?"CLOSE SIZE SELECTOR":"SELECT SIZE & ADD"}<ShoppingBag size={16}/></button>
    {picker&&<div className="quick-picker"><span>CHOOSE YOUR SIZE</span><div>{sizes.map(size=><button type="button" key={size} onClick={()=>selectSize(size)} aria-label={`Add ${product.name} in size ${size} to bag`}>{size}</button>)}</div><a href={`/product/${product.slug}`}>VIEW DETAILS <ArrowRight size={13}/></a></div>}
    {added&&<a className="quick-added" aria-live="polite" href="/bag"><Check size={15}/> ADDED TO BAG · VIEW BAG <ArrowRight size={14}/></a>}{saveError&&<span className="card-error" role="alert">{saveError}</span>}</div>
  </article>
}
