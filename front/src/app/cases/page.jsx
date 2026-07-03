"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";

const arrowRight = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>);

const filters = ["全部", "行业分析", "竞品调研", "趋势预判", "学术调研"];

const cases = [
  {
    category: "行业分析", tag: "AI Agent", date: "2026.07.02",
    title: "2026 年全球 AI Agent 市场规模与竞争格局分析",
    desc: "深度分析全球 AI Agent 市场格局，覆盖 OpenAI、Anthropic、Google 等头部厂商，含市场规模、份额分布、趋势预判。",
    stats: [["18", "页"], ["247", "数据源"], ["92%", "可信度"]],
    href: "/report",
    coverBg: "linear-gradient(135deg, var(--accent-soft-2), var(--accent-2-soft))",
    mock: ["w1", "w2", "w3", "b1", "b2", "b3", "w4", "w5"],
  },
  {
    category: "竞品调研", tag: "新能源车", date: "2026.06.28",
    title: "新能源车 2026 年市场趋势与政策走向",
    desc: "覆盖比亚迪、特斯拉、蔚来等主流品牌的产品、定价、用户评价对比，分析补贴退坡后的竞争格局。",
    stats: [["12", "页"], ["156", "数据源"], ["94%", "可信度"]],
    href: "/report",
    coverBg: "linear-gradient(135deg, #E8F5EE, #D4F5E8)",
    mock: ["w1", "w3", "w2", "b2", "b4", "b1", "w5", "w4"],
    flexes: [2.5, 1, 1],
  },
  {
    category: "趋势预判", tag: "大模型", date: "2026.06.21",
    title: "大模型在企业落地的最新进展与挑战",
    desc: "调研金融、医疗、制造等行业的大模型落地案例，分析技术瓶颈、成本结构与组织适配问题。",
    stats: [["14", "页"], ["198", "数据源"], ["90%", "可信度"]],
    href: "/report",
    coverBg: "linear-gradient(135deg, #F0EBFB, #E8E0FB)",
    mock: ["w1", "w2", "w4", "b3", "b1", "b4", "w3", "w5"],
    flexes: [2, 1, 1],
  },
  {
    category: "学术调研", tag: "医疗 AI", date: "2026.06.15",
    title: "医疗 AI 影像诊断 2026 年审批进展与商业化调研",
    desc: "梳理 NMPA 三类医疗器械证批准节奏，分析 AI 影像产品的商业化路径与投资格局。",
    stats: [["28", "页"], ["312", "数据源"], ["91%", "可信度"]],
    href: "/report",
    coverBg: "linear-gradient(135deg, #FDF0E4, #FDE8D4)",
    mock: ["w1", "w4", "w2", "b4", "b2", "b3", "w5", "w3"],
    flexes: [1.5, 1, 2],
  },
  {
    category: "竞品调研", tag: "跨境电商", date: "2026.06.08",
    title: "跨境电商独立站 2026 年运营策略调研",
    desc: "分析 SHEIN、Temu 等平台的独立站模式，对比 Shopify、Shoplazza 等建站工具，输出运营策略建议。",
    stats: [["10", "页"], ["134", "数据源"], ["93%", "可信度"]],
    href: "/report",
    coverBg: "linear-gradient(135deg, #E4F0FB, #D4E8FB)",
    mock: ["w1", "w3", "w5", "b1", "b3", "b2", "w2", "w4"],
    flexes: [2, 1, 1],
  },
  {
    category: "行业分析", tag: "金融科技", date: "2026.05.30",
    title: "2026 年中国金融科技监管政策与创新趋势",
    desc: "梳理央行、银保监最新政策动向，分析数字人民币、智能投顾、开放银行等创新方向的发展前景。",
    stats: [["22", "页"], ["267", "数据源"], ["89%", "可信度"]],
    href: "/report",
    coverBg: "linear-gradient(135deg, #FBE4E4, #FBD4D4)",
    mock: ["w1", "w2", "w4", "b4", "b1", "b2", "w3", "w5"],
    flexes: [2, 1, 1],
  },
];

function MockBar({ idx, flexes }) {
  const cls = `mock-bar-item b${idx + 1}`;
  const flex = flexes ? flexes[idx] : idx === 0 ? 2 : idx === 2 ? 1.5 : 1;
  return <div className={cls} style={{ flex }} />;
}

export default function CasesPage() {
  const [filter, setFilter] = useState("全部");
  const visible = cases.filter((c) => filter === "全部" || c.category === filter);

  return (
    <div className="cases-body">
      <TopNav active="cases" ctaLabel="免费开始" />

      <main className="cases-wrap" id="content">
        <div className="cases-head" data-od-id="cases-head">
          <p className="eyebrow">案例展示</p>
          <h1>看看 InsightMesh 能产出什么</h1>
          <p className="lead">以下是使用 InsightMesh 自动生成的真实调研案例。输入主题，几分钟即可获得同质量的深度报告。</p>
        </div>

        <div className="cases-filter" data-od-id="filter">
          {filters.map((f) => (
            <span
              key={f}
              className={`filter-chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="case-grid" data-od-id="cases">
          {visible.map((c, i) => (
            <article
              key={i}
              className="case-card"
              data-category={c.category}
              style={{ animation: "fadeIn 0.3s ease-out both" }}
              onClick={() => { if (c.href) window.location.href = c.href; }}
            >
              <div className="case-cover" style={{ background: c.coverBg }}>
                <div className="case-cover-mock">
                  {c.mock.slice(0, 3).map((m, j) => (
                    <div key={j} className={`mock-line ${m}`} />
                  ))}
                  <div className="mock-bar">
                    {[0, 1, 2].map((k) => <MockBar key={k} idx={k} flexes={c.flexes} />)}
                  </div>
                  {c.mock.slice(3).map((m, j) => (
                    <div key={j} className={`mock-line ${m}`} />
                  ))}
                </div>
                <span className="case-cover-badge pill">{c.category}</span>
              </div>
              <div className="case-body">
                <div className="case-meta">
                  <span className="tag">{c.tag}</span>
                  <span className="date">{c.date}</span>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="case-foot">
                  <div className="case-stats">
                    {c.stats.map(([v, l]) => (
                      <span key={l} className="case-stat"><strong>{v}</strong> {l}</span>
                    ))}
                  </div>
                  <span className="case-link">查看报告 {arrowRight}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="pagefoot" data-od-id="footer">
        <div className="container">
          <div className="row-between">
            <span className="text-muted-2">© 2026 InsightMesh Inc.</span>
            <Link href="/create" className="text-accent font-medium">开始你的调研 →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
