import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
    const userSession = await getServerSession(request);
    let email = userSession.user.email;

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const teams = await prisma.team.findMany({
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

    for (let i = 0; i < teams.length; i++) {
        teams[i].members_count = teams[i].members.length;

        for(let j = 0; j < teams[i].members.length; j++) {
            teams[i].role = teams[i].members[j].role.name;
        }
        delete teams[i].members;
    }

    return NextResponse.json(teams);
};

export { handler as GET };
