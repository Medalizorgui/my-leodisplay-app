import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { prisma } from "@/lib/prisma"; // Adjust this import according to your project structure

export async function POST(request: Request) {
    try {
        const { email, password, name, phone, role } = await request.json();
        console.log({ email, password, name, phone, role });

        // Hash the password
        const hashPassword = await hash(password, 10);

        // Create a new customer
        const newCustomer = await prisma.customer.create({
            data: {
                email,
                password: hashPassword, // Make sure this column exists in your database
                nom: name,
                phone,
                role // Assign the role passed from the request
            }
        });

        console.log("Customer created:", newCustomer);
        return NextResponse.json({ message: 'User created successfully!' });
    } catch (e) {
        console.log({ e });
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    }
}
