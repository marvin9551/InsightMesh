import TopNav from "@/components/TopNav";
import { Link } from "react-router-dom";

const agentSpecs = [
  { num: "01", title: "信息采集 Agent", desc: "并行检索全网资讯、行业数据库、学术论文、社媒讨论，构建原始信息池。" },
  { num: "02", title: "数据核验 Agent", desc: "交叉比对多源数据，标注可信度评分，过滤低质量或矛盾信息。" },
  { num: "03", title: "观点分析 Agent", desc: "提炼主流观点、争议焦点、正反论据，识别行业共识与分歧。" },
  { num: "04", title: "内容整合 Agent", desc: "按调研维度结构化重组信息流，生成行业现状、数据、趋势等章节。" },
  { num: "05", title: "报告生成 Agent", desc: "整合图表、引用溯源、观点摘要，输出可下载的完整结构化报告。" },
];

export default function HowPage() {
  return (
    <div className="home-body">
      <TopNav active="how" ctaLabel="免费开始" />

      {/* Hero */}
      <section className="features-hero">
        <div className="hero-bg" />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-head" style={{ paddingTop: "var(--sp-16)" }}>
            <p className="eyebrow">多 Agent 协作原理</p>
            <h1 className="h-display" style={{ fontSize: "var(--text-4xl)", marginBottom: "var(--sp-4)" }}>
              5 个专家 Agent，<br /><span className="grad">一个调研闭环</span>
            </h1>
            <p className="lead" style={{ maxWidth: 560, margin: "0 auto" }}>
              InsightMesh 为每个调研主题自动调度 5 个分工明确的 AI Agent，并行采集、核验、分析、整合、生成，把过去需要数天的调研工作压缩到几分钟。
            </p>
          </div>
        </div>
      </section>

      {/* Agent Mesh */}
      <section className="section agent-mesh" id="how" data-od-id="how" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="agent-mesh-inner">
            <div className="agent-mesh-copy">
              <h2 className="h-section">5 个专家 Agent，<br />一个调研闭环</h2>
              <p className="lead">InsightMesh 为每个调研主题自动调度 5 个分工明确的 AI Agent，并行采集、核验、分析、整合、生成，把过去需要数天的调研工作压缩到几分钟。</p>
              <div className="agent-spec-list">
                {agentSpecs.map((s) => (
                  <div key={s.num} className="agent-spec-item">
                    <div className="agent-spec-num">{s.num}</div>
                    <div className="agent-spec-text">
                      <h4>{s.title}</h4>
                      <p>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link className="btn btn-outline" to="/execution" style={{ marginTop: "var(--sp-8)" }}>
                看一次实时执行演示
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <AgentViz />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" data-od-id="cta">
        <h2 className="h-section">亲自体验多 Agent 协作调研</h2>
        <p className="lead">免费体验 3 次完整调研，无需信用卡。</p>
        <Link className="btn btn-primary btn-lg" to="/create">
          开始调研
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
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

function AgentViz() {
  const nodes = [
    { cls: "n1", label: "信息采集", color: "var(--accent)", icon: (<><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>) },
    { cls: "n2", label: "数据核验", color: "var(--cat-violet)", icon: (<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />) },
    { cls: "n3", label: "观点分析", color: "var(--accent-2)", icon: (<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />) },
    { cls: "n4", label: "内容整合", color: "var(--cat-amber)", icon: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>) },
    { cls: "n5", label: "报告生成", color: "var(--cat-rose)", icon: (<><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>) },
  ];
  const lines = [
    { x2: 50, y2: 8, color: "rgba(74,144,217,0.3)" },
    { x2: 82, y2: 25, color: "rgba(124,140,240,0.3)" },
    { x2: 82, y2: 75, color: "rgba(79,195,182,0.3)" },
    { x2: 50, y2: 92, color: "rgba(232,155,90,0.3)" },
    { x2: 18, y2: 75, color: "rgba(196,126,232,0.3)" },
  ];
  return (
    <div className="agent-viz" aria-hidden="true">
      <div className="agent-viz-ring" />
      <div className="agent-viz-ring inner" />
      <svg className="agent-viz-lines" viewBox="0 0 100 100" fill="none" preserveAspectRatio="xMidYMid meet">
        {lines.map((l, i) => (
          <line key={i} x1="50" y1="50" x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth="0.3" strokeDasharray="1.5 1.5" />
        ))}
      </svg>
      <div className="agent-viz-center">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
        </svg>
      </div>
      {nodes.map((n) => (
        <div key={n.cls} className={`agent-node ${n.cls}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {n.icon}
          </svg>
          <span className="agent-node-label">{n.label}</span>
        </div>
      ))}
    </div>
  );
}
