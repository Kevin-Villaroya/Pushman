"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
    session: Session | null;
};

const Provider = ({ children, session }: Props) => {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}

export default Provider;