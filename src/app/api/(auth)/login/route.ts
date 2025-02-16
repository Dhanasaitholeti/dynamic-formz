import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.email || !body.password) {
      return new Response("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (user.password !== body.password) {
      return new Response("Invalid password", { status: 401 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error logging in user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
