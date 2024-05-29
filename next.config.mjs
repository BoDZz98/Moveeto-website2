import MillionLint from "@million/lint";
import million from "million/compiler";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};
export default MillionLint.next({ rsc: true })(nextConfig);
