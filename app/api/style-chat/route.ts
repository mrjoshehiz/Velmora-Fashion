import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { seedProducts } from "@/lib/catalog";
import { naira } from "@/lib/shared";
export const dynamic="force-dynamic";
const key=()=> (env as typeof env & {OPENAI_API_KEY?:string}).OPENAI_API_KEY;
export async function GET(){return NextResponse.json({mode:key()?"ai":"guide"})}
export async function POST(request:NextRequest){
  let message="";try{const data=await request.json() as {message?:unknown};message=String(data.message||"").trim()}catch{}
  if(!message||message.length>300)return NextResponse.json({error:"Ask a short question about the collection."},{status:400});
  const q=message.toLowerCase();
  let matches=seedProducts.filter(p=>q.includes(p.color.toLowerCase())||({Dresses:/\bdress(es)?\b/,Sets:/\b(set|co-ord|coord)s?\b/,Tops:/\b(top|shirt)s?\b/}[p.category]?.test(q))||p.name.toLowerCase().split(" ").some(word=>word.length>4&&q.includes(word)));
  if(!matches.length)matches=seedProducts.filter(p=>p.category==="Dresses").slice(0,3);
  matches=matches.slice(0,3);
  let reply="";let mode:"ai"|"guide"="guide";
  if(key()){
    try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
      const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{Authorization:`Bearer ${key()}`,"Content-Type":"application/json"},body:JSON.stringify({model:"gpt-4.1-mini",store:false,max_output_tokens:220,instructions:"You are VELMORA's concise shopping assistant. Answer only questions about the supplied product catalogue, sizing, delivery, and order-request process. Do not invent availability, fabrics, customer reviews, policies, discounts, or payment processing. Orders are requests; no online payment is taken. Recommend at most two pieces with their exact prices. If unknown, say so. Never ask for payment details. Catalogue: "+seedProducts.map(p=>`${p.name}, ${p.color}, ${p.category}, ${naira(p.price)}, ${p.description}`).join(" | "),input:message}),signal:controller.signal});clearTimeout(timer);
      if(response.ok){const result=await response.json() as {output?:Array<{content?:Array<{type:string;text?:string}>}>};reply=result.output?.flatMap(item=>item.content||[]).filter(item=>item.type==="output_text").map(item=>item.text||"").join(" ").trim()||"";if(reply)mode="ai"}
    }catch{}
  }
  if(!reply){
    if(/delivery|ship|lagos|state/i.test(message))reply="Delivery across Nigeria is available. The fee is shown at checkout: ₦3,500 in Lagos and ₦5,500 elsewhere.";
    else if(/size|fit|measure/i.test(message))reply="Sizes run from XS to XL. Open a product and select Size guide for the measurements before adding it to your bag.";
    else if(/pay|checkout|order/i.test(message))reply="Checkout records an order request. There is no online payment yet; the store would confirm the next steps.";
    else reply=`These pieces may suit what you have in mind: ${matches.map(p=>`${p.name} (${naira(p.price)})`).join(", ")}. Open one below to see the look and choose a size.`;
  }
  return NextResponse.json({reply,mode,products:matches.map(p=>({name:p.name,price:naira(p.price),slug:p.slug}))});
}
