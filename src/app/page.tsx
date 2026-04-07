import Image from "next/image";
import Link from "next/link";
import { Truck, Shield, MessageCircle, RefreshCw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { HomeProducts } from "@/components/home-products";
import type { ProductCardData } from "@/components/product-card";

export default async function Home() {
  const [categories, bestSellers, newProducts, settings] = await Promise.all([
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { subcategories: { orderBy: { order: "asc" } } },
    }),
    prisma.product.findMany({
      where: { badge: { contains: "VENDIDO" } },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.findMany({
      where: { badge: "NUEVO" },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.siteSetting.findMany(),
  ]);

  const setting = (key: string) =>
    settings.find((s) => s.key === key)?.value ?? "";

  const heroImg = setting("heroImg");
  const heroPromoLabel = setting("heroPromoLabel");
  const heroPromoSub = setting("heroPromoSub");
  const promoBannerLabel = setting("promoBannerLabel");
  const promoBannerTitle = setting("promoBannerTitle");
  const promoBannerDesc = setting("promoBannerDesc");

  // If we don't have enough best sellers, fill with random products
  let bestSellerCards: ProductCardData[] = bestSellers.map((p) => ({
    id: p.id,
    brand: p.brand,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    badge: p.badge,
    stock: p.stock,
  }));

  if (bestSellerCards.length < 4) {
    const extra = await prisma.product.findMany({
      take: 8 - bestSellerCards.length,
      orderBy: { price: "desc" },
    });
    bestSellerCards = [
      ...bestSellerCards,
      ...extra
        .filter((p) => !bestSellerCards.some((b) => b.id === p.id))
        .map((p) => ({
          id: p.id,
          brand: p.brand,
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.image,
          badge: p.badge,
          stock: p.stock,
        })),
    ].slice(0, 8);
  }

  const newCards: ProductCardData[] = newProducts.map((p) => ({
    id: p.id,
    brand: p.brand,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.image,
    badge: p.badge,
    stock: p.stock,
  }));

  const marqueeText =
    "ENVIO GRATIS EN PEDIDOS +$2000  ·  ATENCION PERSONALIZADA  ·  CALIDAD PREMIUM GARANTIZADA  ·  NUEVAS COLECCIONES CADA TEMPORADA  ·  ";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImg || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&auto=format&fit=crop&q=80"}
          alt="Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <span className="inline-block text-[10px] font-semibold tracking-[0.3em] text-milano-gold bg-white/10 backdrop-blur-sm px-4 py-2 mb-6">
            {heroPromoLabel || "COLECCION 2026"}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-6 max-w-3xl mx-auto">
            {heroPromoSub || "Diseno que transforma tu hogar"}
          </h1>
          <Link
            href="/categoria/sala"
            className="inline-flex items-center justify-center border border-white text-white text-xs font-semibold tracking-[0.2em] px-8 py-3.5 hover:bg-white hover:text-milano-dark transition-colors"
          >
            EXPLORAR COLECCION
          </Link>
        </div>
      </section>

      {/* ── Marquee Ticker ── */}
      <div className="bg-milano-dark py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="text-[11px] tracking-[0.2em] text-milano-gold font-medium mx-0"
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Categories ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-milano-gold">
            CATEGORIAS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-milano-dark mt-2">
            Explora Nuestras Colecciones
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden bg-milano-light"
            >
              <Image
                src={
                  cat.heroImg ||
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80"
                }
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
                <h3 className="text-white text-sm font-semibold tracking-[0.2em]">
                  {cat.name.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Asymmetric Banners ── */}
      {categories.length >= 3 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px]">
            <Link
              href={`/categoria/${categories[0].slug}`}
              className="group relative overflow-hidden aspect-[4/5] md:aspect-auto bg-milano-light"
            >
              <Image
                src={categories[0].heroImg || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80"}
                alt={categories[0].name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <span className="text-[10px] tracking-[0.2em] text-milano-gold font-medium">
                  COLECCION
                </span>
                <h3 className="text-white font-serif text-2xl mt-1">
                  {categories[0].name}
                </h3>
              </div>
            </Link>
            <div className="flex flex-col gap-4">
              {categories.slice(1, 3).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categoria/${cat.slug}`}
                  className="group relative flex-1 overflow-hidden aspect-[4/3] md:aspect-auto bg-milano-light"
                >
                  <Image
                    src={cat.heroImg || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop&q=80"}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />
                  <div className="absolute bottom-6 left-6">
                    <span className="text-[10px] tracking-[0.2em] text-milano-gold font-medium">
                      COLECCION
                    </span>
                    <h3 className="text-white font-serif text-xl mt-1">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Product Showcase ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-milano-gold">
            PRODUCTOS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-milano-dark mt-2">
            Seleccion Destacada
          </h2>
        </div>
        <HomeProducts bestSellers={bestSellerCards} newProducts={newCards} />
      </section>

      {/* ── Promo Banner ── */}
      <section className="bg-milano-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <span className="inline-block text-[10px] font-semibold tracking-[0.3em] text-milano-gold mb-4">
            {promoBannerLabel || "COLECCION EXCLUSIVA"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white mb-5 leading-tight">
            {promoBannerTitle || "DISENO SIN COMPROMISO"}
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
            {promoBannerDesc ||
              "Cada pieza seleccionada para elevar tu espacio. Calidad artesanal, diseno intemporal."}
          </p>
          <Link
            href="/categoria/sala"
            className="inline-flex items-center justify-center border border-white/40 text-white text-xs font-semibold tracking-[0.2em] px-8 py-3.5 hover:bg-white hover:text-milano-dark transition-colors"
          >
            VER COLECCION
          </Link>
        </div>
      </section>

      {/* ── Benefits Bar ── */}
      <section className="border-t border-milano-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Envio Gratis",
                desc: "En pedidos mayores a $2,000",
              },
              {
                icon: Shield,
                title: "Garantia Premium",
                desc: "2 anos de garantia en todo",
              },
              {
                icon: MessageCircle,
                title: "Atencion Personalizada",
                desc: "Asesoria por WhatsApp",
              },
              {
                icon: RefreshCw,
                title: "Devolucion Facil",
                desc: "30 dias para cambios",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="flex flex-col items-center text-center gap-3">
                <benefit.icon className="size-7 text-milano-gold stroke-[1.5]" />
                <div>
                  <p className="text-sm font-semibold text-milano-dark">
                    {benefit.title}
                  </p>
                  <p className="text-xs text-milano-gray mt-0.5">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
