import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";

const downloadIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const refreshIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" />
  </svg>
);
const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const agents = [
  { state: "done", ico: "blue", name: "信息采集 Agent", hint: "已完成 · 采集 247 条原始信息", pill: "已完成", showCheck: true },
  { state: "done", ico: "violet", name: "数据核验 Agent", hint: "已完成 · 核验 183 条数据，可信度 92.4%", pill: "已完成", showCheck: true },
  { state: "active", ico: "green", name: "观点分析 Agent", hint: "正在提炼主流观点与争议焦点…", pill: "运行中", spinner: true, pct: "67%" },
  { state: "", ico: "amber", name: "内容整合 Agent", hint: "等待观点分析完成…", pill: "待执行", pct: "—" },
  { state: "", ico: "rose", name: "报告生成 Agent", hint: "等待内容整合完成…", pill: "待执行", pct: "—" },
];

const agentIcons = {
  blue: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>),
  violet: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  green: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
  amber: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>),
  rose: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
};

const logEntries = [
  { t: "14:32:01", a: "a1", agent: "采集", msg: <>启动全网检索，覆盖 247 个数据源</> },
  { t: "14:32:08", a: "a1", agent: "采集", msg: <>检索到 <span className="ok">183</span> 条相关资讯 <span className="src">· 36氪、虎嗅、极客公园</span></> },
  { t: "14:32:14", a: "a1", agent: "采集", msg: <>检索到 <span className="ok">41</span> 篇行业研报 <span className="src">· IDC、Gartner、艾瑞</span></> },
  { t: "14:32:22", a: "a1", agent: "采集", msg: <>检索到 <span className="ok">23</span> 篇学术论文 <span className="src">· arXiv、ACL、NeurIPS</span></> },
  { t: "14:32:31", a: "a2", agent: "核验", msg: <>开始交叉比对 183 条数据</> },
  { t: "14:32:45", a: "a2", agent: "核验", msg: <>识别 <span className="warn">12</span> 条矛盾信息，已标记低可信度</> },
  { t: "14:33:02", a: "a2", agent: "核验", msg: <>市场规模数据交叉验证通过 <span className="ok">· 可信度 96.2%</span></> },
  { t: "14:33:18", a: "a2", agent: "核验", msg: <>竞争格局数据交叉验证通过 <span className="ok">· 可信度 91.8%</span></> },
  { t: "14:33:29", a: "a2", agent: "核验", msg: <>核验完成，综合可信度 <span className="ok">92.4%</span></> },
  { t: "14:33:41", a: "a3", agent: "观点", msg: <>开始提炼主流观点与争议焦点</> },
  { t: "14:33:58", a: "a3", agent: "观点", msg: <>识别 <span className="ok">5</span> 个主流共识、<span className="warn">3</span> 个争议焦点</> },
  { t: "14:34:12", a: "a3", agent: "观点", msg: <>分析厂商竞争立场：OpenAI / Anthropic / 百度 / 字节</> },
  { t: "14:34:27", a: "a3", agent: "观点", msg: <>提炼用户观点：社媒讨论 <span className="ok">1,284</span> 条</> },
  { t: "14:34:45", a: "a3", agent: "观点", msg: <>正在生成观点对比矩阵…</> },
];

export default function ExecutionPage() {
  // Animate the overall progress bar (simulated tick, matches original prototype).
  const [pct, setPct] = useState(62);
  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p < 98 ? p + Math.random() * 0.6 : p));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="exec-body">
      <TopNav ctaLabel="新建调研" ctaHref="/create" />

      <main className="exec-wrap" id="content">
        {/* Header */}
        <div className="exec-header" data-od-id="exec-header">
          <div className="exec-topic">
            <h1>2026 年全球 AI Agent 市场规模与竞争格局分析</h1>
            <div className="exec-topic-meta">
              <span className="pill pill-green">执行中</span>
              <span>深度调研 · 4 维度</span>
              <span>·</span>
              <span>启动于 14:32</span>
            </div>
          </div>
          <div className="exec-header-actions">
            <button className="btn btn-outline">
              {downloadIcon}
              导出日志
            </button>
            <button className="btn btn-ghost">
              {refreshIcon}
              取消任务
            </button>
          </div>
        </div>

        {/* Overall progress */}
        <div className="progress-card" data-od-id="progress">
          <div className="progress-top">
            <h3>整体进度</h3>
            <div className="progress-stats">
              <div className="progress-stat"><div className="v">{Math.round(pct)}%</div><div className="l">完成度</div></div>
              <div className="progress-stat"><div className="v">~1:48</div><div className="l">剩余时间</div></div>
              <div className="progress-stat"><div className="v">18 / 24</div><div className="l">子任务</div></div>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="progress-bottom">
            <span>阶段 3/5 · 观点分析中</span>
            <span>预计 14:36 完成</span>
          </div>
        </div>

        {/* Main grid */}
        <div className="exec-grid">
          {/* Agent board */}
          <div className="agent-board" data-od-id="agents">
            <div className="agent-board-head">
              <h3>Agent 工作看板</h3>
              <span className="live"><span className="live-dot" />实时</span>
            </div>
            <div className="agent-list">
              {agents.map((a, i) => (
                <div key={i} className={`agent-row ${a.state}`}>
                  <div className={`agent-ico ${a.ico}`}>{agentIcons[a.ico]}</div>
                  <div className="agent-row-info">
                    <div className="name">{a.name}</div>
                    <div className="hint">{a.hint}</div>
                  </div>
                  <div className="agent-row-status">
                    <span className={`agent-status-pill status-${a.pill === "已完成" ? "done" : a.pill === "运行中" ? "running" : "pending"}`}>
                      {a.pill}
                    </span>
                    {a.spinner && <div className="agent-spinner" />}
                    {a.showCheck && <div className="agent-check">{checkIcon}</div>}
                    {a.pct && <span className="agent-pct">{a.pct}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Log panel */}
          <div className="log-panel" data-od-id="log">
            <div className="log-panel-head">
              <h3>实时日志</h3>
              <span className="count">48 条</span>
            </div>
            <div className="log-stream" id="logStream">
              {logEntries.map((e, i) => (
                <div key={i} className="log-entry">
                  <span className="log-time">{e.t}</span>
                  <span className={`log-agent ${e.a}`}>{e.agent}</span>
                  <span className="log-msg">{e.msg}</span>
                </div>
              ))}
            </div>

            {/* Live data viz */}
            <div className="viz-strip">
              <div className="viz-cell up"><div className="v">247</div><div className="l">已采集条目</div></div>
              <div className="viz-cell up"><div className="v">92.4%</div><div className="l">数据可信度</div></div>
              <div className="viz-cell"><div className="v">5 / 3</div><div className="l">共识 / 争议</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
