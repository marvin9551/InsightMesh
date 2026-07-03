"use client";

import TopNav from "@/components/TopNav";

const features = [
  { icon: "blue", title: "全网深度采集", desc: "同时检索 200+ 数据源——资讯、论文、社媒、行业数据库，构建覆盖全面的原始信息池。" },
  { icon: "green", title: "交叉真伪核验", desc: "多源数据交叉比对，自动标注可信度评分，过滤矛盾与低质量信息，确保结论可靠。" },
  { icon: "violet", title: "多维观点提炼", desc: "识别主流共识、争议焦点、正反论据，帮你快速理解行业各方立场与逻辑。" },
  { icon: "amber", title: "可视化数据图表", desc: "自动生成饼图、折线图、柱状图，数据一目了然，无需手动整理。" },
  { icon: "rose", title: "一键导出报告", desc: "支持 PDF、Markdown、Word 多格式导出，附带完整引用溯源，可直接交付。" },
  { icon: "cyan", title: "实时进度可视", desc: "全程可视化 Agent 工作状态、实时日志、进度百分比，调研过程完全透明。" },
];

const featureIcons = {
  blue: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>),
  green: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>),
  violet: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
  amber: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M18 10l-4 4-3-3-5 5" /></svg>),
  rose: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>),
  cyan: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>),
};

export default function FeaturesPage() {
  return (
    <div className="home-body">
      <TopNav active="features" ctaLabel="免费开始" />

      {/* Hero */}
      <section className="features-hero">
        <div className="hero-bg" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head" style={{ paddingTop: "var(--sp-16)" }}>
            <p className="eyebrow">核心功能</p>
            <h1 className="h-display" style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--sp-4)" }}>
              从主题到报告，<br /><span className="grad">全自动闭环</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, margin: "0 auto" }}>
              InsightMesh 把调研工作拆解为 5 个专业化步骤，每个步骤由一个独立 AI Agent 负责，并行执行、交叉验证。
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-3">
            {features.map((f) => (
              <div key={f.title} className="feat-card">
                <div className={`feat-icon ${f.icon}`}>{featureIcons[f.icon]}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" data-od-id="cta">
        <h2 className="h-section">准备好体验智能调研了吗？</h2>
        <p className="lead">免费体验 3 次完整调研，无需信用卡。</p>
        <a className="btn btn-primary btn-lg" href="/create">
          开始调研
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
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
