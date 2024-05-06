import { connectDB } from "@/utils/db-util";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User, { collectionObj } from "@/models/userModel";
import bcrypt from "bcrypt";
import { MovieObj } from "@/pages/movie/[movieId]";

// min 25 protected routes -> https://www.youtube.com/watch?v=yfQkDwJAirs&t=1242s
// ERCGFMYqm2Tuq(@
async function login(credentials: Record<string, string>) {
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

export default NextAuth({
  pages: {
    // This is the url that the user will be directed to if he tried to access a certain path that req auth, ahd he is not auth
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      authorize: async (credentials: Record<string, string>) => {
        const user = await login(credentials);
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          throw new Error("Invalid Credentials");
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
  // the collbacks are called in the following order
  callbacks: {
    jwt: async ({ token, user, trigger, session }: any) => {
      user && (token.user = user);
      // Updating the tokon/session and use it as a state managment instead of redux
      // Fav and wishlist
      // if (trigger === "update" && session.movie && session.list) {
      //   if (session?.operation === "add") {
      //     token.user[session.list].push(session.movie);
      //   } else {
      //     const index = token.user[session.list].findIndex(
      //       (obj: any) => obj.title === session.movie
      //     );
      //     index !== -1 && token.user[session.list].splice(index, 1);
      //   }
      // }
      // // Adding movies to user collections ------------------------------------------
      // if (trigger === "update" && session.movie && session.collectionName) {
      //   const collection: collectionObj = token.user.userCollections.find(
      //     (c: collectionObj) => c.name === session.collectionName
      //   );
      //   if (session?.operation === "add") {
      //     collection.movies.push(session.movie);
      //     // console.log("user coll is", token.user.userCollections);
      //   } else {
      //     const index = collection.movies.findIndex(
      //       (m: any) => m.title === session.movie
      //     );
      //     index !== -1 && collection.movies.splice(index, 1);
      //   }
      // }
      if (trigger === "update") {
        const user = await User.findOne({ email: token.user.email });
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      session.user = token.user;
      // This session contain the user data retrived from the modal
      // console.log("session is", session.user.userCollections);

      return session;
    },
  },
});
// export default NextAuth(authOptions);
