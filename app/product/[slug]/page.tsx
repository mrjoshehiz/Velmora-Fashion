import Link from "next/link";
import { notFound } from "next/navigation";
import { env } from "cloudflare:workers";
import { allProducts, productBySlug, seedProducts } from "@/lib/catalog";
import { PurchasePanel } from "@/components/purchase-panel";
import { ProductCard } from "@/components/product-card";
import { ProductReviews, type PublicReview } from "@/components/product-reviews";
import { ProductStory } from "@/components/product-story";
export const dynamic="force-dynamic";
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;let product=null;let products=seedProducts;try{product=await productBySlug(slug);products=await allProducts()}catch{product=seedProducts.find(p=>p.slug===slug)||null}if(!product)notFound();let reviews:PublicReview[]=[];try{reviews=(await env.DB!.prepare("SELECT id,display_name,rating,body,created_at FROM reviews WHERE product_id=? AND status='Approved' ORDER BY created_at DESC LIMIT 20").bind(product.id).all<PublicReview>()).results}catch{}return <main className="product-page"><div className="breadcrumbs"><Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / {product.name}</div><div className="pdp-grid"><div className="pdp-gallery"><img src={product.image} alt={`${product.name}, full look`}/><div className="pdp-detail"><img src={product.image} alt={`${product.name}, garment detail`}/></div></div><PurchasePanel product={product}/></div><ProductStory product={product}/><ProductReviews productId={product.id} reviews={reviews}/><div className="related-heading"><h2>STYLED BY OUR FASHION TEAM</h2><Link href="/fashion-lab#studio">BUILD THE LOOK ↗</Link></div><div className="related-grid">{products.filter(p=>p.id!==product.id).slice(0,3).map(p=><ProductCard key={p.id} product={p}/>)}</div></main>}
