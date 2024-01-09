/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    //* Because of viem package build error.
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
