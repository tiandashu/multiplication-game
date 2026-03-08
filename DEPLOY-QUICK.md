# 双平台部署快速指南

## 📋 概述

本项目支持同时部署到 **GitHub Pages** 和 **Gitee Pages**：

- **GitHub Pages**: 面向全球用户
- **Gitee Pages**: 面向国内用户（访问速度更快）

---

## 🚀 一键部署（推荐）

### 步骤1: 创建两个远程仓库

#### GitHub
1. 访问 https://github.com/new
2. 仓库名：`multiplication-game`
3. 选择 **Public**（公开）
4. 点击 `Create repository`

#### Gitee
1. 访问 https://gitee.com/projects/new
2. 仓库名：`multiplication-game`
3. 选择 **公开**
4. 点击 `创建`

### 步骤2: 添加远程仓库

```bash
cd /Users/xdf/.openclaw/workspace-craftsman/multiplication-game

# 添加 GitHub 远程仓库（替换 YOUR_USERNAME）
git remote add github https://github.com/YOUR_USERNAME/multiplication-game.git

# 添加 Gitee 远程仓库（替换 YOUR_USERNAME）
git remote add gitee https://gitee.com/YOUR_USERNAME/multiplication-game.git
```

### 步骤3: 推送代码

```bash
# 推送到 GitHub
git push -u github main

# 推送到 Gitee
git push -u gitee main
```

### 步骤4: 使用部署脚本

```bash
# 部署到所有平台
./deploy.sh

# 只部署到 GitHub
./deploy.sh github

# 只部署到 Gitee
./deploy.sh gitee
```

### 步骤5: 启用 Pages 服务

#### GitHub Pages
1. 访问 GitHub 仓库 → `Settings`
2. 左侧菜单 → `Pages`
3. Source 选择 `GitHub Actions`（或 `Deploy from a branch`）
4. 等待 1-3 分钟
5. 访问：`https://YOUR_USERNAME.github.io/multiplication-game`

#### Gitee Pages
1. 访问 Gitee 仓库 → `服务` 标签
2. 点击 `Gitee Pages 服务`
3. 分支选择 `main`，目录选择 `根目录`
4. 点击 `启动`
5. 等待 1-5 分钟
6. 访问：`https://YOUR_USERNAME.gitee.io/multiplication-game`

---

## 📊 部署状态检查

### GitHub
- 访问仓库的 `Actions` 标签
- 绿色 ✓ 表示部署成功

### Gitee
- 访问仓库的 `服务` → `Gitee Pages`
- 显示"已启动"表示部署成功

---

## 🔄 更新网站

### 更新代码后，执行：

```bash
# 使用部署脚本（推荐）
./deploy.sh

# 或手动推送
git push github main
git push gitee main
```

### 等待更新生效：
- GitHub: 1-3 分钟
- Gitee: 1-5 分钟

---

## 🌐 访问地址

部署完成后，你会得到两个访问地址：

- **GitHub Pages**: `https://YOUR_USERNAME.github.io/multiplication-game`
- **Gitee Pages**: `https://YOUR_USERNAME.gitee.io/multiplication-game`

**建议**：
- 分享给国内用户 → 使用 Gitee 地址
- 分享给国外用户 → 使用 GitHub 地址
- 同时分享两个地址 → 用户根据位置选择

---

## ❓ 常见问题

### Q: 为什么要部署到两个平台？

**A**:
- Gitee Pages 国内访问速度快
- GitHub Pages 全球访问速度快
- 同时部署确保所有用户都能快速访问

### Q: 如何选择使用哪个平台？

**A**:
- 主要面向国内用户 → 优先 Gitee Pages
- 主要面向国外用户 → 优先 GitHub Pages
- 两个平台同时部署，提供两个地址

### Q: 两个平台需要同步更新吗？

**A**:
- 是的，使用 `./deploy.sh all` 可以同时推送
- 或者分别执行 `git push github main` 和 `git push gitee main`

### Q: Gitee Pages 需要实名认证吗？

**A**:
- 是的，Gitee Pages 需要实名认证
- 在 Gitee 设置 → 账号安全 → 实名认证

---

## 📞 技术支持

- Telegram: @15701695793
- GitHub 文档: https://docs.github.com/pages
- Gitee 文档: https://gitee.com/help/articles/4136

---

**最后更新**: 2026-03-08
