import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = await prisma.form.create({ data: body });

  return Response.json({ body });
}
