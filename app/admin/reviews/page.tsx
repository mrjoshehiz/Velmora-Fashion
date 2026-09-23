import { env } from "cloudflare:workers";
import { requireAdminPage } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin-shell";
import { AdminReviews, type ReviewRow } from "@/components/admin-reviews";
export const dynamic="force-dynamic";
export default async function ReviewsAdmin(){await requireAdminPage("/admin/reviews");let reviews:ReviewRow[]=[];try{reviews=(await env.DB!.prepare("SELECT r.id,r.display_name,r.rating,r.body,r.status,r.created_at,p.name AS product_name FROM reviews r JOIN products p ON p.id=r.product_id ORDER BY r.created_at DESC LIMIT 100").all<ReviewRow>()).results}catch{}return <AdminShell active="reviews"><AdminReviews initial={reviews}/></AdminShell>}
