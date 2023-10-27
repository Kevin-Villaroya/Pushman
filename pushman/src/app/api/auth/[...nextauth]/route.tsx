import NextAuth from "next-auth/next";
import fetch from 'node-fetch';

const get_repos = async function(accessToken: string){
    try {
        const response = await fetch('https://api.github.com/user/repos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            let repos = await response.json();
            return repos;
        } else {
            throw new Error(`Request failed with status code ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching repositories:', error);
        throw error;
    }
}

const handler = NextAuth({
    providers: [
        {
            id: "github",
            name: "GitHub",
            type: "oauth",
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "repo" },
            },
            token: "https://github.com/login/oauth/access_token",
            userinfo: {
                url: "https://api.github.com/user",
                async request({ client, tokens }) {
                    const profile = await client.userinfo(tokens.access_token!);
                    const repos = await get_repos(tokens.access_token!);

                    //add in profile repos url and naame
                    profile.repos = repos.map((repo: any) => {
                        return {
                            name: repo.name,
                            url: repo.html_url,
                            owner: repo.owner.login,
                            description: repo.description,
                        }
                    });

                    return {
                        id: profile.id,
                        name: profile.name,
                        email: profile.email,
                        image: profile.avatar_url,
                        repos: profile.repos,
                    }
                },
            },
            profile(userinfo) {
                return userinfo;
            },
            style: {
                logo: "/github.svg",
                logoDark: "/github-dark.svg",
                bg: "#fff",
                bgDark: "#000",
                text: "#000",
                textDark: "#fff",
            },
            options: {
                clientSecret: process.env.GITHUB_SECRET!,
                clientId: process.env.GITHUB_ID!
            } as OAuthUserConfig<any>
        }
    ],
    callbacks: {
        async session({ session, user, token }) {
            return token
        },
        async jwt({ token, user }) {
            return { ...token, ...user }
        }
    }
});

export { handler as GET, handler as POST };