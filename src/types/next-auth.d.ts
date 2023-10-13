import "next-auth";

declare module "next-auth" {

  interface User {
    profile: {
      fullName: string,
      email: string,
      avatar: string
    }
    token: string;
  }

  interface Session {
    user: {
      fullName: string,
      email: string,
      avatar: string
    }
    accessToken: string
  }

}
