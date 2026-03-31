import type { NextAuthOptions } from "next-auth";
import AppleProvider from "next-auth/providers/apple";

export const authOptions: NextAuthOptions = {
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // On first sign-in, persist Apple's stable user ID and name
      if (account) {
        token.appleId = account.providerAccountId;
        token.accessToken = account.access_token;
      }
      if (profile) {
        // Apple only sends name on the very first authorization
        const appleProfile = profile as { name?: { firstName?: string; lastName?: string } };
        if (appleProfile.name) {
          token.name = [appleProfile.name.firstName, appleProfile.name.lastName]
            .filter(Boolean)
            .join(" ");
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Expose Apple ID and participant info to the client
      if (session.user) {
        (session.user as Record<string, unknown>).appleId = token.appleId;
        (session.user as Record<string, unknown>).accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
