#!/usr/bin/env bash

set -e  # 任一步失败就退出

APP_NAME="markdrop-web"
COMPOSE_FILE="docker-compose.yml"
APP_PORT="3000"

echo "=============================="
echo "🚀 Deploying Markdrop App"
echo "=============================="

# 1. 拉取最新代码（如果是 git 仓库）
if [ -d ".git" ]; then
  echo "📥 Pulling latest code..."
  git pull
else
  echo "⚠️  Not a git repository, skip git pull"
fi

# 2. 停止并删除旧容器
echo "🛑 Stopping old containers..."
docker compose -f $COMPOSE_FILE down

# 3. 构建新镜像（--no-cache 可选）
echo "🔨 Building Docker image..."
docker compose -f $COMPOSE_FILE build

# 4. 启动新容器（后台）
echo "▶️  Starting containers..."
docker compose -f $COMPOSE_FILE up -d

# 5. 清理无用镜像（可选，但推荐）
echo "🧹 Cleaning unused images..."
docker image prune -f

# 6. 显示状态
echo "📦 Container status:"
docker ps --filter "name=$APP_NAME"

echo "=============================="
echo "✅ Deployment finished!"
echo "🌍 App running on http://localhost:$APP_PORT"
echo "=============================="
