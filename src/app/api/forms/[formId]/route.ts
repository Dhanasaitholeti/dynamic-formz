import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const data = await prisma.form.findUnique({
      where: {
        id: (await params).formId,
      },
      include: {
        fields: true,
        responses: true,
      },
    });

    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ formId: string }> }
) {
  try {
    const body = await request.json();
    const formId = (await params).formId;

    const updatedForm = await prisma.form.update({
      where: { id: formId },
      data: body,
    });

    return Response.json({ data: updatedForm });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
