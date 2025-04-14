import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // API Routes를 개별 실행 가능하도록 설정
  reactStrictMode: true,
  assetPrefix: process.env.NODE_ENV === "production" ? "." : "",
  trailingSlash: true, // 파일 탐색 오류를 방지
  images: {
    unoptimized: true, // 이미지 최적화 비활성화 (Error: Image Optimization using the default loader is not compatible with `{ output: 'export' }`.)
  },
  //CORS
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/history/:path*",
  //       destination: "http://172.168.20.152:8000/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
