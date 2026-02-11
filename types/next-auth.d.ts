import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string | null;
    refreshToken?: string | null;
    user?: DefaultSession['user'] & {
      id?: string | null;
    };
  }

  interface User extends DefaultUser {
    accessToken?: string | null;
    refreshToken?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    userId?: string | null;
  }
}
