# Gitee Pages 部署指南

## 📋 前置要求

1. 一个 [Gitee](https://gitee.com/) 账号
2. Git 已安装（本地）
3. 项目代码已完成并提交到本地 Git 仓库
4. 实名认证（Gitee Pages需要）

---

## 🚀 部署步骤

### 第一步：在 Gitee 创建仓库

1. 访问 [Gitee](https://gitee.com/)
2. 登录后点击右上角的 `+` → `新建仓库`
3. 填写仓库信息：
   - **仓库名称**: `multiplication-game`
   - **仓库介绍**: `9x9乘法口诀表挑战游戏`
   - **是否开源**: ✅ 公开
   - **初始化仓库**: ❌ 不初始化
4. 点击 `创建`

### 第二步：推送代码到 Gitee

在终端中执行以下命令：

```bash
cd /Users/xdf/.openclaw/workspace-craftsman/multiplication-game

# 添加 Gitee 远程仓库（替换 YOUR_USERNAME 为你的 Gitee 用户名）
git remote add gitee https://gitee.com/YOUR_USERNAME/multiplication-game.git

# 推送代码到 Gitee
git push -u gitee main
```

**示例**：
```bash
git remote add gitee https://gitee.com/johndoe/multiplication-game.git
git push -u gitee main
```

### 第三步：启用 Gitee Pages

1. 访问你的 Gitee 仓库页面
2. 点击顶部的 `服务` 标签
3. 找到 `Gitee Pages`，点击 `Gitee Pages 服务`
4. 在 Gitee Pages 页面：
   - **部署分支**: 选择 `main`
   - **部署目录**: 选择 `根目录` (root)
   - 勾选 `强制使用HTTPS`
5. 点击 `启动` 按钮

### 第四步：等待部署完成

1. Gitee 会自动开始部署
2. 等待 1-5 分钟
3. 部署完成后，会显示访问地址

### 第五步：访问你的网站

访问地址：`https://YOUR_USERNAME.gitee.io/multiplication-game`

**示例**：
- Gitee 用户名：johndoe
- 网站地址：https://johndoe.gitee.io/multiplication-game

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

# 推送到 Gitee
git push gitee main
```

推送后，Gitee Pages 会自动重新部署。

**注意**：Gitee Pages 更新可能需要等待 1-5 分钟才能生效。

---

## 🔒 Gitee Pages 特殊注意事项

### 1. 实名认证
Gitee Pages 需要实名认证才能使用：
1. 登录 Gitee
2. 点击右上角头像 → `设置`
3. 在左侧菜单找到 `账号安全`
4. 完成 `实名认证`

### 2. 空间限制
- **免费版**: 单个文件最大 10MB，总空间 1GB
- 本项目完全满足（~20KB）

### 3. 更新频率
- **免费版**: 每天更新次数有限（通常够用）
- 更新后可能需要等待 1-5 分钟

### 4. 自定义域名
- 免费版不支持自定义域名
- 付费版支持

---

## 📊 Gitee vs GitHub Pages

| 特性 | Gitee Pages | GitHub Pages |
|------|-------------|--------------|
| 国内访问速度 | ✅ 快 | ❌ 慢 |
| 免费 | ✅ 免费 | ✅ 免费 |
| 自定义域名 | ❌ 付费支持 | ✅ 免费 |
| 更新频率 | ⚠️ 有限 | ✅ 无限制 |
| 流量限制 | ✅ 无 | ✅ 无 |
| HTTPS | ✅ 支持 | ✅ 支持 |

**推荐**：
- 国内用户优先：Gitee Pages
- 国外用户优先：GitHub Pages
- 可以同时部署两个平台

---

## ❓ 常见问题

### Q1: Gitee Pages 显示"未启动"或"部署失败"

**解决方案**：
1. 检查仓库是否公开
2. 检查是否完成实名认证
3. 检查 `index.html` 是否在项目根目录
4. 检查仓库内容大小（不要超过限制）
5. 联系 Gitee 客服

### Q2: 推送代码后网站没有更新

**解决方案**：
1. 等待 5-10 分钟（Gitee 更新较慢）
2. 刷新浏览器缓存
3. 检查 Gitee Pages 的部署状态
4. 尝试重新启动 Gitee Pages

### Q3: Gitee Pages 需要实名认证

**解决方案**：
1. 登录 Gitee
2. 进入 `设置` → `账号安全`
3. 完成 `实名认证`（需要身份证）

### Q4: 如何同时部署到 GitHub 和 Gitee？

**解决方案**：
```bash
# 添加两个远程仓库
git remote add github https://github.com/YOUR_USERNAME/multiplication-game.git
git remote add gitee https://gitee.com/YOUR_USERNAME/multiplication-game.git

# 同时推送到两个平台
git push github main
git push gitee main
```

或者创建快捷命令：
```bash
# 一次性推送到所有远程仓库
git push --all
```

### Q5: Gitee Pages 访问 404

**解决方案**：
1. 检查仓库是否公开
2. 检查 Gitee Pages 是否已启动
3. 检查 URL 是否正确
4. 等待几分钟再尝试

---

## 🛡️ 静态资源优化

Gitee Pages 有以下建议：

1. **文件命名**
   - 使用小写字母
   - 使用连字符 `-` 代替空格
   - 避免使用中文文件名

2. **资源引用**
   - 使用相对路径
   - 避免使用绝对路径

3. **CDN 加速**
   - 推荐使用国内 CDN
   - 本项目已使用 BootCDN（国内镜像）

---

## 📊 部署检查清单

- [x] 创建 Gitee 仓库
- [ ] 完成实名认证
- [ ] 推送代码到 Gitee
- [ ] 启用 Gitee Pages
- [ ] 等待部署完成
- [ ] 访问网站验证
- [ ] 测试游戏功能
- [ ] 分享给小朋友

---

## 🎯 推荐使用场景

### Gitee Pages 适合
- ✅ 主要面向国内用户
- ✅ 需要快速访问速度
- ✅ 不需要自定义域名
- ✅ 小型静态网站

### GitHub Pages 适合
- ✅ 面向全球用户
- ✅ 需要自定义域名
- ✅ 需要更快的更新速度
- ✅ 与 GitHub 生态集成

---

## 🌐 双平台部署

建议同时部署到两个平台：

```bash
# 推送到 GitHub
git push github main

# 推送到 Gitee
git push gitee main
```

然后提供两个访问地址：
- 国内用户：Gitee Pages 地址
- 国外用户：GitHub Pages 地址

---

## 📞 技术支持

- Gitee 文档：https://gitee.com/help/articles/4136
- Telegram: @15701695793

---

## 🎉 完成后

恭喜！你的 9x9乘法口诀表挑战游戏已经部署到 Gitee Pages 上了！

国内用户访问速度更快，更适合小朋友使用。

---

**最后更新**: 2026-03-08
