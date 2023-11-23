'use client'

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            ... data,
            redirect: false,
        });

        if(result.error) {
            alert("Error signing in");
            return;
        }

        router.push("/dashboard");
    };

    return (
        <main className="flex flex-col h-full items-center p-24 bg-zinc-800">
            <h1 className="font-bold text-2xl"> Sign in to your account</h1>
            <div className="justify-center h-full w-2/5">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm h-full">
                    <form className="space-y-6" onSubmit={loginUser}>
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
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    onLoad={(e) => setData({ ...data, password: e.target.value })}
                                    required
                                    className="min-w-full p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none placeholder:text-gray"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-base font-semibold leading-6 text-gray-200">
                                    Password
                                </label>
                                <div className="text-base">
                                    <a href="/login" className="font-semibold text-indigo-700 hover:text-indigo-400">
                                        Forget password ?
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
                                    onLoad={(e) => setData({ ...data, password: e.target.value })}
                                    className="p-1 outline-none text-center block w-full rounded-md bg-zinc-900 border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-base sm:leading-6 autofill:bg-none placeholder:text-gray"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                            >
                                Login
                            </button>
                        </div>

                        <div className="text-base flex">
                            <a href="/register/user" className="font-semibold text-indigo-600 hover:text-indigo-300">
                                ... or create an account
                            </a>
                        </div>
                    </form>
                    <div className="mt-4 mb-4 border-t border-gray-600" />

                    <button
                        onClick={() => signIn("github", { callbackUrl: '/dashboard' })}
                        className="flex w-full pt-7 pb-7 justify-center rounded-md bg-zinc-700 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Login with GitHub
                    </button>
                </div>
            </div>
        </main>
    );
}