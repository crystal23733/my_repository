/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // GitHub Pages 배포를 위해 필요
  },
  basePath: process.env.NODE_ENV === 'production' ? '/my_repository' : '',  // 레포지토리 이름으로 수정
};

export default nextConfig;
