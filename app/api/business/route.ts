import { NextResponse } from 'next/server';
import { z } from 'zod';

const BusinessSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Business name is required"),
  description: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = BusinessSchema.parse(body);

    // Here you would typically save to your database
    // For now, we'll just return the validated data
    return NextResponse.json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}