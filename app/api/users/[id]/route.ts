import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

const RESOURCE_NAME = 'users';
const model = prisma.user;

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
    const { id } = params;

    try {
        const item = await model.findUnique({ where: { id } });
        return NextResponse.json(item);
    } catch (error) {
        console.error(`Error fetching ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error fetching ${RESOURCE_NAME}` }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: Params) {
    const { id } = params;
    const data = await req.json();

    const updateData: any = {
        email: data.email,
        username: data.username,
        role: data.role,
    };

    if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
    }

    try {
        const updatedItem = await model.update({
            where: { id },
            data: updateData,
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
        await model.delete({ where: { id } });
        return NextResponse.json({ message: `${RESOURCE_NAME.slice(0, -1)} deleted` });
    } catch (error) {
        console.error(`Error deleting ${RESOURCE_NAME}: ${error.message}`);
        return NextResponse.json({ error: `Error deleting ${RESOURCE_NAME}` }, { status: 500 });
    }
}
