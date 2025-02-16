import { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.password) {
      return new Response("Missing required fields", { status: 400 });
    }

    const createdUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    return new Response(JSON.stringify(createdUser), { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);

    return new Response("Internal Server Error", { status: 500 });
  }
}
