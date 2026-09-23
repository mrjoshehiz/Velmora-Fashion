import { allProducts, seedProducts } from "@/lib/catalog";
import { ShopClient } from "@/components/shop-client";
export const dynamic="force-dynamic";
export default async function Shop({searchParams}:{searchParams:Promise<{category?:string}>}){const {category}=await searchParams;let products=seedProducts;try{products=await allProducts()}catch{}return <ShopClient products={products} initialCategory={["Dresses","Sets","Tops"].includes(category||"")?category:"All"}/>}
