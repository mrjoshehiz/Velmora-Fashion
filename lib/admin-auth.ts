import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { getChatGPTUser,requireChatGPTUser } from "@/app/chatgpt-auth";
function ownerEmail(){return (env as typeof env & {ADMIN_EMAIL?:string}).ADMIN_EMAIL?.trim().toLowerCase()}
export async function requireAdminPage(returnTo:string){const user=await requireChatGPTUser(returnTo);if(!ownerEmail()||user.email.toLowerCase()!==ownerEmail())notFound();return user}
export async function isAdmin(){const user=await getChatGPTUser();return !!(user&&ownerEmail()&&user.email.toLowerCase()===ownerEmail())}
