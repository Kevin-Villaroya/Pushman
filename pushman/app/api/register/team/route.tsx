import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { Rights } from '@prisma/client'

const prisma = new PrismaClient();

export async function POST(req) {
    let { name, image } = await req.json();

    const userSession = await getServerSession(req);
    let email = userSession.user.email;

    if(!name) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (!image) {
        image = "https://www.svgrepo.com/show/419754/business-group-human.svg";
    }

    const userDatabase = await prisma.user.findUnique({
        where: {
            email
        }
    });

    const team = await prisma.team.findUnique({
        where: {
            name_ownerId: {
                ownerId: userDatabase.id,
                name,
            },
        },
    });

    if(team) {
        return NextResponse.json({ error: 'This team already exist' }, { status: 400 });
    }

    const teamCreated = await prisma.team.create({
        data: {
            name,
            image: image,
            ownerId: userDatabase.id,
        }
    });

    const role = await prisma.role.create({
        data: {
            name: "Admin",
            teamId: teamCreated.id,
            rights: [
                Rights.READ,
                Rights.WRITE,
                Rights.DELETE,
                Rights.EXECUTE
            ],
            mandatory: true
        }
    });

    await prisma.teamMember.create({
        data: {
            teamId: teamCreated.id,
            userId: userDatabase.id,
            roleId: role.id
        }
    });

    return NextResponse.json(teamCreated);
}