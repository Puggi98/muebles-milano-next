import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { heroImg } = body;

    const category = await prisma.category.update({
      where: { slug },
      data: { heroImg },
    });

    revalidatePath("/admin");
    revalidatePath(`/categoria/${slug}`);
    revalidatePath("/");

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}
