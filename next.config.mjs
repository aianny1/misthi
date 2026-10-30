/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: the whole site builds to plain HTML/CSS/JS in /out,
  // so it can be hosted free on Vercel, Netlify or any static host.
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
