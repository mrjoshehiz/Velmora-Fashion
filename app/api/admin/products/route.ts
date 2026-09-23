import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { isAdmin } from "@/lib/admin-auth";
import { allProducts } from "@/lib/catalog";
export const dynamic="force-dynamic";
export async function GET(){if(!await isAdmin())return NextResponse.json({error:"Admin access required."},{status:403});try{return NextResponse.json({products:await allProducts(true)})}catch{return NextResponse.json({error:"Catalog unavailable."},{status:503})}}
export async function PATCH(request:NextRequest){if(!await isAdmin())return NextResponse.json({error:"Admin access required."},{status:403});const {id,stock,active,price}=await request.json() as {id:string;stock:number;active:number;price:number};if(typeof id!=="string"||!Number.isInteger(stock)||stock<0||stock>100000||![0,1].includes(active)||!Number.isInteger(price)||price<1000||price>10000000)return NextResponse.json({error:"Invalid product values."},{status:400});const result=await env.DB!.prepare("UPDATE products SET stock=?,active=?,price=? WHERE id=?").bind(stock,active,price,id).run();return NextResponse.json({updated:result.meta.changes>0})}
