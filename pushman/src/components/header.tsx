// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import research from 'public/research.svg';
import Profil from './profil';

function Header() {
    return (
        <header className="bg-zinc-950 flex p-2 justify-between items-center text-white">
            <nav className="flex items-center">
                <Link href="/" passHref className="text-xl font-bold mr-4">Home</Link>
                <Link href="/workflow" passHref className="text-xl font-bold mr-4">Workflow</Link>
                <Link href="/benchmark" passHref className="text-xl font-bold mr-4">Benchmark</Link>
            </nav>
            <div className="flex items-center p-2 font-bold rounded-lg bg-zinc-500">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-zinc-500 text-white outline-none"
                />
                <Image src={research} alt="Search Icon" className="w-5 bg-inherit ml-2" />
            </div>
            <Profil />
        </header>
    );
}

export default Header;
