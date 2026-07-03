"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "@/components/TopNav";

const iconBookmark = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>);
const iconBookmarkFilled = (<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>);
const iconShare = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" /></svg>);
const iconDelete = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>);
const iconClock = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>);
const iconClose = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>);
const iconSearch = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>);

const sidebarIcons = {
  reports: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>),
  bookmark: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>),
  stats: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>),
  settings: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>),
  logout: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>),
};

const reportIcons = {
  doc: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>),
  chart: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>),
  trend: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18M18 10l-4 4-3-3-5 5" /></svg>),
  search: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>),
};

const reports = [
  { id: 1, status: "已完成", text: "2026 年全球 AI Agent 市场规模与竞争格局分析 ai agent", ico: "doc", title: "2026 年全球 AI Agent 市场规模与竞争格局分析", preview: "全球 AI Agent 市场正式迈入规模化落地期，市场规模预计达 287 亿美元，同比增长 68.3%。", date: "2026.07.02", depth: "深度 · 18 页", cred: "可信度 92.4%", filled: false },
  { id: 2, status: "已完成", text: "大模型在企业落地的最新进展与挑战 大模型 企业落地", ico: "chart", title: "大模型在企业落地的最新进展与挑战", preview: "覆盖金融、医疗、制造等行业的大模型落地案例，分析技术瓶颈与组织适配问题。", date: "2026.06.28", depth: "深度 · 14 页", cred: "可信度 89.7%", filled: true },
  { id: 3, status: "已完成", text: "新能源车 2026 年市场趋势与政策走向 新能源车 电动车", ico: "trend", title: "新能源车 2026 年市场趋势与政策走向", preview: "中国新能源车渗透率突破 45%，补贴退坡后市场竞争转向智能化与出海。", date: "2026.06.21", depth: "基础 · 8 页", cred: "可信度 94.1%", filled: true },
  { id: 4, status: "执行中", text: "跨境电商独立站 2026 年运营策略调研 跨境电商 独立站", ico: "search", title: "跨境电商独立站 2026 年运营策略调研", preview: "SHEIN、Temu 带动独立站模式爆发，分析建站工具对比与运营策略。", date: "2026.07.02", depth: "深度 · 进行中", cred: null, filled: false, running: true },
  { id: 5, status: "已完成", text: "医疗 AI 影像诊断 2026 年审批进展与商业化调研 医疗 ai 影像", ico: "doc", title: "医疗 AI 影像诊断 2026 年审批进展与商业化调研", preview: "NMPA 三类医疗器械证批准节奏加快，分析 AI 影像产品的商业化路径。", date: "2026.06.15", depth: "专业 · 28 页", cred: "可信度 91.3%", filled: false },
];

const weekBars = [
  { h: "40%", d: "周一" }, { h: "70%", d: "周二" }, { h: "55%", d: "周三" }, { h: "85%", d: "周四" }, { h: "60%", d: "周五" }, { h: "30%", d: "周六" }, { h: "45%", d: "周日" },
];

