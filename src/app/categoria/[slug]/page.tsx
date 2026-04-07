import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CategoryClient } from "./category-client";
import type { ProductCardData } from "@/components/product-card";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Categoria no encontrada" };
  return {
    title: `${category.name} | Muebles Milano`,
    description: `Explora nuestra coleccion de ${category.name.toLowerCase()}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      subcategories: {
        orderBy: { order: "asc" },
        include: {
          products: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!category) notFound();

  const subcategories = category.subcategories.map((sub) => ({
    id: sub.id,
    name: sub.name,
    slug: sub.slug,
    products: sub.products.map(
      (p): ProductCardData => ({
        id: p.id,
        brand: p.brand,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        badge: p.badge,
        stock: p.stock,
      })
    ),
  }));

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-64 sm:h-80 flex items-center justify-center overflow-hidden">
        <Image
          src={
            category.heroImg ||
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&auto=format&fit=crop&q=80"
          }
          alt={category.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white">
          <span className="text-[10px] font-semibold tracking-[0.3em] text-milano-gold">
            COLECCION
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light mt-2">
            {category.name}
          </h1>
        </div>
      </section>

      <CategoryClient subcategories={subcategories} />
    </>
  );
}
