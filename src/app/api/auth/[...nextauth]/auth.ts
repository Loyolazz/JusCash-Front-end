import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Api from '../../../../services/api';
import jwt from 'jsonwebtoken';

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'jusCash',
            credentials: {
                email: { label: 'E-mail:', type: 'text' },
                password: { label: 'Senha:', type: 'password' },
            },
            async authorize(credentials, _) {
                const api = new Api();
                const response = await api.login({
                    //@ts-ignore
                    email: credentials?.email,
                    //@ts-ignore
                    password: credentials?.password,

                });
                const {authorization}: any = response.data;
                const tokenDecoded: any = (jwt.decode(authorization));
                return authorization && tokenDecoded ? {
                    id: tokenDecoded.id,
                    email: tokenDecoded.email,
                    token: authorization,
                } : null;
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;

        },
         async session({ session, token }) {
             session = token.user as any;
             return session;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: Number(3) * 3600,
    },
};


