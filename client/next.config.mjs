/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  // GitHub Pages 배포를 위해 필요
  },
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',  // 레포지토리 이름으로 수정
};

export default nextConfig;
