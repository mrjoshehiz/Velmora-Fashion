import { ArrowRight } from "lucide-react";
import { env } from "cloudflare:workers";
import { ProductCard } from "@/components/product-card";
import { DressEdit } from "@/components/dress-edit";
import { allProducts, seedProducts } from "@/lib/catalog";
import { naira } from "@/lib/shared";

export const dynamic="force-dynamic";
type HomeReview={id:string;display_name:string;rating:number;body:string;product_name:string;slug:string};
export default async function Home(){
  let products=seedProducts;
  try{products=await allProducts()}catch{}
  const dresses=products.filter(p=>p.category==="Dresses");
  const featured=products.slice(-4).reverse();
  const lead=products.find(p=>p.slug==="adaeze-maxi-dress")||dresses[0];
  const second=products.find(p=>p.slug==="zuri-wrap-dress")||dresses[1]||lead;
  const occasion=products.find(p=>p.slug==="sade-draped-midi")||dresses[2]||lead;
  let reviews:HomeReview[]=[];
  try{reviews=(await env.DB!.prepare("SELECT r.id,r.display_name,r.rating,r.body,p.name AS product_name,p.slug FROM reviews r JOIN products p ON p.id=r.product_id WHERE r.status='Approved' AND p.active=1 ORDER BY r.created_at DESC LIMIT 3").all<HomeReview>()).results}catch{}
  return <main className="storefront store-v2 editorial-store">
    <section className="store-intro" aria-labelledby="intro-title">
      <div className="store-intro-copy"><h1 id="intro-title">The new<br/><em>edit.</em></h1><p>Statement dresses and everyday pieces, chosen for the way you want to wear them.</p><div className="intro-actions"><a className="v2-button" href="/shop">Shop the collection <ArrowRight size={17}/></a><a className="v2-text-link" href="/shop?category=Dresses">Shop dresses</a></div></div>
      {lead&&<a className="store-intro-photo" href={`/product/${lead.slug}`}><img src={lead.image} alt={`${lead.name} in ${lead.color}`} fetchPriority="high"/><div className="photo-caption"><span>{lead.name}</span><strong>{naira(lead.price)}</strong></div></a>}
      {second&&<a className="store-intro-photo second" href={`/product/${second.slug}`}><img src={second.image} alt={`${second.name} in ${second.color}`} fetchPriority="high"/><div className="photo-caption"><span>{second.name}</span><strong>{naira(second.price)}</strong></div></a>}
    </section>

    <DressEdit products={dresses}/>


    <section className="store-featured" aria-labelledby="new-in-title"><div className="store-heading"><div><h2 id="new-in-title">Just in.</h2></div><a href="/shop" className="v2-text-link">See all pieces <ArrowRight size={17}/></a></div><div className="store-product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></section>

    {occasion&&<section className="v2-editorial" aria-labelledby="editorial-title"><img src={occasion.image} alt={`${occasion.name} in ${occasion.color}`} loading="lazy"/><div><h2 id="editorial-title">For the<br/><em>entrance.</em></h2><p>{occasion.name} &nbsp;·&nbsp; {naira(occasion.price)}</p><a className="v2-button" href={`/product/${occasion.slug}`}>See the dress <ArrowRight size={17}/></a></div></section>}

    {reviews.length > 0 && <section className="home-reviews" aria-labelledby="home-reviews-title">
      <div className="edit-heading"><h2 id="home-reviews-title">The pieces, in life.</h2></div>
      <div className="home-review-grid">{reviews.map(review => <article key={review.id}>
        <span aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span>
        <blockquote>“{review.body}”</blockquote><strong>{review.display_name}</strong>
        <a href={`/product/${review.slug}`}>{review.product_name} <ArrowRight size={15}/></a>
      </article>)}</div>
    </section>}
    <section className="styling-note" aria-labelledby="styling-note-title">
      <h2 id="styling-note-title">A little help finding your look.</h2>
      <p>Tell the stylist your occasion, fit, mood and budget.</p>
      <a href="/fashion-lab" className="editorial-link">Explore the Fashion Lab <ArrowRight size={17}/></a>
    </section>
  </main>
}
