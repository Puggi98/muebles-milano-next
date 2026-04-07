"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge: string;
  stock: number;
  subcategoryId: string;
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  homeImg: string;
  products: Product[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  heroImg: string;
  subcategories: Subcategory[];
}

const emptyProduct: Omit<Product, "id" | "subcategoryId"> = {
  brand: "",
  name: "",
  description: "",
  price: 0,
  image: "",
  badge: "",
  stock: 0,
};

const badgeOptions = [
  { value: "", label: "Sin badge" },
  { value: "Nuevo", label: "Nuevo" },
  { value: "Oferta", label: "Oferta" },
  { value: "Popular", label: "Popular" },
  { value: "Exclusivo", label: "Exclusivo" },
  { value: "Agotado", label: "Agotado" },
];

export function CategoryAdminClient({ category: initial }: { category: Category }) {
  const [category, setCategory] = useState(initial);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    initial.subcategories.forEach((s) => (map[s.id] = true));
    return map;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string>("");
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateHeroImg = useCallback(
    async (heroImg: string) => {
      try {
        const res = await fetch(`/api/admin/categories/${category.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ heroImg }),
        });
        if (!res.ok) throw new Error();
        setCategory((prev) => ({ ...prev, heroImg }));
        showToast("Imagen hero actualizada");
      } catch {
        showToast("Error al actualizar imagen hero", "error");
      }
    },
    [category.slug]
  );

  const updateSubcategoryImg = useCallback(
    async (subId: string, homeImg: string) => {
      try {
        const res = await fetch(`/api/admin/subcategories/${subId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ homeImg }),
        });
        if (!res.ok) throw new Error();
        setCategory((prev) => ({
          ...prev,
          subcategories: prev.subcategories.map((s) =>
            s.id === subId ? { ...s, homeImg } : s
          ),
        }));
        showToast("Imagen de subcategoria actualizada");
      } catch {
        showToast("Error al actualizar imagen", "error");
      }
    },
    []
  );

  const openCreateDialog = (subcategoryId: string) => {
    setEditingProduct(null);
    setEditingSubcategoryId(subcategoryId);
    setForm(emptyProduct);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setEditingSubcategoryId(product.subcategoryId);
    setForm({
      brand: product.brand,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      badge: product.badge,
      stock: product.stock,
    });
    setDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    setSaving(true);
    try {
      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error();
        const updated = await res.json();
        setCategory((prev) => ({
          ...prev,
          subcategories: prev.subcategories.map((s) => ({
            ...s,
            products: s.products.map((p) =>
              p.id === updated.id ? { ...updated, subcategoryId: p.subcategoryId } : p
            ),
          })),
        }));
        showToast("Producto actualizado");
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            subcategoryId: editingSubcategoryId,
          }),
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setCategory((prev) => ({
          ...prev,
          subcategories: prev.subcategories.map((s) =>
            s.id === editingSubcategoryId
              ? { ...s, products: [created, ...s.products] }
              : s
          ),
        }));
        showToast("Producto creado");
      }
      setDialogOpen(false);
    } catch {
      showToast("Error al guardar producto", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (productId: string, subcategoryId: string) => {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setCategory((prev) => ({
        ...prev,
        subcategories: prev.subcategories.map((s) =>
          s.id === subcategoryId
            ? { ...s, products: s.products.filter((p) => p.id !== productId) }
            : s
        ),
      }));
      showToast("Producto eliminado");
    } catch {
      showToast("Error al eliminar producto", "error");
    }
  };

  return (
    <div className="max-w-5xl">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#232323]">{category.name}</h1>
        <p className="text-sm text-[#828282] mt-1">
          Administra la categoria, subcategorias y productos.
        </p>
      </div>

      {/* Category Hero Image */}
      <Card className="shadow-sm border-[#e8e8e5] rounded-lg mb-6">
        <CardHeader className="pb-2">
          <h2 className="text-xs font-bold tracking-[0.15em] text-[#828282]">
            IMAGEN HERO DE CATEGORÍA
          </h2>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label className="text-sm text-[#232323]">URL de la imagen</Label>
              <div className="flex gap-2">
                <Input
                  value={category.heroImg}
                  onChange={(e) =>
                    setCategory((prev) => ({ ...prev, heroImg: e.target.value }))
                  }
                  placeholder="https://..."
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
                <Button
                  onClick={() => updateHeroImg(category.heroImg)}
                  className="bg-[#c9a96e] hover:bg-[#b8974f] text-white shrink-0"
                >
                  Guardar
                </Button>
              </div>
            </div>
            {category.heroImg && (
              <div className="w-32 h-20 rounded-lg overflow-hidden border border-[#e8e8e5] flex-shrink-0">
                <img
                  src={category.heroImg}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6 bg-[#e8e8e5]" />

      {/* Subcategories */}
      <div className="space-y-6">
        {category.subcategories.map((sub) => (
          <Card key={sub.id} className="shadow-sm border-[#e8e8e5] rounded-lg">
            <CardHeader
              className="cursor-pointer select-none"
              onClick={() => toggleSection(sub.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-4 h-4 text-[#828282] transition-transform ${
                      openSections[sub.id] ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <h3 className="text-sm font-semibold text-[#232323]">
                    {sub.name}
                  </h3>
                  <span className="text-xs text-[#828282]">
                    ({sub.products.length} productos)
                  </span>
                </div>
              </div>
            </CardHeader>

            {openSections[sub.id] && (
              <CardContent className="pt-0">
                {/* Subcategory home image */}
                <div className="flex gap-4 mb-4 p-3 bg-[#f7f6f3] rounded-lg">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs text-[#828282]">
                      Imagen Home de Subcategoria
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={sub.homeImg}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCategory((prev) => ({
                            ...prev,
                            subcategories: prev.subcategories.map((s) =>
                              s.id === sub.id ? { ...s, homeImg: val } : s
                            ),
                          }));
                        }}
                        placeholder="https://..."
                        className="h-8 text-sm border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                      />
                      <Button
                        size="sm"
                        onClick={() => updateSubcategoryImg(sub.id, sub.homeImg)}
                        className="bg-[#c9a96e] hover:bg-[#b8974f] text-white text-xs"
                      >
                        Guardar
                      </Button>
                    </div>
                  </div>
                  {sub.homeImg && (
                    <div className="w-20 h-14 rounded overflow-hidden border border-[#e8e8e5] flex-shrink-0">
                      <img
                        src={sub.homeImg}
                        alt={sub.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {sub.products.map((product) => (
                    <div
                      key={product.id}
                      className="border border-[#e8e8e5] rounded-lg p-3 bg-white hover:shadow-sm transition-shadow"
                    >
                      <div className="flex gap-3">
                        {product.image ? (
                          <div className="w-16 h-16 rounded overflow-hidden border border-[#e8e8e5] flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded border border-[#e8e8e5] flex-shrink-0 bg-[#f7f6f3] flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-[#e8e8e5]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          {product.badge && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] mb-1 bg-[#f5f0e8] text-[#c9a96e] border-0"
                            >
                              {product.badge}
                            </Badge>
                          )}
                          <p className="text-[10px] text-[#828282] uppercase tracking-wider">
                            {product.brand}
                          </p>
                          <p className="text-sm font-medium text-[#232323] truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-semibold text-[#232323]">
                              ${product.price.toLocaleString()}
                            </span>
                            <span
                              className={`text-[10px] font-medium ${
                                product.stock > 0
                                  ? "text-green-600"
                                  : "text-red-500"
                              }`}
                            >
                              Stock: {product.stock}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2 pt-2 border-t border-[#e8e8e5]">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs border-[#e8e8e5] hover:bg-[#f7f6f3]"
                          onClick={() => openEditDialog(product)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs border-[#e8e8e5] text-red-500 hover:bg-red-50 hover:border-red-200"
                          onClick={() =>
                            handleDeleteProduct(product.id, sub.id)
                          }
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full border-dashed border-[#c9a96e] text-[#c9a96e] hover:bg-[#f5f0e8]"
                  onClick={() => openCreateDialog(sub.id)}
                >
                  + Agregar Producto
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#232323]">
              {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Marca</Label>
                <Input
                  value={form.brand}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, brand: e.target.value }))
                  }
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Nombre</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Descripcion</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Precio</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      price: parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      stock: parseInt(e.target.value) || 0,
                    }))
                  }
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">URL de imagen</Label>
              <div className="flex gap-3">
                <Input
                  value={form.image}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="https://..."
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
                {form.image && (
                  <div className="w-12 h-12 rounded overflow-hidden border border-[#e8e8e5] flex-shrink-0">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Badge</Label>
              <Select
                value={form.badge}
                onValueChange={(value: string | null) =>
                  setForm((prev) => ({ ...prev, badge: !value || value === "none" ? "" : value }))
                }
              >
                <SelectTrigger className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20">
                  <SelectValue placeholder="Sin badge" />
                </SelectTrigger>
                <SelectContent>
                  {badgeOptions.map((opt) => (
                    <SelectItem
                      key={opt.value || "none"}
                      value={opt.value || "none"}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="border-[#e8e8e5]"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProduct}
              disabled={saving}
              className="bg-[#c9a96e] hover:bg-[#b8974f] text-white"
            >
              {saving ? "Guardando..." : editingProduct ? "Actualizar" : "Crear"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
