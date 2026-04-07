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
    const { homeImg } = body;

    const subcategory = await prisma.subcategory.update({
      where: { id },
      data: { homeImg },
    });

    revalidatePath("/admin");
    revalidatePath("/");

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return NextResponse.json(
      { error: "Error updating subcategory" },
      { status: 500 }
    );
  }
}
