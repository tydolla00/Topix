import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // * Only called if authorized passes
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (token === null) return false;
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Specify the routes that need to be authenticated
export const config = { matcher: ["/profile"] };
