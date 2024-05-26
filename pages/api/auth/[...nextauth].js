import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { username: credentials.username },
                });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return { id: user.id, username: user.username };
                }

                return null;
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    callbacks: {
        async jwt(token, user) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session(session, token) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: null,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
