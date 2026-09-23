import { NextRequest, NextResponse } from "next/server";
import { env } from "cloudflare:workers";
import { isAdmin } from "@/lib/admin-auth";
export const dynamic="force-dynamic";
export async function PATCH(request:NextRequest){if(!await isAdmin())return NextResponse.json({error:"Admin access required."},{status:403});const {id,status}=await request.json() as {id?:unknown;status?:unknown};if(typeof id!=="string"||!['Approved','Rejected'].includes(String(status)))return NextResponse.json({error:"Invalid review status."},{status:400});try{const result=await env.DB!.prepare("UPDATE reviews SET status=? WHERE id=?").bind(status,id).run();return NextResponse.json({updated:result.meta.changes>0})}catch{return NextResponse.json({error:"Could not update the review."},{status:503})}}
