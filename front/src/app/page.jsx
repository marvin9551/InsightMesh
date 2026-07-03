"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopNav from "@/components/TopNav";

const arrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const templates = [
  { label: "AI Agent 行业调研", value: "2026 年全球 AI Agent 市场规模与竞争格局" },
  { label: "大模型企业落地", value: "大模型在企业落地的最新进展与挑战" },
  { label: "新能源车趋势", value: "新能源车 2026 年市场趋势与政策走向" },
  { label: "跨境电商运营", value: "跨境电商独立站 2026 年运营策略" },
];

const scenarios = [
  { num: "01 · 职场调研", title: "行业分析报告", desc: "快速了解新行业格局、市场规模、头部玩家，为战略决策提供数据支撑。" },
  { num: "02 · 学术调研", title: "文献综述助手", desc: "梳理某一领域的研究现状、关键论文、主流方法与未解问题，加速开题。" },
  { num: "03 · 行业分析", title: "市场进入研判", desc: "评估目标市场的规模、增速、竞争格局、政策风险，输出可行性分析。" },
  { num: "04 · 竞品调研", title: "竞品深度拆解", desc: "自动采集竞品的产品、定价、用户评价、优劣势，生成对比报告。" },
];

const trustLogos = ["ByteDance", "Meituan", "Ant Group", "MINISO", "Xiaomi", "SHEIN"];

function HeroInputZone({ placeholder }) {
  const [topic, setTopic] = useState("");
  const router = useRouter();
  const start = () => router.push("/create");
  return (
    <div className="hero-input-zone animate-fade-in" style={{ animationDelay: "240ms" }}>
      <div className="hero-input-row">
        <input
          className="hero-input"
          type="text"
          placeholder={placeholder}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") start(); }}
        />
        <button className="btn btn-primary btn-lg hero-submit" onClick={start}>
          开始调研
          {arrowRight}
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="home-body">
      <TopNav active="features" ctaLabel="免费开始" />

      {/* Hero */}
      <section className="hero-wrap" data-od-id="hero">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-badge animate-fade-in">
            <span className="dot" />
            <span>多Agent智能协作 · 全自动调研</span>
          </div>
          <h1 className="hero-title animate-fade-in" style={{ animationDelay: "80ms" }}>
            输入任意主题，<br />
            <span className="grad">五分钟</span>产出<span className="grad">结构化调研报告</span>
          </h1>
          <p className="hero-sub animate-fade-in" style={{ animationDelay: "160ms" }}>
            5 个专业 AI Agent 并行协作——自动采集全网信息、交叉核验数据真伪、提炼多维观点，输出可直接使用的深度报告。
          </p>

          <HeroInputZone placeholder="输入调研主题，例如：2026 年 AI Agent 行业格局分析" />

          {/* Templates */}
          <div className="hero-templates animate-fade-in" style={{ animationDelay: "320ms" }}>
            <TemplateChips />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="trust-bar" data-od-id="trust">
        <div className="container">
          <div className="trust-label">已有 12,400+ 团队与个人使用</div>
          <div className="trust-logos">
            {trustLogos.map((l) => (
              <span key={l} className="trust-logo">{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <section className="section" style={{ background: "var(--surface)" }} data-od-id="scenarios">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">适用场景</p>
            <h2 className="h-section">一个平台，覆盖所有调研需求</h2>
            <p className="lead">无论你是职场人士、学生、科研人员还是运营从业者，InsightMesh 都能在几分钟内交付高质量调研成果。</p>
          </div>
          <div className="scenario-grid">
            {scenarios.map((s) => (
              <div key={s.num} className="scenario-card">
                <div className="num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-band" data-od-id="stats">
        <div className="container">
          <div className="grid-4" style={{ textAlign: "center" }}>
            <div className="stat-cell"><div className="num">12,400+</div><div className="lbl">注册用户</div></div>
            <div className="stat-cell"><div className="num">380,000</div><div className="lbl">已完成调研</div></div>
            <div className="stat-cell"><div className="num">4.2 min</div><div className="lbl">平均完成时长</div></div>
            <div className="stat-cell"><div className="num">96.4%</div><div className="lbl">用户满意度</div></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-band" data-od-id="cta">
        <h2 className="h-section">现在就开始你的第一次智能调研</h2>
        <p className="lead">免费体验 3 次完整调研，无需信用卡。</p>
        <HeroInputZone placeholder="输入调研主题..." />
      </section>

      {/* Footer */}
      <footer className="pagefoot" data-od-id="footer">
        <div className="container">
          <div className="row-between">
            <div className="row gap-3">
              <span className="logo" style={{ fontSize: "var(--text-md)" }}>
                <span className="logo-mark" style={{ width: 22, height: 22 }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>
                </span>
                InsightMesh
              </span>
              <span className="text-muted-2">© 2026 InsightMesh Inc.</span>
            </div>
            <div className="row gap-8">
              <a href="#" className="text-muted">关于我们</a>
              <a href="#" className="text-muted">隐私政策</a>
              <a href="#" className="text-muted">服务条款</a>
              <a href="#" className="text-muted">联系支持</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TemplateChips() {
  const [value, setValue] = useState("");
  return (
    <>
      <span className="hero-templates-label">热门模板：</span>
      {templates.map((t) => (
        <span
          key={t.label}
          className="template-chip"
          onClick={() => setValue(t.value)}
        >
          {t.label}
        </span>
      ))}
      <input type="hidden" value={value} readOnly />
    </>
  );
}

