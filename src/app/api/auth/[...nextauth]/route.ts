import bcrypt from 'bcrypt';
import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { findOneUserByParams } from '@/collections/user';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (typeof credentials === 'undefined') return null;
        const idForSignin = credentials?.email ? 'email' : 'username';
        const signinId = credentials?.email
          ? credentials?.email
          : credentials?.username;
        const user = await findOneUserByParams({
          [idForSignin]: signinId,
        });
        if (typeof user === undefined) return null;
        if (bcrypt.compareSync(credentials.password, user?.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  session: { strategy: 'jwt' },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
