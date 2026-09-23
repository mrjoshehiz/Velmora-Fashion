import { env } from "cloudflare:workers";
import { type Product } from "./shared";
export { naira, sizes } from "./shared";
export type { Product } from "./shared";

export const seedProducts: Product[] = [
  {id:"p1",slug:"sculpted-midi-dress",name:"Sculpted Midi Dress",category:"Dresses",price:68000,stock:18,color:"Indigo",description:"An asymmetric, sculpted shape with soft movement through the skirt. A confident piece for the moments that matter.",image:"/indigo.png",active:1,rank:1},
  {id:"p2",slug:"tayo-pleated-dress",name:"Tayo Pleated Dress",category:"Dresses",price:74000,stock:9,color:"Olive",description:"Fine pleats and an easy halter neckline give this dress a sense of effortless movement.",image:"/olive.png",active:1,rank:2},
  {id:"p3",slug:"linen-coord-set",name:"Linen Co-ord Set",category:"Sets",price:54000,stock:6,color:"Chalk",description:"A tailored waistcoat and fluid trousers, designed to be worn together or separately.",image:"/chalk.png",active:1,rank:3},
  {id:"p4",slug:"imani-column-dress",name:"Imani Column Dress",category:"Dresses",price:82000,stock:12,color:"Paprika",description:"A clean column silhouette with a softly draped neckline and a considered waist.",image:"/paprika.png",active:1,rank:4},
  {id:"p5",slug:"draped-shirt",name:"Draped Shirt",category:"Tops",price:38000,stock:14,color:"Paprika",description:"An easy, softly structured shirt with a considered drape and room to move.",image:"/draped-shirt.png",active:1,rank:5},
  {id:"p6",slug:"zuri-wrap-dress",name:"Zuri Wrap Dress",category:"Dresses",price:72000,stock:15,color:"Cobalt",description:"A vivid wrap silhouette with an easy shirt collar and softly tied waist. Made to take you from the city to an evening out.",image:"/cobalt-wrap.webp",active:1,rank:6},
  {id:"p7",slug:"adaeze-maxi-dress",name:"Adaeze Maxi Dress",category:"Dresses",price:94000,stock:11,color:"Wine",description:"An off-shoulder neckline and a flowing length bring quiet drama to this occasion dress.",image:"/wine-maxi.webp",active:1,rank:7},
  {id:"p8",slug:"sade-draped-midi",name:"Sade Draped Midi",category:"Dresses",price:86000,stock:13,color:"Ivory",description:"An elegant one-shoulder shape with gathered draping through the waist and a graceful midi length.",image:"/ivory-drape.webp",active:1,rank:8},
  {id:"p9",slug:"eniola-halter-dress",name:"Eniola Halter Dress",category:"Dresses",price:78000,stock:10,color:"Forest",description:"A refined halter neckline meets a fluid column silhouette in deep forest green.",image:"/forest-column.webp",active:1,rank:9},
];

export async function ensureCatalog(){
  const db=env.DB;
  if(!db) throw new Error("Store database is unavailable");
  const count=await db.prepare("SELECT COUNT(*) AS n FROM products").first<{n:number}>();
  if((count?.n??0)<seedProducts.length){
    await db.batch(seedProducts.map(p=>db.prepare("INSERT OR IGNORE INTO products (id,slug,name,category,price,stock,color,description,image,active,rank) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(p.id,p.slug,p.name,p.category,p.price,p.stock,p.color,p.description,p.image,p.active,p.rank)));
  }
  await db.prepare("UPDATE products SET image=REPLACE(image,'.png','.webp') WHERE id IN ('p6','p7','p8','p9') AND image LIKE '%.png'").run();
}
export async function allProducts(includeInactive=false):Promise<Product[]>{
  await ensureCatalog();
  const result=await env.DB!.prepare(`SELECT * FROM products ${includeInactive?"":"WHERE active=1"} ORDER BY rank,name`).all<Product>();
  return result.results;
}
export async function productBySlug(slug:string):Promise<Product|null>{
  await ensureCatalog();return await env.DB!.prepare("SELECT * FROM products WHERE slug=? AND active=1").bind(slug).first<Product>();
}
