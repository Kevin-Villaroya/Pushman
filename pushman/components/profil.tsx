"use client"

import { useSession } from "next-auth/react"
import {signOut} from 'next-auth/react'
import Image from 'next/image'

import user_disconnected from 'public/icons/user_not_connected.svg'

const Profil = () => {
    const session = useSession();

if (session.status == "authenticated")
    {
        return (
            <div className="flex items-center">
                <Image src={session.data.user.image} width={60} height={60} alt="Picture of the author" className='rounded-full' />
                <div className="ml-4 flex-col">
                    <p className="font-bold text-xl">{session.data.user.name}</p>
                    <a href="/dashboard" className="text-blue-500 flex">Profile</a>
                    <a onClick={() => { signOut() }} className="text-blue-500 flex">Disconnect</a>
                </div>
            </div>
        );
    }

    return (
        <a href="/login">
            <button>
                <Image src={user_disconnected} width={60} height={60} alt="Picture of Github" className='rounded-full' />
            </button >
        </a>
    )
}

export default Profil;