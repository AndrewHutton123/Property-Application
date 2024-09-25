/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
