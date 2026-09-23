import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { isAdmin } from "@/lib/admin-auth";
export const dynamic="force-dynamic";
export async function GET(){if(!await isAdmin())return NextResponse.json({error:"Admin access required."},{status:403});try{const rows=await env.DB!.prepare("SELECT * FROM orders ORDER BY created_at DESC LIMIT 100").all();return NextResponse.json({orders:rows.results})}catch{return NextResponse.json({error:"Orders unavailable."},{status:503})}}
export async function PATCH(request:NextRequest){if(!await isAdmin())return NextResponse.json({error:"Admin access required."},{status:403});const {id,status}=await request.json() as {id:string;status:string};if(typeof id!=="string"||!["Requested","Processing","Dispatched","Completed","Cancelled"].includes(status))return NextResponse.json({error:"Invalid status."},{status:400});const result=await env.DB!.prepare("UPDATE orders SET status=? WHERE id=?").bind(status,id).run();return NextResponse.json({updated:result.meta.changes>0})}
