import { allProducts, seedProducts } from "@/lib/catalog";
import { ShopClient } from "@/components/shop-client";
export const dynamic="force-dynamic";
export default async function Search(){let products=seedProducts;try{products=await allProducts()}catch{}return <ShopClient products={products} searchPage/>}
