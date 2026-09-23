import { requireAdminPage } from "@/lib/admin-auth";
import { allProducts, seedProducts } from "@/lib/catalog";
import { AdminShell } from "@/components/admin-shell";
import { AdminProducts } from "@/components/admin-table";
export const dynamic="force-dynamic";
export default async function AdminProductsPage(){await requireAdminPage("/admin/products");let products=seedProducts;try{products=await allProducts(true)}catch{}return <AdminShell active="products"><AdminProducts initial={products}/></AdminShell>}
