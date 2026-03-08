<<<<<<< HEAD
# 9x9乘法口诀表挑战

一个帮助小朋友学习和记忆9x9乘法口诀表的网页游戏。

## ✨ 功能特点

- 🎮 **随机出题**：从1×1到9×9的乘法口诀中随机出题
- ⏱️ **计时答题**：记录每道题的答题时间
- 📊 **实时统计**：显示题目数、正确数、平均用时
- 🏆 **排行榜**：按照平均用时排名，记录历史成绩
- 📱 **响应式设计**：完美适配PC和移动端
- 💾 **本地存储**：使用localStorage保存排行榜数据
- 🎨 **精美界面**：渐变色设计，流畅动画
- 🌐 **双平台部署**：支持 GitHub Pages 和 Gitee Pages

## 🚀 快速开始

### 在线体验

#### GitHub Pages
访问：[https://yourusername.github.io/multiplication-game](https://yourusername.github.io/multiplication-game)

#### Gitee Pages（国内访问更快）
访问：[https://yourusername.gitee.io/multiplication-game](https://yourusername.gitee.io/multiplication-game)

### 本地运行

```bash
# 克隆或下载项目
cd multiplication-game

# 直接打开 index.html
open index.html
```

## 🎮 游戏玩法

1. 点击"开始挑战"按钮
2. 系统会随机出一道乘法题
3. 从四个选项中选择正确答案
4. 系统会自动进入下一题
5. 随时可以点击"停止挑战"
6. 查看成绩和排行榜

## 📊 排行榜规则

- 按照平均用时排序，用时越少排名越高
- 至少答对5题才能进入排行榜
- 只保留前10名记录
- 数据保存在浏览器的localStorage中

## 🌐 部署指南

### GitHub Pages

详细步骤请查看：[DEPLOY.md](DEPLOY.md)

1. 创建 GitHub 仓库
2. 推送代码
3. 启用 GitHub Pages
4. 访问网站

### Gitee Pages（推荐国内用户）

详细步骤请查看：[DEPLOY-GITEE.md](DEPLOY-GITEE.md)

1. 创建 Gitee 仓库
2. 完成实名认证
3. 推送代码
4. 启用 Gitee Pages
5. 访问网站

### 双平台部署

同时部署到两个平台：

```bash
# 添加两个远程仓库
git remote add github https://github.com/YOUR_USERNAME/multiplication-game.git
git remote add gitee https://gitee.com/YOUR_USERNAME/multiplication-game.git

# 推送到两个平台
git push github main
git push gitee main
```

或者使用部署脚本：

```bash
# 部署到所有平台
./deploy.sh

# 只部署到 GitHub
./deploy.sh github

# 只部署到 Gitee
./deploy.sh gitee
```

## 🛠️ 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript (ES6)** - 游戏逻辑
- **Bootstrap 5** - 响应式框架
- **Bootstrap Icons** - 图标库

## 📱 兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

## 📦 项目结构

```
multiplication-game/
├── index.html              # 主页面
├── game.js                # 游戏逻辑
├── README.md              # 项目说明
├── DEPLOY.md              # GitHub 部署指南
├── DEPLOY-GITEE.md        # Gitee 部署指南
├── DELIVERY.md            # 交付报告
├── deploy.sh              # 部署脚本
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions 配置
```

## 🎯 教育价值

- 帮助小朋友熟练掌握9x9乘法口诀表
- 通过游戏化方式提高学习兴趣
- 培养快速计算能力
- 培养专注力和反应能力

## 🌍 平台对比

| 特性 | GitHub Pages | Gitee Pages |
|------|-------------|-------------|
| 国内访问速度 | 慢 | 快 |
| 免费 | 是 | 是 |
| 自定义域名 | 支持 | 付费支持 |
| 更新频率 | 无限制 | 有限制 |
| HTTPS | 支持 | 支持 |

**推荐**：
- 国内用户优先：Gitee Pages
- 国外用户优先：GitHub Pages
- 可以同时部署两个平台

## 📝 更新日志

### v1.1.0 (2026-03-08)
- ✅ 添加 Gitee Pages 支持
- ✅ 添加双平台部署脚本
- ✅ 更新部署文档

### v1.0.0 (2026-03-08)
- ✅ 初始版本发布
- ✅ 随机出题功能
- ✅ 计时和统计功能
- ✅ 排行榜功能
- ✅ 响应式设计
- ✅ 部署到 GitHub Pages

## 👨‍💻 开发者

**工匠**

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有使用这个游戏的小朋友和家长！

---

**玩得开心！** 🎉
=======
# 9×9 乘法口诀挑战 🧮

一个帮助小朋友加深乘法记忆的互动游戏。

## 功能特性

- 🎯 **随机出题**: 从 9×9 乘法口诀表中随机出题
- 📝 **四选一**: 每道题提供 4 个选项（1 个正确答案 + 3 个混淆项）
- ⏱️ **计时功能**: 实时显示每道题的答题时间
- 📊 **统计分析**: 自动计算正确率和平均用时
- 🏆 **排行榜**: 按平均用时排名的历史记录
- 📱 **响应式设计**: 完美支持 PC 和移动端
- 💾 **本地存储**: 使用 localStorage 保存历史记录

## 快速开始

### 在线体验

访问 GitHub Pages 部署的页面（部署后会在此更新链接）

### 本地运行

1. 克隆仓库
```bash
git clone <repository-url>
cd multiplication-game
```

2. 直接打开
```bash
open index.html
```

或者使用本地服务器：
```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

## 使用方法

1. 点击 **"开始挑战"** 按钮开始
2. 快速选择正确的答案
3. 随时可以点击 **"停止挑战"** 结束
4. 查看成绩统计和排行榜
5. 点击 **"再来一次"** 重新挑战

## 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式和动画（使用 Flexbox 和 Grid）
- **JavaScript (ES6+)**: 游戏逻辑和交互
- **localStorage**: 数据持久化
- **GitHub Pages**: 自动部署

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 开发计划

- [ ] 添加难度级别（简单/中等/困难）
- [ ] 添加音效和动画
- [ ] 支持自定义题目数量
- [ ] 添加分享功能
- [ ] 支持多种语言

## License

MIT License

---

**祝学习愉快！** 🎓
>>>>>>> 09fff3d9048dd20725bb4ab348ceda07e7e0ea65
