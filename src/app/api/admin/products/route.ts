import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subcategoryId, brand, name, description, price, image, badge, stock } = body;

    const product = await prisma.product.create({
      data: {
        subcategoryId,
        brand,
        name,
        description: description || "",
        price: parseFloat(price),
        image: image || "",
        badge: badge || "",
        stock: parseInt(stock) || 0,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
