"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Carrito</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-milano-gray">
            <ShoppingBag className="size-16 stroke-1" />
            <p className="text-sm">Tu carrito esta vacio</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col overflow-y-auto px-4 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b border-milano-border pb-4"
              >
                <div className="relative size-20 shrink-0 overflow-hidden rounded bg-milano-light">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-milano-gray">
                      {item.brand}
                    </p>
                    <p className="text-sm font-medium text-milano-dark truncate">
                      {item.name}
                    </p>
                    <p className="text-sm font-semibold text-milano-gold">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="flex size-6 items-center justify-center rounded border border-milano-border text-milano-dark hover:bg-milano-light transition-colors"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="flex size-6 items-center justify-center rounded border border-milano-border text-milano-dark hover:bg-milano-light transition-colors"
                    >
                      <Plus className="size-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-milano-gray hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="border-t border-milano-border">
            <div className="flex items-center justify-between w-full mb-3">
              <span className="text-sm text-milano-gray">Subtotal</span>
              <span className="text-lg font-semibold text-milano-dark">
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <a
              href={`https://wa.me/59165302103?text=${encodeURIComponent(
                "Hola, me gustaria hacer un pedido:\n" +
                  items
                    .map(
                      (i) =>
                        `- ${i.name} (x${i.quantity}) $${(i.price * i.quantity).toLocaleString()}`
                    )
                    .join("\n") +
                  `\n\nTotal: $${cartTotal.toLocaleString()}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center h-11 rounded-none bg-milano-gold text-white text-sm font-semibold tracking-wider hover:bg-milano-gold-hover transition-colors"
            >
              FINALIZAR PEDIDO POR WHATSAPP
            </a>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
