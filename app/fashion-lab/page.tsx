import { allProducts, seedProducts } from "@/lib/catalog";
import { FashionLab } from "@/components/fashion-lab";

export const dynamic = "force-dynamic";

export default async function FashionLabPage(){
  let products=seedProducts;
  try{products=await allProducts()}catch{}
  return <FashionLab products={products}/>;
}
