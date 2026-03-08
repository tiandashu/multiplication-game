# GitHub Pages 部署指南

## 📋 前置要求

1. 一个 GitHub 账号
2. Git 已安装（本地）
3. 项目代码已完成并提交到本地 Git 仓库

---

## 🚀 部署步骤

### 第一步：在 GitHub 创建仓库

1. 访问 [GitHub](https://github.com/)
2. 点击右上角的 `+` → `New repository`
3. 填写仓库信息：
   - **Repository name**: `multiplication-game`
   - **Description**: `9x9乘法口诀表挑战游戏`
   - **Public** ✅ （公开，才能部署到GitHub Pages）
4. 点击 `Create repository`

### 第二步：推送代码到 GitHub

在终端中执行以下命令：

```bash
cd /Users/xdf/.openclaw/workspace-craftsman/multiplication-game

# 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/multiplication-game.git

# 推送代码
git push -u origin main
```

**示例**：
```bash
git remote add origin https://github.com/johndoe/multiplication-game.git
git push -u origin main
```

### 第三步：启用 GitHub Pages

1. 访问你的 GitHub 仓库页面
2. 点击 `Settings` 标签
3. 在左侧菜单中找到 `Pages`（在 "Code and automation" 下）
4. 在 "Build and deployment" 部分：
   - **Source**: 选择 `GitHub Actions`
   - （如果显示 `Deploy from a branch`，就选择它）
     - **Branch**: `main`
     - **Folder**: `/ (root)`
5. 点击 `Save`

### 第四步：等待部署完成

1. GitHub 会自动开始部署
2. 等待 1-3 分钟
3. 访问 `Actions` 标签查看部署状态
4. 当看到绿色的 `✓` 时，表示部署成功

### 第五步：访问你的网站

访问地址：`https://YOUR_USERNAME.github.io/multiplication-game`

**示例**：
- GitHub 用户名：johndoe
- 网站地址：https://johndoe.github.io/multiplication-game

---

## 🔄 更新网站

当你修改代码后，执行：

```bash
cd /Users/xdf/.openclaw/workspace-craftsman/multiplication-game

# 查看修改
git status

# 添加修改
git add .

# 提交
git commit -m "Update: 你的修改说明"

# 推送到 GitHub
git push origin main
```

GitHub 会自动重新部署，几分钟后即可看到更新。

---

## ⚙️ 高级配置

### 自定义域名

1. 在 GitHub Pages 设置中，点击 `Custom domain`
2. 输入你的域名（如 `game.example.com`）
3. 添加 DNS 记录：
   - **类型**: CNAME
   - **名称**: game
   - **值**: YOUR_USERNAME.github.io
4. 等待 DNS 生效（可能需要几小时）

### 禁用 Jekyll

如果网站没有正常显示，可以尝试禁用 Jekyll：

在项目根目录创建 `.nojekyll` 文件：

```bash
cd /Users/xdf/.openclaw/workspace-craftsman/multiplication-game
touch .nojekyll
git add .nojekyll
git commit -m "Add .nojekyll"
git push origin main
```

---

## ❓ 常见问题

### Q1: 部署后显示 404 错误

**解决方案**：
1. 检查 `index.html` 是否在项目根目录
2. 检查 GitHub Pages 设置是否正确
3. 等待几分钟，GitHub 可能还在部署

### Q2: 网站样式不正常

**解决方案**：
1. 清除浏览器缓存
2. 检查 CDN 链接是否正确
3. 添加 `.nojekyll` 文件

### Q3: 推送代码时失败

**解决方案**：
1. 检查网络连接
2. 检查 GitHub 令牌是否过期
3. 使用 SSH 替代 HTTPS：
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/multiplication-game.git
   ```

### Q4: 如何查看部署日志？

1. 访问仓库的 `Actions` 标签
2. 点击最新的 workflow run
3. 查看部署日志

---

## 📊 部署检查清单

- [x] 创建 GitHub 仓库
- [ ] 推送代码到 GitHub
- [ ] 启用 GitHub Pages
- [ ] 等待部署完成
- [ ] 访问网站验证
- [ ] 测试游戏功能
- [ ] 分享给小朋友

---

## 🎉 完成后

恭喜！你的 9x9乘法口诀表挑战游戏已经部署到互联网上了！

现在你可以：
1. 分享给朋友和家人
2. 让小朋友在线练习
3. 随时更新和改进游戏

有问题？查看 GitHub Pages 文档：
https://docs.github.com/pages

---

**最后更新**: 2026-03-08
