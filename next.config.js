/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Cache bust images on each deploy (Vercel sets VERCEL_GIT_COMMIT_SHA)
    NEXT_PUBLIC_IMAGE_VERSION:
      process.env.VERCEL_GIT_COMMIT_SHA ||
      process.env.NEXT_PUBLIC_IMAGE_VERSION ||
      `build-${Date.now()}`,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
