import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    setActiveCategory(cat);
  }, [searchParams]);

  const filtered = activeCategory === "all"
    ? products
    : products.filter(p => p.categorySlug === activeCategory);

  const handleCategory = (slug: string) => {
    setActiveCategory(slug);
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-muted/40 border-b border-border py-6">
        <div className="container mx-auto px-4">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">ЯрЛавка76</p>
          <h1 className="text-3xl font-bold">Каталог металлоконструкций</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-52 flex-shrink-0">
            <h3 className="font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-3">Категории</h3>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => handleCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-accent text-white font-medium"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mobile categories */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-6 md:hidden">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategory(cat.slug)}
                  className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-accent text-white border-accent"
                      : "border-border hover:border-accent hover:text-accent"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-muted-foreground">
                Найдено: <span className="font-semibold text-foreground">{filtered.length}</span> позиций
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">Товары не найдены</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
