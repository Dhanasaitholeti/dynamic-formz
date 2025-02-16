import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.formId || !Array.isArray(body.values)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const form = await prisma.form.findUnique({
      where: { id: body.formId },
      include: {
        fields: true,
      },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (!form.isPublished) {
      return NextResponse.json(
        { error: "Form is not published" },
        { status: 400 }
      );
    }

    const requiredFields = form.fields.filter((field: any) => field.isRequired);
    const submittedFieldIds = body.values.map((v: any) => v.fieldId);

    for (const field of requiredFields) {
      if (!submittedFieldIds.includes(field.id)) {
        return NextResponse.json(
          { error: `Missing required field: ${field.label}` },
          { status: 400 }
        );
      }
    }

    const response = await prisma.formResponse.create({
      data: {
        formId: body.formId,
        values: {
          create: body.values.map((value: any) => ({
            fieldId: value.fieldId,
            value: value.value.toString(),
          })),
        },
      },
    });

    const fieldMap = new Map(
      form.fields.map((field) => [field.id, field.label])
    );

    const payload = {
      formId: body.formId,
      formName: form.title,
      values: body.values.map((value: any) => ({
        label: fieldMap.get(value.fieldId) || "Unknown Field",
        value: value.value.toString(),
      })),
      submissionTime: response.createdAt,
    };

    const username = "airbaseinc-S3FWPG.IE904E";
    const password = "759021a4-3ed6-4e51-83e4-acb35a31090f";
    const basicAuth = btoa(`${username}:${password}`);

    if (process.env.DAMN === "mine") {
      const webhookCall = await fetch(
        "https://c02-usa-west.integrate-test.boomi.com/ws/simple/executeDetailstestapi",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({ payload }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${basicAuth}`,
          },
        }
      );
    }
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