export default function ProfilePage() {
  const [section, setSection] = useState("reports");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const navItems = [
    { key: "reports", label: "我的报告", icon: "reports", badge: "12" },
    { key: "bookmark", label: "收藏夹", icon: "bookmark", badge: "3", disabled: true },
    { key: "stats", label: "使用统计", icon: "stats" },
    { key: "settings", label: "账户设置", icon: "settings" },
  ];

  const visibleReports = reports.filter((r) => {
    const matchFilter = filter === "all" || r.status === filter;
    const matchSearch = !query || r.text.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="profile-body">
      <TopNav active="profile" ctaLabel="新建调研" ctaHref="/create" />

      <main className="profile-layout" id="content">
        {/* Sidebar */}
        <aside className="sidebar" data-od-id="sidebar">
          <div className="sidebar-card">
            <div className="sidebar-user">
              <div className="sidebar-avatar">林</div>
              <div className="sidebar-user-info">
                <div className="name">林思远</div>
                <div className="plan">PRO 会员 · 剩余 47 次</div>
              </div>
            </div>
            <nav className="sidebar-nav">
              {navItems.map((n) => (
                <a
                  key={n.key}
                  className={`sidebar-link ${section === n.key ? "active" : ""}`}
                  href={n.disabled ? undefined : `#${n.key}`}
                  onClick={(e) => {
                    if (n.disabled) return;
                    e.preventDefault();
                    setSection(n.key);
                  }}
                >
                  {sidebarIcons[n.icon]}
                  {n.label}
                  {n.badge && <span className="badge">{n.badge}</span>}
                </a>
              ))}
              <Link className="sidebar-link" href="/login">
                {sidebarIcons.logout}
                退出登录
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="profile-main" data-od-id="main">
          {section === "reports" && (
            <div className="profile-section" id="section-reports">
              <div className="profile-top">
                <div>
                  <h1>我的报告</h1>
                  <p className="sub">共 12 份调研报告，按创建时间排序</p>
                </div>
              </div>

              <div className="filter-bar">
                <div className="search-box">
                  {iconSearch}
                  <input
                    type="text"
                    placeholder="搜索报告主题…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="filter-tabs">
                  {[{ k: "all", l: "全部" }, { k: "已完成", l: "已完成" }, { k: "执行中", l: "执行中" }].map((t) => (
                    <span
                      key={t.k}
                      className={`filter-tab ${filter === t.k ? "active" : ""}`}
                      onClick={() => setFilter(t.k)}
                    >
                      {t.l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="report-list">
                {visibleReports.map((r) => (
                  <div key={r.id} className="report-item" data-status={r.status}>
                    <div className={`report-ico ${r.ico === "doc" ? "" : r.ico === "chart" ? "green" : r.ico === "trend" ? "violet" : "amber"}`}>
                      {reportIcons[r.ico]}
                    </div>
                    <div className="report-body">
                      <h3>{r.title}</h3>
                      <p className="preview">{r.preview}</p>
                      <div className="report-meta-row">
                        {r.status === "已完成" ? (
                          <span className="pill pill-green">已完成</span>
                        ) : (
                          <span className="pill" style={{ background: "var(--info-soft)", color: "var(--info)" }}>执行中</span>
                        )}
                        <span>{r.date}</span>
                        <span>·</span>
                        <span>{r.depth}</span>
                        {r.cred && (<><span>·</span><span>{r.cred}</span></>)}
                      </div>
                    </div>
                    <div className="report-actions-row">
                      <button className="btn-icon" title={r.filled ? "已收藏" : "收藏"}>
                        {r.filled ? iconBookmarkFilled : iconBookmark}
                      </button>
                      {r.running ? (
                        <Link className="btn-icon" href="/execution" title="查看进度">{iconClock}</Link>
                      ) : (
                        <button className="btn-icon" title="分享">{iconShare}</button>
                      )}
                      <button className="btn-icon danger" title={r.running ? "取消" : "删除"}>
                        {r.running ? iconClose : iconDelete}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--sp-3)", marginTop: "var(--sp-8)" }}>
                <span className="text-sm text-muted">显示 {visibleReports.length} / 12 份报告</span>
                <button className="btn btn-outline" style={{ padding: "6px 16px", fontSize: "var(--text-sm)" }}>加载更多</button>
              </div>
            </div>
          )}

          {section === "stats" && (
            <div className="profile-section" id="section-stats" data-od-id="stats">
              <div className="profile-top">
                <div>
                  <h1>使用统计</h1>
                  <p className="sub">你的 InsightMesh 使用数据概览</p>
                </div>
              </div>
              <div className="stats-band" style={{ marginBottom: "var(--sp-8)" }}>
                <div className="grid-4" style={{ textAlign: "center" }}>
                  <div className="stat-cell"><div className="num">12</div><div className="lbl">总报告数</div></div>
                  <div className="stat-cell"><div className="num">3,847</div><div className="lbl">数据采集量</div></div>
                  <div className="stat-cell"><div className="num">4.2h</div><div className="lbl">累计节省时间</div></div>
                  <div className="stat-cell"><div className="num">91.6%</div><div className="lbl">平均可信度</div></div>
                </div>
              </div>
              <div className="card" style={{ marginBottom: "var(--sp-6)" }}>
                <h3 style={{ marginBottom: "var(--sp-4)" }}>最近 7 天活跃度</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, padding: "0 12px" }}>
                  {weekBars.map((b) => (
                    <div key={b.d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={{ width: "100%", height: b.h, background: "var(--accent)", borderRadius: "4px 4px 0 0" }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted-2)" }}>{b.d}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid-2">
                <div className="card">
                  <h3 style={{ marginBottom: "var(--sp-3)" }}>最常调研领域</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                    {[["AI Agent", "4 次"], ["大模型", "3 次"], ["新能源车", "2 次"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base)" }}>
                        <span>{k}</span><span className="text-muted">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="card">
                  <h3 style={{ marginBottom: "var(--sp-3)" }}>平均调研深度</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)" }}>
                    {[["深度调研", "7 次"], ["基础调研", "3 次"], ["专业调研", "2 次"]].map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base)" }}>
                        <span>{k}</span><span className="text-muted">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "settings" && (
            <div className="profile-section" id="section-settings" data-od-id="settings">
              <div className="profile-top">
                <div>
                  <h1>账户设置</h1>
                  <p className="sub">管理你的账户信息与偏好</p>
                </div>
              </div>
              <div className="card" style={{ marginBottom: "var(--sp-6)" }}>
                <h3 style={{ marginBottom: "var(--sp-5)" }}>个人信息</h3>
                <div className="grid-2" style={{ gap: "var(--sp-4)" }}>
                  <div className="field"><label>姓名</label><input className="input" type="text" defaultValue="林思远" /></div>
                  <div className="field"><label>邮箱</label><input className="input" type="email" defaultValue="lin.siyuan@company.com" /></div>
                  <div className="field"><label>公司</label><input className="input" type="text" defaultValue="某头部券商" /></div>
                  <div className="field"><label>职位</label><input className="input" type="text" defaultValue="科技行业分析师" /></div>
                </div>
                <div style={{ marginTop: "var(--sp-5)", textAlign: "right" }}><button className="btn btn-primary">保存修改</button></div>
              </div>
              <div className="card" style={{ marginBottom: "var(--sp-6)" }}>
                <h3 style={{ marginBottom: "var(--sp-5)" }}>会员信息</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-4)", padding: "var(--sp-4)", background: "var(--surface-2)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "var(--radius)", background: "var(--fg)", display: "grid", placeItems: "center", color: "var(--surface)", fontWeight: 700, fontSize: "var(--text-sm)" }}>PRO</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "var(--text-md)" }}>PRO 会员</div>
                    <div className="text-muted" style={{ fontSize: "var(--text-sm)" }}>剩余 47 次调研 · 2026 年 12 月 31 日到期</div>
                  </div>
                  <button className="btn btn-outline">续费</button>
                </div>
              </div>
              <div className="card">
                <h3 style={{ marginBottom: "var(--sp-5)" }}>通知设置</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-4)" }}>
                  <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <span style={{ fontSize: "var(--text-base)" }}>调研完成时邮件通知</span>
                    <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)", width: 16, height: 16 }} />
                  </label>
                  <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <span style={{ fontSize: "var(--text-base)" }}>每周使用报告推送</span>
                    <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)", width: 16, height: 16 }} />
                  </label>
                  <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <span style={{ fontSize: "var(--text-base)" }}>产品更新与功能上线通知</span>
                    <input type="checkbox" style={{ accentColor: "var(--accent)", width: 16, height: 16 }} />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
