import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust path if prisma is located elsewhere

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json(
      { error: 'Product ID is required' },
      { status: 400 }
    );
  }

  const productIdNumber = parseInt(productId, 10);

  try {
    const baseData = await prisma.base.findMany({
      where: { productId: productIdNumber },
    });

    return NextResponse.json(baseData);
  } catch (error) {
    console.error('Error fetching base data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch base data' },
      { status: 500 }
    );
  }
}
