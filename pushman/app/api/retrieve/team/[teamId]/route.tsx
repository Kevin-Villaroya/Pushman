import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const userSession = await getServerSession(request);
    let email = userSession.user.email;

    console.log(userSession);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    console.log(user);

    const team = await prisma.team.findUnique({
        where: {
            members: {
                some: {
                    userId: user.id,
                },
            },
        },
        include: {
            members: {
                where: {
                    userId: user.id,
                },
                select: {
                    role: true,
                },
            },
        },
    });

    console.log(team);

    return NextResponse.json(team);
};

export { handler as GET };
