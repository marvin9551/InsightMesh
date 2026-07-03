# InsightMesh — 多 AI Agent 智能调研平台

> 输入任意主题，5 个专业 AI Agent 并行协作，五分钟产出结构化调研报告。

InsightMesh 是一个基于多 Agent 协作的智能调研平台。用户只需输入调研主题，系统自动调度 5 个分工明确的 AI Agent——信息采集、数据核验、观点分析、内容整合、报告生成——并行执行、交叉验证，将过去需要数天的调研工作压缩到几分钟。

---

## 项目结构

```
InsightMesh/
├── front/                    # 前端 — Next.js 14 + React 18
│   ├── src/
│   │   ├── app/              # 页面路由（App Router）
│   │   └── components/       # 共享组件
│   ├── public/               # 静态资源
│   ├── package.json
│   └── next.config.mjs
│
├── app/                      # 后端 — FastAPI + DeepAgents
│   ├── main.py               # FastAPI 应用入口
│   ├── api/                  # API 路由层
│   │   └── routes/           # 各模块路由
│   └── agents/               # Agent 编排层（DeepAgents）
│
├── main.py                   # uvicorn 启动脚本
├── pyproject.toml            # Python 依赖声明（uv 管理）
├── uv.lock                   # 依赖锁定文件
└── .python-version           # Python 3.12
```

---

## 技术栈

### 前端

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 14.x | React 全栈框架，App Router |
| React | 18.3 | UI 组件库 |
| CSS | 原生全局样式 | 极简科技 SaaS 风格 |

### 后端

| 技术 | 版本 | 说明 |
|------|------|------|
| FastAPI | 0.139+ | 高性能异步 Web 框架 |
| Uvicorn | 0.49+ | ASGI 服务器 |
| DeepAgents | 0.6+ | 多 Agent 编排框架（基于 LangGraph） |
| Python | 3.12+ | 运行时 |
| uv | — | Python 包管理工具 |

---

## 页面一览

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 主题输入 + 热门模板 + 适用场景 + 数据展示 |
| `/features` | 功能介绍 | 6 大核心功能卡片展示 |
| `/how` | 协作原理 | 5 个 Agent 分工 + 可视化协作拓扑 |
| `/create` | 创建调研 | 主题确认 + 维度配置 + 深度档位 + 输出格式 |
| `/execution` | 实时执行 | Agent 看板 + 实时日志 + 进度条 |
| `/report` | 调研报告 | 完整结构化报告 + 图表 + 引用溯源 |
| `/profile` | 个人中心 | 历史报告管理 + 搜索筛选 |
| `/cases` | 案例展示 | 使用案例与场景 |
| `/login` | 登录注册 | 身份认证 |

### 特殊状态页

| 路由 | 说明 |
|------|------|
| `/states/loading` | 加载中状态 |
| `/states/empty` | 空数据引导 |
| `/states/error` | 调研失败重试 |
| `/states/network` | 网络异常提示 |
| `/states/permission` | 权限不足引导 |

---

## 多 Agent 协作架构

InsightMesh 为每个调研主题自动调度 5 个专业 Agent：

```
         ┌──────────────┐
         │   信息采集    │ ← 并行检索 200+ 数据源
         └──────┬───────┘
                ▼
         ┌──────────────┐
         │   数据核验    │ ← 交叉比对，标注可信度
         └──────┬───────┘
                ▼
         ┌──────────────┐
         │   观点分析    │ ← 提炼共识与争议焦点
         └──────┬───────┘
                ▼
         ┌──────────────┐
         │   内容整合    │ ← 结构化重组信息流
         └──────┬───────┘
                ▼
         ┌──────────────┐
         │   报告生成    │ ← 图表 + 引用 + 导出
         └──────────────┘
```

---

## 快速开始

### 环境要求

- **Node.js** 18+（前端）
- **Python** 3.12+（后端）
- **uv**（Python 包管理器）

### 前端启动

```bash
cd front
npm install
npm run dev
```

前端默认运行在 `http://localhost:3000`。

### 后端启动

```bash
# 安装依赖（首次）
uv sync

# 启动开发服务器
uv run python main.py
```

后端默认运行在 `http://localhost:8000`。

API 文档自动生成：`http://localhost:8000/docs`

---

## 开发指南

### 添加新的 API 路由

1. 在 `app/api/routes/` 下新建路由文件
2. 在 `app/api/__init__.py` 中注册路由

```python
# app/api/routes/example.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_items():
    return {"items": []}
```

```python
# app/api/__init__.py
from app.api.routes import example

router.include_router(example.router, prefix="/example", tags=["example"])
```

### 添加新的前端页面

在 `front/src/app/` 下创建新目录和 `page.jsx` 文件即可，Next.js App Router 会自动注册路由。

### 依赖管理

```bash
# 添加 Python 依赖
uv add <package-name>

# 添加开发依赖
uv add --dev <package-name>

# 同步依赖
uv sync
```

---

## API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/health` | 健康检查 |
| GET | `/api/research/` | 列出调研任务 |
| POST | `/api/research/` | 创建调研任务 |

> API 仍在早期开发阶段，后续将补充完整的调研流程接口。

---

## 核心功能

- **全网深度采集** — 同时检索 200+ 数据源，构建覆盖全面的原始信息池
- **交叉真伪核验** — 多源数据交叉比对，自动标注可信度评分
- **多维观点提炼** — 识别主流共识、争议焦点、正反论据
- **可视化数据图表** — 自动生成饼图、折线图、柱状图
- **一键导出报告** — 支持 PDF、Markdown、Word 多格式导出
- **实时进度可视** — 全程可视化 Agent 工作状态与日志

---

## License

Private — © 2026 InsightMesh Inc.
