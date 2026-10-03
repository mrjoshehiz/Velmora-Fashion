import { ArrowRight } from "lucide-react";
import { type Product, naira } from "@/lib/shared";

export function DressEdit({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="dress-edit-section" aria-labelledby="dress-edit-title">
      <div className="edit-heading">
        <h2 id="dress-edit-title">The dress edit.</h2>
        <a className="editorial-link" href="/shop?category=Dresses">
          All dresses <ArrowRight size={17} />
        </a>
      </div>
      <div className="dress-edit-grid">
        {products.slice(0, 3).map(product => (
          <a className="dress-edit-piece" href={`/product/${product.slug}`} key={product.id}>
            <div className="dress-edit-image">
              <img src={product.image} alt={`${product.name} in ${product.color}`} loading="lazy" />
            </div>
            <div className="piece-caption">
              <div><h3>{product.name}</h3><span>{product.color}</span></div>
              <strong>{naira(product.price)}</strong>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
