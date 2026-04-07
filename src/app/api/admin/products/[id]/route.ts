import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { brand, name, description, price, image, badge, stock } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
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
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin");
    revalidatePath("/");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
