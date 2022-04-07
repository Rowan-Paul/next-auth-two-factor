import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '../../../lib/prisma';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: { newUser: '/twofactor' },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.twofactor = !!user.twofactor;
      return Promise.resolve(session);
    }
  },
  events: {
    async signIn({ user }) {
      console.log(user);
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
