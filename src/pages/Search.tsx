import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { products } from "@/data/products";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [submitted, setSubmitted] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setSubmitted(q);
  }, [searchParams]);

  const results = submitted
    ? products.filter(p =>
        p.name.toLowerCase().includes(submitted.toLowerCase()) ||
        p.description.toLowerCase().includes(submitted.toLowerCase()) ||
        p.category.toLowerCase().includes(submitted.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setSubmitted(query.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-muted/40 border-b border-border py-6">
        <div className="container mx-auto px-4">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Поиск</p>
          <h1 className="text-3xl font-bold mb-4">Поиск по каталогу</h1>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Введите название товара или категорию..."
              className="bg-card"
            />
            <Button type="submit" className="bg-accent hover:bg-accent/90 text-white px-6">
              <Icon name="Search" size={16} />
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        {submitted && (
          <p className="text-sm text-muted-foreground mb-6">
            По запросу «<span className="font-semibold text-foreground">{submitted}</span>» найдено: {results.length} позиций
          </p>
        )}

        {!submitted && (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="Search" size={40} className="mx-auto mb-3 opacity-30" />
            <p>Введите запрос для поиска товаров</p>
          </div>
        )}

        {submitted && results.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg mb-2">Ничего не найдено</p>
            <p className="text-sm">Попробуйте изменить запрос или просмотрите весь каталог</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
