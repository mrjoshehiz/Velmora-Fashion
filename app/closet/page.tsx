import { allProducts,seedProducts } from "@/lib/catalog";
import { Closet } from "@/components/closet";
export const dynamic="force-dynamic";
export default async function ClosetPage(){let products=seedProducts;try{products=await allProducts()}catch{}return <Closet products={products}/>}
