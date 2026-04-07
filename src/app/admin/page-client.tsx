"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  initialSettings: Record<string, string>;
}

export function AdminSettingsClient({ initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const update = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const pairs = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: pairs }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      showToast("Configuraciones guardadas correctamente");
    } catch {
      showToast("Error al guardar configuraciones", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
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
        <h1 className="text-xl font-bold text-[#232323]">Textos Generales</h1>
        <p className="text-sm text-[#828282] mt-1">
          Administra los textos y configuraciones principales del sitio.
        </p>
      </div>

      <div className="space-y-6">
        {/* Announcement Bar */}
        <Card className="shadow-sm border-[#e8e8e5] rounded-lg">
          <CardHeader className="pb-2">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#828282]">
              BARRA DE ANUNCIO
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="announcement" className="text-sm text-[#232323]">
                Texto del anuncio
              </Label>
              <Input
                id="announcement"
                value={settings["announcement_text"] || ""}
                onChange={(e) => update("announcement_text", e.target.value)}
                placeholder="Ej: Envio gratis en pedidos mayores a $5,000"
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Hero Image */}
        <Card className="shadow-sm border-[#e8e8e5] rounded-lg">
          <CardHeader className="pb-2">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#828282]">
              IMAGEN HERO
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="hero_img" className="text-sm text-[#232323]">
                  URL de la imagen
                </Label>
                <Input
                  id="hero_img"
                  value={settings["hero_image"] || ""}
                  onChange={(e) => update("hero_image", e.target.value)}
                  placeholder="https://..."
                  className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
                />
              </div>
              {settings["hero_image"] && (
                <div className="w-32 h-20 rounded-lg overflow-hidden border border-[#e8e8e5] flex-shrink-0">
                  <img
                    src={settings["hero_image"]}
                    alt="Hero preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Promotional Text */}
        <Card className="shadow-sm border-[#e8e8e5] rounded-lg">
          <CardHeader className="pb-2">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#828282]">
              TEXTO PROMOCIONAL HERO
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero_title" className="text-sm text-[#232323]">
                Titulo
              </Label>
              <Input
                id="hero_title"
                value={settings["hero_title"] || ""}
                onChange={(e) => update("hero_title", e.target.value)}
                placeholder="Ej: Diseno que transforma espacios"
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_subtitle" className="text-sm text-[#232323]">
                Subtitulo
              </Label>
              <Input
                id="hero_subtitle"
                value={settings["hero_subtitle"] || ""}
                onChange={(e) => update("hero_subtitle", e.target.value)}
                placeholder="Ej: Descubre nuestra coleccion de muebles premium"
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
          </CardContent>
        </Card>

        {/* Central Banner */}
        <Card className="shadow-sm border-[#e8e8e5] rounded-lg">
          <CardHeader className="pb-2">
            <h2 className="text-xs font-bold tracking-[0.15em] text-[#828282]">
              BANNER CENTRAL PROMO
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banner_label" className="text-sm text-[#232323]">
                Etiqueta
              </Label>
              <Input
                id="banner_label"
                value={settings["banner_label"] || ""}
                onChange={(e) => update("banner_label", e.target.value)}
                placeholder="Ej: Oferta especial"
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner_title" className="text-sm text-[#232323]">
                Titulo
              </Label>
              <Input
                id="banner_title"
                value={settings["banner_title"] || ""}
                onChange={(e) => update("banner_title", e.target.value)}
                placeholder="Ej: Hasta 30% de descuento"
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner_desc" className="text-sm text-[#232323]">
                Descripcion
              </Label>
              <Input
                id="banner_desc"
                value={settings["banner_description"] || ""}
                onChange={(e) => update("banner_description", e.target.value)}
                placeholder="Ej: En toda nuestra coleccion de verano"
                className="border-[#e8e8e5] focus:border-[#c9a96e] focus:ring-[#c9a96e]/20"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 bg-[#e8e8e5]" />

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#c9a96e] hover:bg-[#b8974f] text-white px-8"
        >
          {saving ? "Guardando..." : "GUARDAR CAMBIOS"}
        </Button>
      </div>
    </div>
  );
}
