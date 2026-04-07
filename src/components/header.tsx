"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { CartDrawer } from "@/components/cart-drawer";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "SALA", href: "/categoria/sala" },
  { label: "COMEDOR", href: "/categoria/comedor" },
  { label: "DORMITORIO", href: "/categoria/dormitorio" },
  { label: "ILUMINACION", href: "/categoria/iluminacion" },
  { label: "EXTERIOR", href: "/categoria/exterior" },
];

export function Header() {
  const { cartCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-milano-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger
                  render={
                    <Button variant="ghost" size="icon" aria-label="Menu" />
                  }
                >
                  <Menu className="size-5" />
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 px-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-3 text-sm font-medium tracking-wider text-milano-dark hover:text-milano-gold transition-colors border-b border-milano-border"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <svg
                className="size-7 text-milano-dark"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="text-base font-semibold tracking-[0.2em] text-milano-dark">
                MUEBLES MILANO
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium tracking-[0.15em] text-milano-dark hover:text-milano-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-milano-dark hover:text-milano-gold transition-colors"
                aria-label="Carrito"
              >
                <ShoppingBag className="size-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-milano-gold text-[10px] font-semibold text-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
