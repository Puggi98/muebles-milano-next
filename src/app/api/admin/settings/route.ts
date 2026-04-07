import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Error fetching settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body as {
      settings: { key: string; value: string }[];
    };

    const results = await Promise.all(
      settings.map((s) =>
        prisma.siteSetting.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: { key: s.key, value: s.value },
        })
      )
    );

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Error updating settings" },
      { status: 500 }
    );
  }
}
