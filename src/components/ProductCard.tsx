import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-card border border-border rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group-hover:border-accent/40">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <Badge variant="secondary" className="text-xs mb-2 font-normal">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-sm leading-tight mb-1 group-hover:text-accent transition-colors line-clamp-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {product.name}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{product.price}</span>
            <span className="text-xs text-accent flex items-center gap-1 font-medium">
              Подробнее <Icon name="ArrowRight" size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
