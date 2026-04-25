import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const nav = [
  { label: "Главная", path: "/" },
  { label: "Каталог", path: "/catalog" },
  { label: "Контакты", path: "/contacts" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <Icon name="Layers" size={18} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-wider" style={{ fontFamily: 'Oswald, sans-serif' }}>
                ЯрЛавка76
              </span>
              <p className="text-xs text-primary-foreground/60 leading-none hidden sm:block">Металлоконструкции</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                  location.pathname === item.path
                    ? "text-accent border-b-2 border-accent pb-0.5"
                    : "text-primary-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск..."
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-8 w-48"
              />
              <Button type="submit" size="sm" variant="ghost" className="text-primary-foreground/80 hover:text-accent h-8 w-8 p-0">
                <Icon name="Search" size={16} />
              </Button>
            </form>

            <button
              className="md:hidden text-primary-foreground/80"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-primary-foreground/10 bg-primary">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium tracking-wide uppercase ${
                  location.pathname === item.path ? "text-accent" : "text-primary-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="flex gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск по каталогу..."
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 h-8"
              />
              <Button type="submit" size="sm" className="bg-accent hover:bg-accent/90 h-8 px-3">
                <Icon name="Search" size={14} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
