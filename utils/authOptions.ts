import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/user";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          propmt: "consent",
          acess_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // @ts-ignore: Unreachable code error
    async signIn({ profile }) {
      await connectDB();

      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      return true;
    },
// @ts-ignore: Unreachable code error
    async session({ session }) {
      const user = await User.findOne({
        email: session.user.email,
      });

      session.user.id = user._id.toString();

      return session;
    },
  },
};
