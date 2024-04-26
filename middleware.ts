export { default } from "next-auth/middleware";

export const config = {
  // to secure certain pages movie/:id*
  matcher: ["/any"],
};
