'use client'

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from 'react'

const DashboardPage = () => {
    const { data: session } = useSession();
    const [teams, setTeams] = useState([])

    // Set default values if session is not available
    const name = session ? session.user.name : "Disconnected";
    const email = session ? session.user.email : "Disconnected";
    const image = session ? session.user.image : "/default-profile-image.png"; // Provide a default image URL

    useEffect(() => {
        fetch('/api/retrieve/teams')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTeams(data)
            })
    }, [])

    // Placeholder data for additional information (customize as needed)
    const additionalInfo = {
        gender: "Male",
        address: "123 Street, City",
        company: "My Company",
        work: "Software Engineer",
    };

    return (
        <main className="flex flex-col h-full items-center p-24 bg-zinc-800 text-white">
            <h1 className="font-bold text-2xl">{name}</h1>
            <div className="text-center mb-4 mb-10">
                <Image
                    src={image}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    className="mx-auto rounded-full"
                />
            </div>
            <div className="justify-between h-full w-4/5 flex flex-row m-1">
                {/* Basic Information */}
                <div className="flex flex-col w-full items-center content-center">
                    <div className="flex flex-col bg-zinc-700 rounded-md shadow-m col-span-1 m-1 w-full items-center text-center h-full content-center justify-center">
                        <h2 className="text-xl font-bold mb-4">Basic Information</h2>
                        <p>
                            <span className="font-bold">Full Name:</span> {name}
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="cursor-pointer text-gray-400" onClick={() => handleEdit('name')}>Edit</span>
                        </p>
                        <p>
                            <span className="font-bold">Email:</span> {email}
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="cursor-pointer text-gray-400" onClick={() => handleEdit('email')}>Edit</span>
                        </p>
                    </div>

                    {/* Additional Information */}
                    <div className="flex flex-col bg-zinc-700 rounded-md shadow-m col-span-1 m-1 w-full items-center text-center h-full content-center justify-center">
                        <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                        <p>
                            <span className="font-bold">Gender:</span>{" "}
                            {additionalInfo.gender}
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="cursor-pointer text-gray-400" onClick={() => handleEdit('gender')}>Edit</span>
                        </p>
                        <p>
                            <span className="font-bold">Address:</span>{" "}
                            {additionalInfo.address}
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="cursor-pointer text-gray-400" onClick={() => handleEdit('address')}>Edit</span>
                        </p>
                        <p>
                            <span className="font-bold">Company:</span>{" "}
                            {additionalInfo.company}
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="cursor-pointer text-gray-400" onClick={() => handleEdit('company')}>Edit</span>
                        </p>
                        <p>
                            <span className="font-bold">Work:</span>{" "}
                            {additionalInfo.work}
                            <span className="mx-4 text-gray-400">|</span>
                            <span className="cursor-pointer text-gray-400" onClick={() => handleEdit('work')}>Edit</span>
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-full ml-2 h-full">
                    {/* System Settings */}
                    <div className="flex flex-col bg-zinc-700 rounded-md shadow-m col-span-1 m-1 w-full items-center text-center h-full content-center justify-center">
                        <h2 className="text-xl font-bold mb-4">System Settings</h2>
                        <p>
                            <span className="font-bold">Language:</span> English
                        </p>
                        <p>
                            <span className="font-bold">Theme:</span> Dark
                        </p>
                    </div>

                    {/* Teams Information */}
                    <div className="flex flex-col bg-zinc-700 rounded-md shadow-m col-span-1 m-1 w-full items-center text-center h-full content-center justify-center">
                        <h2 className="text-xl font-bold mb-4">Teams Information</h2>
                            <div className="flex-1-0 flex flex-row items-center text-center justify-center">
                                {teams.map((team) => (
                                    <a href={`/team/${team.id}`} key={team.id}>
                                        <div key={team.id} className="bg-zinc-500 p-4 rounded-md m-1">
                                            <Image
                                                src={team.image} // Add team image URL
                                                alt={`Team ${team.name} Image`}
                                                width={50}
                                                height={50}
                                                className="mx-auto mb-2 rounded-full"
                                            />
                                            <p className="font-bold">{team.name}</p>
                                            <p>{team.members_count <= 1 ? (team.members_count + " member") : (team.members_count + " members")} </p>
                                            <p>Role: {team.role}</p>
                                        </div>
                                    </a>
                                ))}
                                <a href="/register/team" className="rounded-md m-1">
                                    <button
                                        type="submit"
                                        className="m-1 w-3/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                                    >
                                        Create a team
                                    </button>
                                </a>
                            </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;