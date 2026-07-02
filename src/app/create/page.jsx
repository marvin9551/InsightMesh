"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "@/components/TopNav";

const backIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
const arrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const dimensions = [
  { id: "news", title: "全网资讯", desc: "行业新闻、动态、政策", defaultOn: true },
  { id: "data", title: "行业数据", desc: "市场规模、增速、份额", defaultOn: true },
  { id: "opinion", title: "用户观点", desc: "社媒讨论、用户反馈", defaultOn: false },
  { id: "competitor", title: "竞品分析", desc: "头部厂商产品对比", defaultOn: true },
  { id: "risk", title: "风险研判", desc: "政策、技术、市场风险", defaultOn: false },
  { id: "trend", title: "趋势预判", desc: "未来 1-3 年走势", defaultOn: false },
];

const depths = [
  { id: "basic", name: "基础", desc: "覆盖主流数据源，快速输出核心结论与摘要。", meta: "~ 2 分钟 · 5-8 页" },
  { id: "deep", name: "深度", desc: "多源交叉核验，含数据图表、观点对比、趋势预判。", meta: "~ 4 分钟 · 12-18 页" },
  { id: "pro", name: "专业", desc: "全量数据源 + 学术文献 + 专家观点，完整行业研究报告。", meta: "~ 8 分钟 · 25-40 页" },
];

const formats = [
  { id: "summary", title: "短文总结", desc: "1 页核心结论", defaultOn: true },
  { id: "report", title: "结构化报告", desc: "完整章节 + 图表", defaultOn: true },
  { id: "chart", title: "数据图表", desc: "独立可视化图表集", defaultOn: false },
  { id: "doc", title: "完整文档", desc: "Word / Markdown", defaultOn: false },
];

export default function CreatePage() {
  const router = useRouter();
  const [dims, setDims] = useState(() => Object.fromEntries(dimensions.map((d) => [d.id, d.defaultOn])));
  const [depth, setDepth] = useState("deep");
  const [fmts, setFmts] = useState(() => Object.fromEntries(formats.map((f) => [f.id, f.defaultOn])));

  const toggleDim = (id) => setDims((s) => ({ ...s, [id]: !s[id] }));
  const toggleFmt = (id) => setFmts((s) => ({ ...s, [id]: !s[id] }));

  const activeFormats = formats.filter((f) => fmts[f.id]).map((f) => f.title);
  const eta = depths.find((d) => d.id === depth)?.meta?.split(" · ")[0] ?? "~4 分钟";

  return (
    <div className="create-body">
      <TopNav ctaLabel="免费开始" />

      <main className="create-wrap" id="content">
        <a className="create-back" href="/">
          {backIcon}
          返回首页
        </a>

        <h1 className="create-title">配置你的调研任务</h1>
        <p className="create-sub">已识别主题，请确认并选择调研维度、深度与输出格式。</p>

        {/* Step 1: Topic confirm */}
        <div className="config-card" data-od-id="topic">
          <div className="config-card-head">
            <div className="config-step">01</div>
            <div>
              <h3>确认调研主题</h3>
              <p>可在此修改或补充主题描述</p>
            </div>
          </div>
          <div className="field">
            <label>调研主题</label>
            <input className="input" type="text" defaultValue="2026 年全球 AI Agent 市场规模与竞争格局分析" />
          </div>
          <div className="field" style={{ marginTop: "var(--sp-4)" }}>
            <label>补充说明（可选）</label>
            <textarea className="textarea" placeholder="例如：重点关注中国市场、希望包含头部厂商的产品对比…" />
          </div>
        </div>

        {/* Step 2: Dimensions */}
        <div className="config-card" data-od-id="dimensions">
          <div className="config-card-head">
            <div className="config-step green">02</div>
            <div>
              <h3>选择调研维度</h3>
              <p>至少选择 1 项，建议 3-4 项以获得全面报告</p>
            </div>
          </div>
          <div className="dim-grid">
            {dimensions.map((d) => (
              <div
                key={d.id}
                className={`dim-chip ${dims[d.id] ? "active" : ""}`}
                onClick={() => toggleDim(d.id)}
              >
                <div className="dim-check">{checkIcon}</div>
                <div className="dim-text">
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 3: Depth */}
        <div className="config-card" data-od-id="depth">
          <div className="config-card-head">
            <div className="config-step violet">03</div>
            <div>
              <h3>调研深度</h3>
              <p>深度越高，采集源越广，耗时越长</p>
            </div>
          </div>
          <div className="depth-row">
            {depths.map((d) => (
              <div
                key={d.id}
                className={`depth-opt ${depth === d.id ? "active" : ""}`}
                onClick={() => setDepth(d.id)}
              >
                <div className="d-name">{d.name}</div>
                <div className="d-desc">{d.desc}</div>
                <div className="d-meta">{d.meta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 4: Output format */}
        <div className="config-card" data-od-id="format">
          <div className="config-card-head">
            <div className="config-step amber">04</div>
            <div>
              <h3>输出格式</h3>
              <p>可多选，报告将包含所选全部格式</p>
            </div>
          </div>
          <div className="fmt-row">
            {formats.map((f) => (
              <div
                key={f.id}
                className={`fmt-opt ${fmts[f.id] ? "active" : ""}`}
                onClick={() => toggleFmt(f.id)}
              >
                <div className="fmt-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                </div>
                <div className="fmt-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="create-footer">
          <div className="create-footer-info">
            预计耗时 <strong>{eta}</strong> · 输出 <strong>{activeFormats.join(" + ") || "—"}</strong>
          </div>
          <button className="btn btn-primary btn-xl" onClick={() => router.push("/execution")}>
            开始生成任务
            {arrowRight}
          </button>
        </div>
      </main>
    </div>
  );
}
