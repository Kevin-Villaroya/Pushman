'use client'

import { set } from "mongoose";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from 'react'

const TeamPage = ({ params }: { params: { teamId: string } }) => {
    const { data: session } = useSession();
    const [team, setTeam] = useState({})

    const teamId = params.teamId

    //list api
    //members in team
    //team name
    //team image
    //api (project)


    useEffect(() => {
        fetch('/api/retrieve/teams/'+ teamId)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTeams(data)
            })
    }, [])

    return (
        <main className="flex flex-col h-full items-center p-24 bg-zinc-800 text-white">
            <h1 className="font-bold text-2xl">{teamId}</h1>
        </main>
    );
};

export default TeamPage;