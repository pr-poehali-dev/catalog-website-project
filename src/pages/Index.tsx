import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/ui/icon";
import { products, categories } from "@/data/products";

const advantages = [
  { icon: "Award", title: "Собственное производство", desc: "Изготавливаем все изделия на собственном оборудовании без посредников" },
  { icon: "Wrench", title: "Индивидуальные заказы", desc: "Разработаем и изготовим металлоконструкцию по вашим размерам и чертежам" },
  { icon: "Shield", title: "Гарантия качества", desc: "Используем металлопрокат от проверенных поставщиков, даём гарантию на все изделия" },
  { icon: "Truck", title: "Доставка и монтаж", desc: "Осуществляем доставку и профессиональный монтаж конструкций на объекте" },
];

export default function Index() {
  const featured = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-semibold uppercase tracking-widest mb-3">г. Ярославль</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Металлоконструкции для благоустройства территорий
            </h1>
            <p className="text-primary-foreground/70 text-lg mb-8 leading-relaxed">
              Производим урны, мангальные зоны, ограждения, лавки, качели и остановочные комплексы. Собственное производство — точно в срок.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold">
                <Link to="/catalog">Перейти в каталог</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                <Link to="/contacts">Оставить заявку</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-muted/50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.filter(c => c.slug !== "all").map((cat) => (
              <Link
                key={cat.slug}
                to={`/catalog?category=${cat.slug}`}
                className="px-4 py-2 text-sm font-medium border border-border bg-card hover:border-accent hover:text-accent transition-colors rounded"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Ассортимент</p>
              <h2 className="text-3xl font-bold">Популярные позиции</h2>
            </div>
            <Link to="/catalog" className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
              Весь каталог <Icon name="ArrowRight" size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-14 bg-muted/40 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">Почему мы</p>
            <h2 className="text-3xl font-bold">Преимущества ЯрЛавка76</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
              <div key={a.icon} className="bg-card border border-border rounded p-5">
                <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center mb-4">
                  <Icon name={a.icon} size={20} className="text-accent" fallback="Award" />
                </div>
                <h3 className="font-semibold text-sm mb-2">{a.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Нужна нестандартная конструкция?</h2>
          <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">
            Изготовим по вашим чертежам или разработаем проект с нуля. Свяжитесь с нами для расчёта стоимости.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold">
            <Link to="/contacts">Получить консультацию</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}