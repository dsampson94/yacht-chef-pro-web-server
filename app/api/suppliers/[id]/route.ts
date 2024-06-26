// pages/api/suppliers/[id].ts
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

const RESOURCE_NAME = 'suppliers';
const model = prisma.supplier;

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
    const { id } = params;

    try {
        const item = await model.findUnique({
            where: { id },
            include: {
                location: true,
                supplierIngredients: {
                    include: { ingredient: true }
                }
            },
        });
        if (!item) {
            return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
        }
        return NextResponse.json(item);
    } catch (error) {
        console.error(`Error fetching ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error fetching ${RESOURCE_NAME}` }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: Params) {
    const { id } = params;
    const data = await req.json();
    const { name, email, phone, locationId, ingredients = [] } = data;

    try {
        const updatedItem = await model.update({
            where: { id },
            data: {
                name,
                email,
                phone,
                location: locationId ? { connect: { id: locationId } } : undefined,
                supplierIngredients: {
                    deleteMany: {},
                    create: ingredients.map((ingredient: { id: string }) => ({
                        ingredient: { connect: { id: ingredient.id } }
                    })),
                },
            },
        });
        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error(`Error updating ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error updating ${RESOURCE_NAME}` }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: Params) {
    const { id } = params;

    try {
        await prisma.supplierIngredient.deleteMany({
            where: { supplierId: id }
        });
        await model.delete({ where: { id } });
        return NextResponse.json({ message: `${RESOURCE_NAME.slice(0, -1)} deleted` });
    } catch (error) {
        console.error(`Error deleting ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error deleting ${RESOURCE_NAME}` }, { status: 500 });
    }
}
