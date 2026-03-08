#!/bin/bash

# GitHub Pages 自动部署脚本
# 使用方法: ./deploy.sh

echo "========================================"
echo "   GitHub Pages 自动部署"
echo "========================================"
echo ""

# 检查是否在项目目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 检查 git 是否已初始化
if [ ! -d ".git" ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# 检查是否已配置远程仓库
if ! git remote get-url origin &> /dev/null; then
    echo "❌ 错误: 未配置远程仓库"
    echo ""
    echo "请先配置远程仓库:"
    echo "  git remote add origin https://github.com/你的用户名/multiplication-game.git"
    exit 1
fi

echo "📤 推送到 GitHub..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" || true
git push origin main || git push origin master

echo ""
echo "✅ 部署完成！"
echo ""
echo "请访问: https://你的用户名.github.io/multiplication-game"
echo ""
echo "========================================"
