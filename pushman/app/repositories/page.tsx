"use client"

import React from 'react';
import RepositoryCard from 'components/repository/repositoryCard';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

const RepositoryList = () => {
    const session = useSession();

    if (session.status == "authenticated") {
        const token = session.data.token;
        console.log(session);

        repositories.sort((a, b) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

        return (
            <main className="flex flex-col items-center p-24 bg-zinc-800">
                <h1 className="font-bold text-2xl">Pushman - Repositories</h1>
                <div id="modal-root"></div>
                <div className="flex justify-center items-center flex-wrap mt-8 w-full">
                    {repositories.map((repo, index) => (
                        <RepositoryCard
                            key={index}
                            token={token}
                            name={repo.name}
                            owner={repo.owner}
                            owner_avatar={repo.owner_avatar}
                            url={repo.url}
                            visibility={repo.visibility}
                            updated_at={repo.updated_at}
                        />
                    ))}
                </div>
            </main>
        );
    }

    //send to page login
    redirect('/');

};

export default RepositoryList;