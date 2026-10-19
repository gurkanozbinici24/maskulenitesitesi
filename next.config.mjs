/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Eski vercel.app adresi kalıcı olarak asıl alan adına yönlenir (Google tek adres görsün).
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "maskulenitesitesi.vercel.app" }],
        destination: "https://www.maskulenitesitesi.com.tr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
