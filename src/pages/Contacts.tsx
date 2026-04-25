import { useState } from "react";
import func2url from "../../backend/func2url.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

const contactInfo = [
  { icon: "MapPin", label: "Адрес", value: "г. Ярославль, Ярославская область" },
  { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00", href: "tel:+78000000000" },
  { icon: "Mail", label: "Email", value: "info@yarlavka76.ru", href: "mailto:info@yarlavka76.ru" },
  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 8:00 – 18:00" },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(func2url.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("error");
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-muted/40 border-b border-border py-6">
        <div className="container mx-auto px-4">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-1">ЯрЛавка76</p>
          <h1 className="text-3xl font-bold">Контакты</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact info */}
          <div>
            <h2 className="text-xl font-bold mb-6">Наши контакты</h2>
            <ul className="space-y-5 mb-8">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={item.icon} size={18} className="text-accent" fallback="Info" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="bg-primary text-primary-foreground rounded p-6">
              <h3 className="font-bold text-lg mb-2">Производим на заказ</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">
                Изготавливаем нестандартные металлоконструкции по чертежам заказчика или разрабатываем проект самостоятельно. Выезд специалиста на объект — бесплатно.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-xl font-bold mb-6">Оставить заявку</h2>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded p-6 text-center">
                <Icon name="CheckCircle" size={40} className="mx-auto mb-3 text-green-600" />
                <p className="font-semibold text-green-800 text-lg mb-1">Заявка отправлена!</p>
                <p className="text-green-700 text-sm">Мы свяжемся с вами в ближайшее время.</p>
                <Button
                  className="mt-4 bg-accent hover:bg-accent/90 text-white"
                  onClick={() => setStatus("idle")}
                >
                  Отправить ещё
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">Ваше имя *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium mb-1.5 block">Телефон *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm font-medium mb-1.5 block">Сообщение</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Опишите, что вас интересует: нужный товар, размеры, количество..."
                    rows={5}
                  />
                </div>

                {status === "error" && (
                  <p className="text-destructive text-sm">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Icon name="Loader" size={16} className="mr-2 animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    "Отправить заявку"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}