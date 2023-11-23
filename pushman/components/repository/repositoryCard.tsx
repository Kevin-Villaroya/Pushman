import { Playball } from 'next/font/google';
import React, { useState } from 'react';

import RepositoryModal from './modal';

import Image from 'next/image'
import eye_image from 'public/icons/eye_open.svg'

const openSans = Playball({
    subsets: ['latin'],
    display: 'swap',
    style: 'normal',
    weight: '400',
});

const RepositoryCard = ({ name, token, owner, owner_avatar, url, visibility, updated_at }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    if(updated_at){
        updated_at = new Date(updated_at).toLocaleDateString() + " " + new Date(updated_at).toLocaleTimeString();
    }

    return (
        <div 
            className="w-1/5 bg-zinc-400 border-2 border-zinc-400 shadow-md rounded-md m-4 flex items-center justify-center flex-col text-center hover:bg-zinc-500 hover:border-yellow-400 hover:border-double  hover:cursor-pointer"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        >
            <div onClick={() => toggleModal()}>
                <div className='flex flex-row w-full justify-between p-2'>
                    <div className={openSans.className + " w-10 h-10 bg-green-950 rounded-full flex justify-center items-center p-5 shadow-xl m-1"}>
                        <p className="text-white font-bold text-2xl">{name[0].toUpperCase()}</p>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 m-1">{name}</h3>
                    <p className="text-gray-700 italic   text-xs">{visibility}</p>
                </div>
                <div className="flex flex-row w-full justify-center">
                    <p className="text-gray-600 m-1">Owner :</p>
                    <p className="text-gray-800 m-1">{owner}</p>
                    <Image src={owner_avatar} width={30} height={30} alt="Picture of the owner" className='rounded-full m-1' />
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <p className="text-gray-600 m-1">Last update :</p>
                    <p className="text-gray-800 m-1">{updated_at}</p>
                </div>
                <hr className="border-t border-dashed border-gray-300 w-4/5"></hr>
            </div>
            <a
                href={url}
                className={`w-full justify-center items-center flex hover:bg-zinc-700 ${isHovered ? 'bg-zinc-600' : 'bg-zinc-500'}`}
                target="_blank"
            >
                <Image src={eye_image} alt="Eye Icon" className="w-7 ml-2 flex" />
            </a>
            {showModal ? <RepositoryModal setShowModal={toggleModal} name={name} owner={owner} token={token} /> : null}
        </div>
    );
};

export default RepositoryCard;
