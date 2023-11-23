'use client'

import {useState} from 'react';
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/register/user", {
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const result = await res.json();

        if (result.error) {
            alert(result.error);
        } else {
            router.push("/login");
        }
    };

    return (
        <main className="flex flex-col h-full items-center p-24 bg-zinc-800">
            <h1 className="font-bold text-2xl"> Register for an account</h1>
            <div className="justify-center h-full w-2/5">

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-full">
                    <form className="space-y-6" onSubmit={registerUser}>
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
                                    placeholder='Jean Jack'
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none placeholder:text-gray"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-base font-semibold leading-6 text-gray-200">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={data.email}
                                    placeholder='jean.jack@gmail.com'
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    required
                                    className="min-w-full p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none placeholder:text-gray"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-base font-semibold  leading-6 text-gray-200">
                                    Password
                                </label>
                                <div className="text-base">
                                    <a href="#" className="font-semibold text-indigo-700 hover:text-indigo-400">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    className="p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none"
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