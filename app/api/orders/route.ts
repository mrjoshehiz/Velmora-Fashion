import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { ensureCatalog, sizes } from "@/lib/catalog";
export const dynamic="force-dynamic";
type Item={id:string;size:string;quantity:number};
export async function POST(request:NextRequest){
  try{
    const body=await request.json() as Record<string,unknown>;
    const email=String(body.email||"").trim().toLowerCase();
    const fullName=String(body.fullName||"").trim();const phone=String(body.phone||"").trim();
    const address=String(body.address||"").trim();const city=String(body.city||"").trim();const state=String(body.state||"").trim();
    const items=body.items as Item[];
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||[fullName,phone,address,city,state].some(v=>v.length<2||v.length>160)||!Array.isArray(items)||items.length<1||items.length>20){return NextResponse.json({error:"Please check your delivery details and bag."},{status:400})}
    if(items.some(i=>typeof i.id!=="string"||!sizes.includes(i.size as typeof sizes[number])||!Number.isInteger(i.quantity)||i.quantity<1||i.quantity>10)||new Set(items.map(i=>i.id+":"+i.size)).size!==items.length){return NextResponse.json({error:"Please check the sizes and quantities in your bag."},{status:400})}
    await ensureCatalog();const db=env.DB!;
    const found=await Promise.all(items.map(i=>db.prepare("SELECT id,name,image,price,stock,active FROM products WHERE id=?").bind(i.id).first<{id:string;name:string;image:string;price:number;stock:number;active:number}>()));
    if(found.some((p,index)=>!p||!p.active||p.stock<items[index].quantity)){return NextResponse.json({error:"One of your pieces is no longer available in that quantity."},{status:409})}
    const subtotal=items.reduce((sum,i,index)=>sum+found[index]!.price*i.quantity,0);
    const deliveryFee=state.toLowerCase()==="lagos"?3500:5500;
    const id="VM-"+crypto.randomUUID().slice(0,8).toUpperCase();const user=await getChatGPTUser();
    const statements=[db.prepare("INSERT INTO orders (id,user_id,email,full_name,phone,address,city,state,subtotal,delivery_fee,total,status,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,user?.userId||null,email,fullName,phone,address,city,state,subtotal,deliveryFee,subtotal+deliveryFee,"Requested",new Date().toISOString()),...items.map((i,index)=>db.prepare("INSERT INTO order_items (order_id,product_id,name,image,size,price,quantity) VALUES (?,?,?,?,?,?,?)").bind(id,i.id,found[index]!.name,found[index]!.image,i.size,found[index]!.price,i.quantity)),...items.map(i=>db.prepare("UPDATE products SET stock=stock-? WHERE id=? AND stock>=?").bind(i.quantity,i.id,i.quantity))];
    await db.batch(statements);
    return NextResponse.json({id,total:subtotal+deliveryFee,status:"Requested"},{status:201});
  }catch{return NextResponse.json({error:"We could not place your order. Please try again."},{status:500})}
}
export async function GET(){
  const user=await getChatGPTUser();if(!user)return NextResponse.json({error:"Sign in to view orders."},{status:401});
  try{const orders=await env.DB!.prepare("SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 50").bind(user.userId).all();return NextResponse.json({orders:orders.results})}catch{return NextResponse.json({error:"Orders are unavailable."},{status:503})}
}
