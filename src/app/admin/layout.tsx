"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Sala de Estar", slug: "sala-de-estar" },
  { name: "Comedor", slug: "comedor" },
  { name: "Dormitorio", slug: "dormitorio" },
  { name: "Iluminación", slug: "iluminacion" },
  { name: "Exterior", slug: "exterior" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f6f3] font-sans">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-[#e8e8e5] flex items-center justify-between px-6">
        <span className="text-sm font-bold tracking-[0.15em] text-[#232323]">
          MUEBLES MILANO ADMIN
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="px-4 py-1.5 text-xs font-semibold tracking-wider border border-[#e8e8e5] rounded text-[#232323] hover:bg-[#f7f6f3] transition-colors"
          >
            VER SITIO
          </Link>
        </div>
      </header>

      <div className="flex pt-14">
        {/* Sidebar */}
        <aside className="fixed top-14 left-0 bottom-0 w-60 bg-white border-r border-[#e8e8e5] flex flex-col overflow-y-auto">
          <nav className="flex-1 py-6">
            {/* CONTENIDO section */}
            <div className="px-5 mb-6">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#828282] mb-2">
                CONTENIDO
              </p>
              <Link
                href="/admin"
                className={cn(
                  "block px-3 py-2 text-sm rounded transition-colors",
                  pathname === "/admin"
                    ? "bg-[#f5f0e8] text-[#c9a96e] border-l-2 border-[#c9a96e] font-medium"
                    : "text-[#232323] hover:bg-[#f7f6f3]"
                )}
              >
                Textos Generales
              </Link>
            </div>

            {/* CATEGORIAS section */}
            <div className="px-5">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#828282] mb-2">
                CATEGORÍAS
              </p>
              <div className="space-y-0.5">
                {categories.map((cat) => {
                  const href = `/admin/categoria/${cat.slug}`;
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={cat.slug}
                      href={href}
                      className={cn(
                        "block px-3 py-2 text-sm rounded transition-colors",
                        isActive
                          ? "bg-[#f5f0e8] text-[#c9a96e] border-l-2 border-[#c9a96e] font-medium"
                          : "text-[#232323] hover:bg-[#f7f6f3]"
                      )}
                    >
                      {cat.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="px-5 py-4 border-t border-[#e8e8e5]">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#828282] hover:text-[#c9a96e] transition-colors"
            >
              Ver sitio &rarr;
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-60 flex-1 min-h-[calc(100vh-3.5rem)] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
