import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { products } from "@/data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Товар не найден</p>
            <Button onClick={() => navigate("/catalog")}>В каталог</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-accent">Главная</Link>
          <Icon name="ChevronRight" size={12} />
          <Link to="/catalog" className="hover:text-accent">Каталог</Link>
          <Icon name="ChevronRight" size={12} />
          <Link to={`/catalog?category=${product.categorySlug}`} className="hover:text-accent">{product.category}</Link>
          <Icon name="ChevronRight" size={12} />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image */}
          <div className="bg-muted rounded border border-border overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <Badge variant="secondary" className="mb-3">{product.category}</Badge>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.fullDescription}</p>

            <div className="bg-muted/50 border border-border rounded p-5 mb-6">
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Характеристики</h3>
              <dl className="space-y-2">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between text-sm border-b border-border last:border-0 pb-2 last:pb-0">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="font-medium text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Стоимость</p>
                <p className="text-xl font-bold text-accent">{product.price}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold flex-1">
                <Link to="/contacts">Оставить заявку</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="flex-1">
                <Link to="/contacts">
                  <Icon name="Phone" size={16} className="mr-2" />
                  Позвонить
                </Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
              <Icon name="Info" size={12} />
              Цена формируется индивидуально. Свяжитесь с нами для расчёта.
            </p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
