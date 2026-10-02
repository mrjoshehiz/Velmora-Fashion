import { ArrowRight } from "lucide-react";
import { env } from "cloudflare:workers";
import { ProductCard } from "@/components/product-card";
import { DressCarousel } from "@/components/dress-carousel";
import { Reveal } from "@/components/reveal";
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
  return <main className="storefront store-v2">
    <section className="store-intro" aria-labelledby="intro-title">
      <div className="store-intro-copy"><span className="eyebrow">VELMORA / NEW IN</span><h1 id="intro-title">The new<br/><em>edit.</em></h1><p>Statement dresses and everyday pieces, chosen for the way you want to wear them.</p><div className="intro-actions"><a className="v2-button" href="/shop">Shop the collection <ArrowRight size={17}/></a><a className="v2-text-link" href="/shop?category=Dresses">Shop dresses</a></div><div className="intro-index">{String(products.length).padStart(2,"0")} PIECES <span>01 / 02</span></div></div>
      {lead&&<a className="store-intro-photo" href={`/product/${lead.slug}`}><img src={lead.image} alt={`${lead.name} in ${lead.color}`} fetchPriority="high"/><div className="photo-caption"><span>{lead.name}</span><strong>{naira(lead.price)}</strong></div></a>}
      {second&&<a className="store-intro-photo second" href={`/product/${second.slug}`}><img src={second.image} alt={`${second.name} in ${second.color}`} fetchPriority="high"/><div className="photo-caption"><span>{second.name}</span><strong>{naira(second.price)}</strong></div></a>}
    </section>

    <section className="carousel-section" aria-label="Moving dress collection"><DressCarousel products={dresses}/></section>

    <Reveal as="section" className="intelligence-entry" ariaLabelledBy="intelligence-title"><div><span className="eyebrow">VELMORA INTELLIGENCE</span><h2 id="intelligence-title">Find your perfect look.</h2><p>Tell the stylist your occasion, fit, mood and budget. Leave with a complete outfit—not another wall of filters.</p><a className="v2-button" href="/fashion-lab">Enter the Fashion Lab <ArrowRight size={17}/></a></div>{lead&&<img src={lead.image} alt={lead.name}/>}</Reveal>

    <Reveal as="section" className="store-featured" ariaLabelledBy="new-in-title"><div className="store-heading"><div><span className="eyebrow">NEW ARRIVALS</span><h2 id="new-in-title">Just in.</h2></div><a href="/shop" className="v2-text-link">See all pieces <ArrowRight size={17}/></a></div><div className="store-product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></Reveal>

    {occasion&&<Reveal as="section" className="v2-editorial" ariaLabelledBy="editorial-title"><img src={occasion.image} alt={`${occasion.name} in ${occasion.color}`} loading="lazy"/><div><span className="eyebrow">THE OCCASION EDIT</span><h2 id="editorial-title">For the<br/><em>entrance.</em></h2><p>{occasion.name} &nbsp;·&nbsp; {naira(occasion.price)}</p><a className="v2-button" href={`/product/${occasion.slug}`}>See the dress <ArrowRight size={17}/></a></div></Reveal>}

    <Reveal as="section" className="store-all" ariaLabelledBy="all-title"><div className="store-heading"><div><span className="eyebrow">THE COLLECTION</span><h2 id="all-title">All pieces.</h2></div><a href="/shop" className="v2-text-link">Filter & sort <ArrowRight size={17}/></a></div><div className="store-product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></Reveal>
    <Reveal as="section" id="testimonials" className="home-reviews" ariaLabelledBy="home-reviews-title"><div className="home-reviews-heading"><div><span className="eyebrow">{reviews.length?"CUSTOMER REVIEWS":"TESTIMONIALS"}</span><h2 id="home-reviews-title">The pieces, in life.</h2></div><span className="review-count">{reviews.length?`${reviews.length} CUSTOMER NOTES`:"PORTFOLIO CONCEPT"}</span></div><div className="home-review-grid">{reviews.length?reviews.map(review=><article key={review.id}><span aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(review.rating)}{"☆".repeat(5-review.rating)}</span><blockquote>“{review.body}”</blockquote><strong>{review.display_name}</strong><a href={`/product/${review.slug}`}>{review.product_name} <ArrowRight size={15}/></a></article>):[
      {name:"Ada O.",piece:"Adaeze Maxi Dress",quote:"A dress that makes getting ready feel like the best part of the evening."},
      {name:"Teni B.",piece:"Zuri Wrap Dress",quote:"The colour does all the talking. I would wear this from lunch straight into the night."},
      {name:"Maya I.",piece:"Sade Draped Midi",quote:"The drape feels special without needing anything extra."}
    ].map((note,index)=><article key={note.name}><span className="review-number">0{index+1} / 03</span><blockquote>“{note.quote}”</blockquote><strong>{note.name}</strong><span className="review-piece">{note.piece}</span></article>)}</div>{!reviews.length&&<p className="review-disclosure">Illustrative testimonials for this portfolio concept. Verified customer reviews will replace them when available.</p>}</Reveal>
  </main>
}
