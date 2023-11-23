'use client'

import {useState} from 'react';
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react"

export default function RegisterPage() {
    const router = useRouter();
    const session = useSession();

    if (session.status != "authenticated")
    {
        router.push("/login");
    }

    const [data, setData] = useState({
        name: "",
        image: "",
    });

    const registerTeam = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register/team", {
            body: JSON.stringify({
                name: data.name,
                image: data.image,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const result = await res.json();

        if (result.error) {
            alert(result.error);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <main className="flex flex-col h-full items-center p-24 bg-zinc-800">
            <h1 className="font-bold text-2xl"> Register your team</h1>
            <div className="justify-center h-full w-2/5">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-full">
                    <form className="space-y-6" onSubmit={registerTeam}>
                        <div className="h-full">
                            <label htmlFor="name" className="block text-base font-semibold leading-6 text-gray-200">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder='My Team'
                                    className="p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none placeholder:text-gray"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-base font-semibold leading-6 text-gray-200">
                                Image
                            </label>
                            <div className="mt-2">
                                <input
                                    id="image"
                                    name="image"
                                    type="name"
                                    value={data.image}
                                    onChange={(e) => setData({ ...data, image: e.target.value })}
                                    placeholder='https://example.com/image.png'
                                    className="min-w-full p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none placeholder:text-gray"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-700 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}