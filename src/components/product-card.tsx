"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export interface ProductCardData {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  stock: number;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const { addToCart } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <div
      className={`group relative flex flex-col ${outOfStock ? "opacity-45" : ""}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-milano-light">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badge */}
        {product.badge && !outOfStock && (
          <span className="absolute top-3 left-3 bg-milano-gold text-white text-[10px] font-semibold tracking-wider px-2.5 py-1">
            {product.badge}
          </span>
        )}
        {outOfStock && (
          <span className="absolute top-3 left-3 bg-milano-gray text-white text-[10px] font-semibold tracking-wider px-2.5 py-1">
            AGOTADO
          </span>
        )}
        {/* Add to cart overlay */}
        {!outOfStock && (
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
              })
            }
            className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-milano-dark/90 py-3 text-white text-xs font-semibold tracking-wider opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
          >
            <ShoppingBag className="size-3.5" />
            AGREGAR AL CARRITO
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 pt-4">
        <p className="text-[10px] uppercase tracking-[0.15em] text-milano-gray">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-milano-dark leading-snug">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-milano-gray line-clamp-1">
            {product.description}
          </p>
        )}
        <p className="text-sm font-semibold text-milano-dark mt-1">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
