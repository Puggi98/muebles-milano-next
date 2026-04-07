"use client";

import { useState } from "react";
import { ProductCard, type ProductCardData } from "@/components/product-card";

interface HomeProductsProps {
  bestSellers: ProductCardData[];
  newProducts: ProductCardData[];
}

export function HomeProducts({ bestSellers, newProducts }: HomeProductsProps) {
  const [activeTab, setActiveTab] = useState<"best" | "new">("best");

  const products = activeTab === "best" ? bestSellers : newProducts;

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center justify-center gap-8 mb-10">
        <button
          onClick={() => setActiveTab("best")}
          className={`text-xs font-semibold tracking-[0.15em] pb-2 border-b-2 transition-colors ${
            activeTab === "best"
              ? "border-milano-gold text-milano-dark"
              : "border-transparent text-milano-gray hover:text-milano-dark"
          }`}
        >
          MAS VENDIDOS
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`text-xs font-semibold tracking-[0.15em] pb-2 border-b-2 transition-colors ${
            activeTab === "new"
              ? "border-milano-gold text-milano-dark"
              : "border-transparent text-milano-gray hover:text-milano-dark"
          }`}
        >
          NUEVOS
        </button>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
