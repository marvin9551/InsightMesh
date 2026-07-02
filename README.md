# InsightMesh — 多 AI Agent 智能调研平台

基于 Open Design 原型（`调研报告` 项目）转换的 Next.js / React 高保真可交互原型。
保留原有极简科技 SaaS 视觉、布局、交互与素材。

## 技术栈

- **Next.js 14**（App Router，JavaScript）
- **React 18**
- 全局样式：`src/app/globals.css`（合并自原 `styles/tokens.css` + `styles/global.css` + 各页面 `<style>` 块）
- 字体：Inter / 苹方系统字体栈，JetBrains Mono 等宽字体栈

## 项目结构

```
src/
  app/
    layout.jsx            # 根布局（<html lang="zh-CN"> + 全局 CSS）
    globals.css           # 设计 token + 共享组件 + 各页面样式
    page.jsx              # 启动器（6 主页面 + 5 状态页入口）
    home/page.jsx         # 首页着陆页（hero 输入 / 模板 / Agent 可视化 / 功能 / 场景 / 数据 / CTA）
    create/page.jsx       # 调研任务创建页（维度多选 / 深度单选 / 格式多选）
    execution/page.jsx    # 多 Agent 实时执行页（进度条动画 / Agent 看板 / 实时日志）
    report/page.jsx       # 调研结果报告页（目录 / 柱图 / 环图 / 优劣 / 来源溯源）
    profile/page.jsx      # 个人中心（侧边栏切换 / 报告列表 / 搜索筛选 / 统计 / 设置）
    login/page.jsx        # 登录 / 注册（Tab 切换 / 密码显隐 / 第三方登录）
    cases/page.jsx        # 案例展示（分类筛选）
    states/
      loading/page.jsx
      empty/page.jsx
      error/page.jsx
      network/page.jsx
      permission/page.jsx
  components/
    LogoMark.jsx          # 品牌 logo 标识
    TopNav.jsx            # 共享顶部导航（active 高亮 + CTA 配置）
public/
  assets/                 # 原型 PNG 素材
```

## 交互保真说明

原型中的 JavaScript 交互全部用 React state 重写，行为与原 HTML 版本一致：

- **home** — hero 输入框回车跳转 `/create`；模板 chip 点击填入主题
- **create** — 维度 chip 多选、深度三选一、格式多选；底部动态显示预计耗时与输出格式
- **execution** — 整体进度条按 `setInterval` 模拟递增（上限 98%）
- **profile** — 侧边栏切换 reports / stats / settings 三段；报告列表支持搜索 + 状态筛选
- **login** — 登录 / 注册 Tab 切换（含箭头键导航、焦点管理）、密码显隐、提交跳转 `/profile`
- **cases** — 分类 chip 筛选，卡片带 fadeIn 动画

## 运行

```bash
npm install
npm run dev
```

开发服务器默认在 http://localhost:3000 启动。

## 预览路由

| 路径 | 页面 |
| --- | --- |
| `/` | 启动器（页面索引） |
| `/home` | 首页 |
| `/create` | 调研任务创建 |
| `/execution` | 多 Agent 实时执行 |
| `/report` | 调研结果报告 |
| `/profile` | 个人中心 · 我的报告 |
| `/login` | 登录 / 注册 |
| `/cases` | 案例展示 |
| `/states/loading` | 状态：加载中 |
| `/states/empty` | 状态：空数据 |
| `/states/error` | 状态：调研失败重试 |
| `/states/network` | 状态：网络异常 |
| `/states/permission` | 状态：权限提示 |

## 验证

```bash
npm run build     # 生产构建（已通过：14 路由全部静态预渲染）
npm run lint      # 代码检查
```

构建产物：所有 14 个路由均为 `○ (Static)` 静态预渲染，首屏 JS ~87–101 kB。

## 与原型的差异

- 静态 `<a href="home.html">` 跳转改为 Next.js `<Link>` 客户端导航
- `onclick` 内联脚本改为 React 事件处理与 `useState`
- 原 6 个 HTML + 5 个状态 HTML + 2 个 CSS 文件 → 单一 `globals.css` + 14 个路由组件
- 视觉、文案、图标、配色、布局、动画与原型一致
