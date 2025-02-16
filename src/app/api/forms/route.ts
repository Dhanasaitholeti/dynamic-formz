import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(body.fields, "body");

    const data = await prisma.form.create({
      data: {
        userId: body.userId,
        title: body.title,
        description: body.description,
        isPublished: body.isPublished,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        fields: {
          create: body.fields.map((field: any) => ({
            label: field.label,
            fieldType: field.fieldType,
            options: field.options,
            isRequired: field.isRequired,
            position: field.position,
          })),
        },
      },
      include: {
        fields: true,
      },
    });

    return Response.json({ body: data });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
