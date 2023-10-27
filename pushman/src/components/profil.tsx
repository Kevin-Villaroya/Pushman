"use client"

import {useSession , signIn , signOut} from 'next-auth/react'
import Image from 'next/image'

import github_image from 'public/github_logo.svg'

const Profil = () => {
    const session = useSession();

    if (session.status == "authenticated")
    {
        return(
            <button onClick={() => { signOut() }}>
                <Image src={session.data.image} width={60} height={60} alt="Picture of the author" className='rounded-full'/>
            </button>
        )
    }

    return (
        <button onClick={() => { signIn(undefined, { callbackUrl: '/repositories' }) }}>
            <Image src={github_image} width={60} height={60} alt="Picture of Github" className='rounded-full' />
        </button >
    )
}

export default Profil;