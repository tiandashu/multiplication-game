#!/bin/bash

# 自动部署脚本（支持 GitHub 和 Gitee）
# 使用方法: ./deploy.sh [github|gitee|all]

# 默认部署到所有平台
TARGET="${1:-all}"

echo "========================================"
echo "   自动部署脚本"
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
    git branch -m main
    git add .
    git commit -m "Initial commit"
fi

# 添加并提交
echo "📝 提交代码..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')" || echo "没有新的提交"

echo ""

# 部署到 GitHub
if [ "$TARGET" = "github" ] || [ "$TARGET" = "all" ]; then
    if git remote get-url github &> /dev/null; then
        echo "📤 推送到 GitHub..."
        git push github main
        echo "✅ GitHub 部署完成"
        echo ""
    else
        echo "⚠️  未配置 GitHub 远程仓库"
        echo "   运行: git remote add github https://github.com/YOUR_USERNAME/multiplication-game.git"
        echo ""
    fi
fi

# 部署到 Gitee
if [ "$TARGET" = "gitee" ] || [ "$TARGET" = "all" ]; then
    if git remote get-url gitee &> /dev/null; then
        echo "📤 推送到 Gitee..."
        git push gitee main
        echo "✅ Gitee 部署完成"
        echo ""
    else
        echo "⚠️  未配置 Gitee 远程仓库"
        echo "   运行: git remote add gitee https://gitee.com/YOUR_USERNAME/multiplication-game.git"
        echo ""
    fi
fi

echo "========================================"
echo "   部署完成！"
echo "========================================"
echo ""

if [ "$TARGET" = "all" ] || [ "$TARGET" = "github" ]; then
    if git remote get-url github &> /dev/null; then
        echo "GitHub Pages:"
        echo "  https://你的用户名.github.io/multiplication-game"
        echo ""
    fi
fi

if [ "$TARGET" = "all" ] || [ "$TARGET" = "gitee" ]; then
    if git remote get-url gitee &> /dev/null; then
        echo "Gitee Pages:"
        echo "  https://你的用户名.gitee.io/multiplication-game"
        echo ""
    fi
fi

echo "========================================"
echo ""
echo "💡 提示："
echo "   - GitHub 更新: 1-3 分钟"
echo "   - Gitee 更新: 1-5 分钟"
echo "   - 查看详细部署指南:"
echo "     • GitHub: 查看 DEPLOY.md"
echo "     • Gitee:  查看 DEPLOY-GITEE.md"
echo ""
