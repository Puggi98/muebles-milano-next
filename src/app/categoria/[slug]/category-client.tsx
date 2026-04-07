"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { ProductCard, type ProductCardData } from "@/components/product-card";

interface SubcategoryData {
  id: string;
  name: string;
  slug: string;
  products: ProductCardData[];
}

interface CategoryClientProps {
  subcategories: SubcategoryData[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "name";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function CategoryClient({ subcategories }: CategoryClientProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");

  const allProducts = useMemo(
    () => subcategories.flatMap((s) => s.products),
    [subcategories]
  );

  const filteredProducts = useMemo(() => {
    let products =
      activeTab === "all"
        ? allProducts
        : subcategories.find((s) => s.slug === activeTab)?.products ?? [];

    if (search.trim()) {
      const q = removeAccents(search.toLowerCase());
      products = products.filter(
        (p) =>
          removeAccents(p.name.toLowerCase()).includes(q) ||
          removeAccents(p.brand.toLowerCase()).includes(q) ||
          removeAccents(p.description.toLowerCase()).includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...products].sort((a, b) => b.price - a.price);
      case "name":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [activeTab, search, sort, allProducts, subcategories]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Subcategory tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-milano-border pb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`text-xs font-semibold tracking-[0.1em] px-4 py-2 transition-colors ${
            activeTab === "all"
              ? "bg-milano-dark text-white"
              : "text-milano-gray hover:text-milano-dark"
          }`}
        >
          TODOS
        </button>
        {subcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.slug)}
            className={`text-xs font-semibold tracking-[0.1em] px-4 py-2 transition-colors ${
              activeTab === sub.slug
                ? "bg-milano-dark text-white"
                : "text-milano-gray hover:text-milano-dark"
            }`}
          >
            {sub.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Search + sort bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-milano-gray" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-10 pr-4 text-sm border border-milano-border rounded-none bg-white focus:border-milano-gold focus:outline-none transition-colors"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="h-9 px-3 text-sm border border-milano-border rounded-none bg-white focus:border-milano-gold focus:outline-none transition-colors"
        >
          <option value="default">Ordenar por</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-milano-gray mb-6">
        {filteredProducts.length} producto
        {filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-milano-gray text-sm">
            No se encontraron productos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
