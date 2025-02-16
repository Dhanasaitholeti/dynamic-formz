import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const forms = await prisma.form.findMany({
      where: {
        userId: body.userId,
      },
      include: {
        fields: true,
      },
    });

    return Response.json({ forms: forms });
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
