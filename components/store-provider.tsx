"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/shared";
export type CartItem={id:string;slug:string;name:string;image:string;price:number;color:string;size:string;quantity:number};
type StoreContext={items:CartItem[];count:number;subtotal:number;ready:boolean;add:(product:Product,size:string)=>void;update:(id:string,size:string,quantity:number)=>void;remove:(id:string,size:string)=>void;clear:()=>void};
const Context=createContext<StoreContext|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}){
  const [items,setItems]=useState<CartItem[]>([]);const [ready,setReady]=useState(false);const itemsRef=useRef<CartItem[]>([]);
  const demoMode=useRef(false);
  useEffect(()=>{demoMode.current=new URLSearchParams(location.search).get("demo")==="1"&&["/bag","/checkout"].includes(location.pathname);if(demoMode.current){const sample:CartItem[]=[{id:"p7",slug:"adaeze-maxi-dress",name:"Adaeze Maxi Dress",image:"/wine-maxi.webp",price:94000,color:"Wine",size:"M",quantity:1}];itemsRef.current=sample;setItems(sample);setReady(true);return}try{const stored=JSON.parse(localStorage.getItem("velmora-bag")||"[]");if(Array.isArray(stored)){const restored=stored.map((item:CartItem)=>["/cobalt-wrap.png","/wine-maxi.png","/ivory-drape.png","/forest-column.png"].includes(item.image)?{...item,image:item.image.replace(".png",".webp")}:item);itemsRef.current=restored;setItems(restored)}}catch{}setReady(true)},[]);
  function changeItems(update:(current:CartItem[])=>CartItem[]){if(demoMode.current)return;const next=update(itemsRef.current);itemsRef.current=next;try{localStorage.setItem("velmora-bag",JSON.stringify(next))}catch{}setItems(next)}
  const value=useMemo<StoreContext>(()=>({items,count:items.reduce((n,i)=>n+i.quantity,0),subtotal:items.reduce((n,i)=>n+i.price*i.quantity,0),ready,add:(p,size)=>changeItems(current=>{const index=current.findIndex(i=>i.id===p.id&&i.size===size);if(index<0)return [...current,{id:p.id,slug:p.slug,name:p.name,image:p.image,price:p.price,color:p.color,size,quantity:1}];return current.map((i,n)=>n===index?{...i,quantity:Math.min(i.quantity+1,10)}:i)}),update:(id,size,quantity)=>changeItems(current=>current.map(i=>i.id===id&&i.size===size?{...i,quantity:Math.max(1,Math.min(10,quantity))}:i)),remove:(id,size)=>changeItems(current=>current.filter(i=>i.id!==id||i.size!==size)),clear:()=>changeItems(()=>[])}),[items,ready]);
  useEffect(()=>{
    type Tool={name:string;title:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean};execute:(input:unknown)=>Promise<unknown>};
    const modelContext=(document as Document&{modelContext?:{registerTool:(tool:Tool,options:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
    if(!modelContext?.registerTool)return;
    const lifecycle=new AbortController();
    const find:Tool={name:"find_velmora_pieces",title:"Find VELMORA pieces",description:"Search the current VELMORA product collection by name, category, or colour.",inputSchema:{type:"object",properties:{query:{type:"string"}},required:["query"],additionalProperties:false},annotations:{readOnlyHint:true},async execute(input){const query=(input as {query?:unknown})?.query;if(typeof query!=="string"||query.length>80)throw Error("Enter a short search query.");const response=await fetch(`/api/products?q=${encodeURIComponent(query)}`);if(!response.ok)throw Error("Collection unavailable.");const data=await response.json() as {products:Product[]};return {products:data.products.map(p=>({id:p.id,name:p.name,price:p.price,color:p.color,slug:p.slug}))}}};
    const addTool:Tool={name:"add_velmora_piece_to_bag",title:"Add piece to bag",description:"Add one available VELMORA piece in the selected size to the current browser bag.",inputSchema:{type:"object",properties:{productId:{type:"string"},size:{type:"string",enum:["XS","S","M","L","XL"]}},required:["productId","size"],additionalProperties:false},annotations:{readOnlyHint:false},async execute(input){const {productId,size}=input as {productId?:unknown;size?:unknown};if(typeof productId!=="string"||typeof size!=="string"||!["XS","S","M","L","XL"].includes(size))throw Error("Choose a valid piece and size.");const response=await fetch("/api/products");if(!response.ok)throw Error("Collection unavailable.");const data=await response.json() as {products:Product[]};const product=data.products.find(p=>p.id===productId);if(!product||product.stock<1)throw Error("Piece unavailable.");value.add(product,size);return {added:true,productId,size}}};
    for(const tool of [find,addTool]){try{void Promise.resolve(modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{})}catch{}}
    return()=>lifecycle.abort();
  },[value]);
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useStore(){const store=useContext(Context);if(!store)throw new Error("StoreProvider missing");return store}
