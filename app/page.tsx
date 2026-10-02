import { env } from "cloudflare:workers";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { CollectionStory } from "@/components/collection-story";
import { allProducts, seedProducts } from "@/lib/catalog";
import { naira } from "@/lib/shared";
export const dynamic="force-dynamic";
type HomeReview={id:string;display_name:string;rating:number;body:string;product_name:string;slug:string};
export default async function Home(){
 let products=seedProducts;try{products=await allProducts()}catch{}
 const lead=products.find(p=>p.slug==='adaeze-maxi-dress')||products[0];
 const blue=products.find(p=>p.slug==='zuri-wrap-dress')||products[1]||lead;
 const ivory=products.find(p=>p.slug==='sade-draped-midi')||products[2]||lead;
 const featured=products.slice(-4).reverse();
 let reviews:HomeReview[]=[];try{reviews=(await env.DB!.prepare("SELECT r.id,r.display_name,r.rating,r.body,p.name AS product_name,p.slug FROM reviews r JOIN products p ON p.id=r.product_id WHERE r.status='Approved' AND p.active=1 ORDER BY r.created_at DESC LIMIT 3").all<HomeReview>()).results}catch{}
 return <main className="atelier-home">
 <section className="atelier-hero" aria-labelledby="hero-title"><div className="hero-side"><span className="eyebrow">CONTEMPORARY WOMENSWEAR</span><span className="vertical-note">THE VELMORA EDIT</span><span className="hero-issue">01 / COLLECTION</span></div><div className="atelier-hero-image">{lead&&<img src={lead.image} alt={`${lead.name}, an off-shoulder dress in wine`} fetchPriority="high"/>}<div className="hero-image-label"><span>THE OCCASION EDIT</span>{lead&&<a href={`/product/${lead.slug}`}>{lead.name} · {naira(lead.price)}</a>}</div></div><div className="atelier-hero-copy"><span className="eyebrow">DRESS FOR YOURSELF.</span><h1 id="hero-title">Make<br/>your <em>own</em><br/>entrance.</h1><p>Considered shapes. Expressive colour.<br/>Pieces you’ll reach for, again.</p><a className="atelier-button" href="/shop">Discover the collection</a><a className="hero-mini" href={blue?`/product/${blue.slug}`:'/shop'}>{blue&&<img src={blue.image} alt={blue.name}/>}<span>AN EVERYDAY STATEMENT<br/><strong>The cobalt edit</strong></span></a></div></section>
 <div className="atelier-ribbon"><span>YOUR OWN KIND OF PRESENCE</span><span>COLOUR WITH CONFIDENCE</span><span>VELMORA WOMENSWEAR</span></div>
 <Reveal as="section" className="atelier-arrivals" ariaLabelledBy="arrivals-title"><div className="atelier-heading"><div><span className="eyebrow">01 / THE NEW EDIT</span><h2 id="arrivals-title">Good things.<br/><em>Just arrived.</em></h2></div><div><p>A new perspective on getting dressed.</p><a className="atelier-link" href="/shop">Shop new arrivals</a></div></div><div className="store-product-grid">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div></Reveal>
 <CollectionStory products={[lead,blue,ivory].filter(Boolean)}/>
 <Reveal as="section" className="atelier-lab" ariaLabelledBy="lab-title"><div className="lab-colour" aria-hidden="true"><span>V</span><span className="lab-orbit">VELMORA / FASHION LAB</span></div><div className="lab-copy"><span className="eyebrow">A DIFFERENT WAY TO FIND YOUR STYLE</span><h2 id="lab-title">Less searching.<br/><em>More you.</em></h2><p>An occasion in mind? A colour you love? Tell our stylist what you’re looking for and explore pieces from the collection.</p><a className="atelier-button" href="/fashion-lab">Meet your stylist</a><div className="lab-options"><a href="/fashion-lab#try-on">Virtual try-on</a><a href="/fashion-lab#studio">Outfit studio</a><a href="/closet">Your closet</a></div></div></Reveal>
 <Reveal as="section" className="atelier-collection" ariaLabelledBy="collection-title"><div className="atelier-heading"><div><span className="eyebrow">02 / FIND YOUR PIECE</span><h2 id="collection-title">The collection.</h2></div><a className="atelier-link" href="/shop">Explore & filter</a></div><div className="store-product-grid">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div></Reveal>
 {reviews.length>0&&<Reveal as="section" className="home-reviews" ariaLabelledBy="reviews-title"><span className="eyebrow">CUSTOMER NOTES</span><h2 id="reviews-title">Worn. Loved.</h2><div className="home-review-grid">{reviews.map(r=><article key={r.id}><span aria-label={`${r.rating} out of 5 stars`}>{'★'.repeat(r.rating)}</span><blockquote>“{r.body}”</blockquote><strong>{r.display_name}</strong><a href={`/product/${r.slug}`}>{r.product_name}</a></article>)}</div></Reveal>}
 <Reveal as="section" className="atelier-note"><span className="eyebrow">THE WORLD OF VELMORA</span><h2>Style is personal.<br/><em>Keep it that way.</em></h2><div><a className="atelier-link" href="/journal">Read the journal</a><a className="atelier-link" href="/fashion-show">See the runway</a><a className="atelier-link" href="/about">Our story</a></div></Reveal>
 </main>
}
