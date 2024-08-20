/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://116.202.210.102:4041/api/:path*", 
      },
    ];
  },

  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
