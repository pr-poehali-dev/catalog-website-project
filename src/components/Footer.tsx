import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-accent rounded flex items-center justify-center">
                <Icon name="Layers" size={14} className="text-white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>ЯрЛавка76</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Производство металлоконструкций для благоустройства территорий. Работаем в Ярославле и области.
            </p>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wide text-sm mb-3">Навигация</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-accent transition-colors">Главная</Link></li>
              <li><Link to="/catalog" className="hover:text-accent transition-colors">Каталог</Link></li>
              <li><Link to="/contacts" className="hover:text-accent transition-colors">Контакты</Link></li>
              <li><Link to="/search" className="hover:text-accent transition-colors">Поиск</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold uppercase tracking-wide text-sm mb-3">Контакты</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={14} className="text-accent flex-shrink-0" />
                г. Ярославль, Ярославская обл.
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={14} className="text-accent flex-shrink-0" />
                <a href="tel:+78000000000" className="hover:text-accent transition-colors">+7 (800) 000-00-00</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={14} className="text-accent flex-shrink-0" />
                <a href="mailto:info@yarlavka76.ru" className="hover:text-accent transition-colors">info@yarlavka76.ru</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-primary-foreground/40 text-xs">© 2024 ЯрЛавка76. Все права защищены.</p>
          <p className="text-primary-foreground/40 text-xs">Производство металлоконструкций по индивидуальным заказам</p>
        </div>
      </div>
    </footer>
  );
}
