import { env } from "cloudflare:workers";
import { requireAdminPage } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin-shell";
import { AdminOrders } from "@/components/admin-table";
export const dynamic="force-dynamic";
export default async function AdminOrdersPage(){await requireAdminPage("/admin/orders");let orders:never[]=[];try{orders=(await env.DB!.prepare("SELECT id,full_name,email,created_at,state,total,status FROM orders ORDER BY created_at DESC LIMIT 100").all()).results as never[]}catch{}return <AdminShell active="orders"><AdminOrders initial={orders}/></AdminShell>}
