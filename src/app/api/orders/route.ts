import prisma from "@/lib/prisma";
import { orderSchema, OrderSchema } from "@/lib/order/zod";
import { NextRequest, NextResponse } from "next/server";

// GET method to retrieve all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// POST method to create a new order
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = orderSchema.parse(data);

    // Create a new order using Prisma
    const order = await prisma.order.create({
      data: {
        status: parsedData.status || "attente",
        image: parsedData.image || null,
        qty: parsedData.qty || 1,
        orderGroupId: parsedData.orderGroupId || '1', // Default to 1 if not provided
        email: parsedData.email,
        name: parsedData.name,
        productNom: parsedData.productNom,
        selectedType: parsedData.selectedType || null,
        selectedBaseName: parsedData.selectedBase || "",
        baseQuantity: parsedData.baseQuantity || 0,
        selectedTailleName: parsedData.selectedTaille || "",
        tailleQuantity : parsedData.tailleQuantity || 0,
        selectedBarre: parsedData.selectedBarre || null,
      },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("Error creating order:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create order";

    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}

// DELETE method to delete an order
export async function DELETE(request: NextRequest) {
  try {
    const idString = request.nextUrl.searchParams.get("id");
    const id = idString ? parseInt(idString, 10) : null;
    if (!id) {
      return NextResponse.json(
        { message: "Order ID is required" },
        { status: 400 }
      );
    }
    await prisma.order.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// PUT method to update an order
export async function PUT(request: NextRequest) {
  try {
    const { id: idString, ...rest } = await request.json();
    const id = idString ? parseInt(idString, 10) : null;
    const parsedData = orderSchema.parse(rest);

    if (!id) {
      return NextResponse.json(
        { message: "Order ID is required" },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: parsedData.status,
        image: parsedData.image,
        qty: parsedData.qty,
        orderGroupId: parsedData.orderGroupId,
        email: parsedData.email,
        name: parsedData.name,
        productNom: parsedData.productNom,
        selectedType: parsedData.selectedType,
        selectedBaseName: parsedData.selectedBase,
        baseQuantity: parsedData.baseQuantity,
        selectedTailleName: parsedData.selectedTaille,
        tailleQuantity : parsedData.tailleQuantity,
        selectedBarre: parsedData.selectedBarre,
      },
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

// OPTIONS method to handle CORS preflight
export function OPTIONS() {
  return new Response(null, {
    headers: {
      Allow: "GET, POST, DELETE, PUT",
    },
  });
}
