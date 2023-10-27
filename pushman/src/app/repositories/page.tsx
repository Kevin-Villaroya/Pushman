"use client"

import React from 'react';
import RepositoryCard from 'src/components/repositoryCard';
import { useSession } from 'next-auth/react'

const RepositoryList = () => {
    const session = useSession();
    const repositories = session.data.repos || [];

    if (session.status == "authenticated" && repositories.length > 0) {
        return (
            <main className='text-center'>
                <h1 className='text-3xl font-bold m-4'>Choose the repository containing your api</h1>
                <div className="flex justify-center items-center flex-col">
                    {repositories.map((repo, index) => (
                        <RepositoryCard
                            key={index}
                            name={repo.name}
                            owner={repo.owner}
                            description={repo.description}
                            url={repo.url}
                        />
                    ))}
                </div>
            </main>
        );
    }
};

export default RepositoryList;