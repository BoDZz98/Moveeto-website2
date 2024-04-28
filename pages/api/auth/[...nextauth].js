import { connectDB } from "@/utils/connect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcrypt from "bcrypt";

// min 25 protected routes -> https://www.youtube.com/watch?v=yfQkDwJAirs&t=1242s
// ERCGFMYqm2Tuq(@
async function login(credentials) {
  try {
    connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Invalid Credintials");
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if (!isCorrect) throw new Error("Invalid Credintials");
    return user;
  } catch (error) {
    console.log("error while logging in");
    return;
  }
}

export const authOptions = {
  pages: {
    // This is the url that the user will be directed to if he tried to access a certain path that req auth, ahd he is not auth
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const user = await login(credentials);
        // console.log({ credentials });
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return { email: user.email };
        } else {
          throw new Error("Invalid Credentials");
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    /*  async jwt({ token, user }) {
      if (user) {
        token.username = user.name;
        token.email = user.email;
        token.id = user.id;
      }
      console.log("token is", token);

      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
      }
      // console.log("session is", session);
      return session;
    }, */
  },
};
export default NextAuth(authOptions);

/* interface AuthOptions {
  providers: Provider[];
  pages?: Partial<PagesOptions>;
  session?: Partial<SessionOptions>;
}
 */
