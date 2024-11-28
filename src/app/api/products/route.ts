import prisma from '@/lib/prisma';
import { productSchema } from '@/lib/product/zod';
import { NextRequest, NextResponse } from 'next/server';

// GET method to retrieve all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                bases: true,
                tailles: true
            }
        });
        console.log("product    :", products);
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
        const parsedData = productSchema.parse(data);

        // Create a new product using Prisma
        const product = await prisma.product.create({
            data: {
                nom: parsedData.nom,
                description: parsedData.description,
                image: parsedData.image,
                prix: parsedData.prix,
                type: parsedData.type || [],
                barre: parsedData.barre || [],
                bases: {
                    create: parsedData.bases?.map(base => ({
                        name: base.name,
                        image: base.image,
                        price: base.price
                    })) || []
                },
                tailles: {
                    create: parsedData.tailles?.map(taille => ({
                        name: taille.name,
                        image: taille.image,
                        downloadLink: taille.downloadLink,
                        price: taille.price
                    })) || []
                }
            },
            include: {
                bases: true,
                tailles: true
            }
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ 
            message: error instanceof Error ? error.message : 'Failed to create product' 
        }, { status: 400 });
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

        // Delete associated bases and tailles first
        await prisma.base.deleteMany({ where: { productId: id } });
        await prisma.taille.deleteMany({ where: { productId: id } });

        const deletedProduct = await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}

// PUT method to update a product
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id: idString, ...rest } = body;
        const id = idString ? parseInt(idString, 10) : null;
        const parsedData = productSchema.parse(rest);

        if (!id) {
            return NextResponse.json({ message: 'Product ID is required' }, { status: 400 });
        }

        // Delete existing bases and tailles
        await prisma.base.deleteMany({ where: { productId: id } });
        await prisma.taille.deleteMany({ where: { productId: id } });

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                nom: parsedData.nom,
                description: parsedData.description,
                image: parsedData.image,
                prix: parsedData.prix,
                type: parsedData.type || [],
                barre: parsedData.barre || [],
                bases: {
                    create: parsedData.bases?.map(base => ({
                        name: base.name,
                        image: base.image,
                        price: base.price
                    })) || []
                },
                tailles: {
                    create: parsedData.tailles?.map(taille => ({
                        name: taille.name,
                        image: taille.image,
                        downloadLink: taille.downloadLink,
                        price: taille.price
                    })) || []
                }
            },
            include: {
                bases: true,
                tailles: true
            }
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