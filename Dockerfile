# 阶段1：构建项目（使用Node镜像，内置pnpm）
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制pnpm锁文件和配置文件（优先复制，利用Docker缓存）
COPY pnpm-lock.yaml package.json ./

# 安装pnpm（若Node镜像未内置，手动安装）
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install --frozen-lockfile

# 复制项目所有文件（排除.dockerignore中指定的文件）
COPY . .

# 构建Next.js项目（使用turbopack）
RUN pnpm run build

# 阶段2：运行项目（精简镜像，减小体积）
FROM node:20-alpine AS runner

# 设置工作目录
WORKDIR /app

# 复制构建阶段的产物
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 暴露Next.js默认端口（可自定义，需与启动命令一致）
EXPOSE 3000

# 启动项目
CMD ["pnpm", "run", "start"]