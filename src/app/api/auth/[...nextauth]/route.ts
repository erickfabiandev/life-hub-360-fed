import NextAuth, { NextAuthOptions, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from 'crypto';
import { loginService } from '@/service/AuthService'
import { JWT } from "next-auth/jwt";
import { MessageComponent } from "@/components/NotificationComponent";


export const AuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req
      ): Promise<User | null> {
        try {
          const response = await loginService(credentials?.email, credentials?.password)
          const user = {
            id: generateUniqueUserId(credentials?.email),
            token: response.token,
            profile: response.profile
          };
          return user
        } catch (error: any) {
          throw new Error(error?.response?.data) || null
        }
      },
    })
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.token
        token.user = user.profile
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
}

function generateUniqueUserId(email: string | undefined): string {
  if (!email) {
    return '';
  }
  const hash = crypto.createHash('sha256');
  hash.update(email);

  return hash.digest('hex');
}

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST };