import path from "path";
import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer'
import TerserPlugin from "terser-webpack-plugin";

// 如果您使用的是外部服务，则可能需要在script-src中插入其他域
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com giscus.app www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://accounts.google.com;
  img-src * blob: data: https://lh3.googleusercontent.com https://image.civitai.com;
  worker-src 'self' blob:;
  media-src 'self' *.s3.amazonaws.com;
  connect-src * data: blob:;
  font-src *;
  frame-src giscus.app https://accounts.google.com;
`;


const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

const nextConfig: NextConfig = {
  /* config options here */
  output,
  basePath,
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    dirs: ['app', 'pages', 'components', 'layouts', 'scripts'],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 不推荐生产环境用
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  webpack: (config, { isServer, dev }) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|mp4|mp3)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!isServer) {
      // ✅ 额外增加自定义 entry
      
    }

    // ✅ 开启混淆压缩（生产环境）
    if (!dev) {
      config.optimization.minimize = true;
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            compress: true,
            mangle: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ];
    }

    return config
  },

  async rewrites() {
    return [
      {
        source: '/mark_drop/:path*', // 本地请求路径（前端发起请求的路径）
        destination: 'http://www.markdropai.com:8080/mark_drop/:path*', // 目标代理服务器地址
      },
      // {
      //   source: '/mark_drop_oss/:path*', // 本地请求路径（前端发起请求的路径）
      //   destination: 'https://mark-drop-cn.oss-cn-hangzhou.aliyuncs.com/:path*', // 目标代理服务器地址
      // },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)
