/** @type {import('next').NextConfig} */
// Served at tools.roguefinance.us/cost-of-living. basePath makes Next emit its
// assets under /cost-of-living/_next/* instead of /_next/*, so they don't
// collide with the other tools sharing that domain.
const nextConfig = { basePath: '/cost-of-living' };
export default nextConfig;
