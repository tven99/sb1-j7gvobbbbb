import { NextResponse } from 'next/server';
import { z } from 'zod';

const BusinessItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['product', 'service', 'other']),
  description: z.string(),
});

const BusinessInfoSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  description: z.string(),
  items: z.array(BusinessItemSchema),
});

export async function GET(
  request: Request,
  { params }: { params: { businessId: string } }
) {
  try {
    // Here you would typically fetch from your database
    // For now, we'll return mock data
    const businessInfo = {
      name: "Sample Business",
      description: "Sample description",
      items: [],
    };

    return NextResponse.json(businessInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch business info" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { businessId: string } }
) {
  try {
    const body = await request.json();
    const validatedData = BusinessInfoSchema.parse(body);

    // Here you would typically update your database
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
      { error: "Failed to update business info" },
      { status: 500 }
    );
  }
}