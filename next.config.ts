import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/flavors",
        destination: "/flavours",
        permanent: true,
      },
      {
        source: "/story",
        destination: "/our-story",
        permanent: true,
      },
      {
        source: "/process",
        destination: "/our-story",
        permanent: true,
      },
      {
        source: "/find-us",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/faqs",
        destination: "/faq",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
