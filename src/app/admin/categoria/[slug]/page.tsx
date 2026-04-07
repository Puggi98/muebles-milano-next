import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { CategoryAdminClient } from "./category-admin-client";

export default async function CategoryAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

  if (!category) {
    notFound();
  }

  return <CategoryAdminClient category={JSON.parse(JSON.stringify(category))} />;
}
