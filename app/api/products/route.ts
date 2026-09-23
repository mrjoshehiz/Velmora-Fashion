import { NextRequest, NextResponse } from "next/server";
import { allProducts } from "@/lib/catalog";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
  try{
    const products=await allProducts();
    const query=(request.nextUrl.searchParams.get("q")||"").trim().toLowerCase();
    const category=request.nextUrl.searchParams.get("category");
    const color=request.nextUrl.searchParams.get("color");
    const sort=request.nextUrl.searchParams.get("sort");
    let filtered=products.filter(p=>(!category||p.category===category)&&(!color||p.color===color)&&(!query||`${p.name} ${p.category} ${p.color}`.toLowerCase().includes(query)));
    if(sort==="price-low") filtered=[...filtered].sort((a,b)=>a.price-b.price);
    if(sort==="price-high") filtered=[...filtered].sort((a,b)=>b.price-a.price);
    return NextResponse.json({products:filtered});
  }catch{return NextResponse.json({error:"The collection is temporarily unavailable."},{status:503})}
}
