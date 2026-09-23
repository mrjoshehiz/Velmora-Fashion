import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
export const dynamic="force-dynamic";
export async function POST(request:NextRequest){
  let input:Record<string,unknown>;
  try{input=await request.json()}catch{return NextResponse.json({error:"Check the review details and try again."},{status:400})}
  const productId=String(input.productId||"");const orderId=String(input.orderId||"").trim();const email=String(input.email||"").trim().toLowerCase();const displayName=String(input.displayName||"").trim();const body=String(input.body||"").trim();const rating=Number(input.rating);
  if(!productId||productId.length>100||orderId.length<8||orderId.length>100||email.length<5||email.length>160||displayName.length<2||displayName.length>50||body.length<15||body.length>500||!Number.isInteger(rating)||rating<1||rating>5)return NextResponse.json({error:"Complete every field, including a review of at least 15 characters."},{status:400});
  try{
    const order=await env.DB!.prepare("SELECT o.id FROM orders o JOIN order_items i ON i.order_id=o.id WHERE o.id=? AND LOWER(o.email)=? AND i.product_id=? LIMIT 1").bind(orderId,email,productId).first();
    if(!order)return NextResponse.json({error:"That order reference and email do not match this piece."},{status:400});
    await env.DB!.prepare("INSERT INTO reviews (id,product_id,order_id,display_name,rating,body,status,created_at) VALUES (?,?,?,?,?,?,?,?)").bind(crypto.randomUUID(),productId,orderId,displayName,rating,body,"Pending",new Date().toISOString()).run();
    return NextResponse.json({submitted:true,message:"Thank you. Your review will appear after moderation."});
  }catch(error){if(String(error).includes("UNIQUE"))return NextResponse.json({error:"A review for this piece has already been submitted with that order."},{status:409});return NextResponse.json({error:"Reviews are temporarily unavailable. Please try again."},{status:503})}
}
