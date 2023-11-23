import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
    const { name, email, password } = await req.json();

    if(!name || !email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if(exist) {
        return NextResponse.json({ error: 'Email already used' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword,
            image: "https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg",
        }
    });

    return NextResponse.json(user);
}