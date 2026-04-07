import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categorySlug = searchParams.get("category");
  const subcategorySlug = searchParams.get("subcategory");

  try {
    const where: Record<string, unknown> = {};

    if (subcategorySlug && categorySlug) {
      const sub = await prisma.subcategory.findFirst({
        where: {
          slug: subcategorySlug,
          category: { slug: categorySlug },
        },
      });
      if (sub) {
        where.subcategoryId = sub.id;
      }
    } else if (categorySlug) {
      const cat = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { subcategories: true },
      });
      if (cat) {
        where.subcategoryId = {
          in: cat.subcategories.map((s) => s.id),
        };
      }
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
