import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

const RESOURCE_NAME = 'recipes';
const model = prisma.recipe;

export async function GET() {
    try {
        const items = await model.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true
                    }
                }
            }
        });
        return NextResponse.json(items);
    } catch (error) {
        console.error(`Error fetching ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error fetching ${RESOURCE_NAME}` }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const newItem = await model.create({
            data: {
                name: data.name,
                description: data.description,
                ingredients: {
                    create: data.ingredients.map((ingredient: { id: string }) => ({
                        ingredient: { connect: { id: ingredient.id } }
                    }))
                }
            }
        });
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error(`Error creating ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error creating ${RESOURCE_NAME}` }, { status: 500 });
    }
}
