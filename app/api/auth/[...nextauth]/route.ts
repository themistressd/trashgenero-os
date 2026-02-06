import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginWithJWT } from '@/lib/api/wordpress';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'WordPress',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const data = await loginWithJWT(credentials.username, credentials.password);
          const token = data?.token;
          const refreshToken = data?.refresh_token;

          if (!token) return null;

          return {
            id: data?.user_id ? String(data.user_id) : credentials.username,
            name: data?.user_display_name || credentials.username,
            email: data?.user_email || null,
            accessToken: token,
            refreshToken: refreshToken || null,
          };
        } catch (error) {
          console.error('NextAuth authorize failed:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId;
      }
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
