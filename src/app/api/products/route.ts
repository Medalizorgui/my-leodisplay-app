import prisma from '@/lib/prisma'; // Ensure this path is correct
import { productSchema } from '@/lib/zod'; // Adjust as necessary
import { NextRequest, NextResponse } from 'next/server';

// GET method to retrieve all products
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

// POST method to create a new product
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const parsedData = productSchema.parse(data); // Validate input with Zod schema

        // Create a new product using Prisma
        const product = await prisma.product.create({
            data: {
                nom: parsedData.nom,
                description: parsedData.description || '',
                image: parsedData.image || '',
                prix: parsedData.prix || '',
                type: parsedData.type || [],
                base: parsedData.base || [],
                taille: parsedData.taille || [],
                barre: parsedData.barre || [],
            },
        });

        // Respond with the created product
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);

        // Ensure error message is properly formatted as an object
        const errorMessage = error instanceof Error ? error.message : 'Failed to create product';

        return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
}

// DELETE method to delete a product
export async function DELETE(request: NextRequest) {
    try {
        const idString = request.nextUrl.searchParams.get('id');
        const id = idString ? parseInt(idString, 10) : null;

        if (!id) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
        }

        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id: idString, ...rest } = body; // Extract ID as a string
        const id = idString ? parseInt(idString, 10) : null; // Convert to number
        const parsedData = productSchema.parse(rest); // Validate the rest of the data

        if (!id) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                nom: parsedData.nom,
                description: parsedData.description,
                image: parsedData.image,
                prix: parsedData.prix,
                type: parsedData.type,
                base: parsedData.base,
                taille: parsedData.taille,
                barre: parsedData.barre,
            },
        });

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

// OPTIONS method for unsupported methods
export function OPTIONS() {
    return new Response(null, {
        headers: {
            Allow: 'GET, POST, DELETE, PUT',
        },
    });
}
