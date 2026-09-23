import { allProducts,seedProducts } from "@/lib/catalog";
import { CommunityGallery } from "@/components/community-gallery";
export const dynamic="force-dynamic";
export default async function Community(){let products=seedProducts;try{products=await allProducts()}catch{}return <CommunityGallery products={products}/>}
