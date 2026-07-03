import Link from "next/link";
import TopNav from "@/components/TopNav";

const backIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>);
const downloadIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>);
const copyIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>);
const shareIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>);
const refreshIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" /></svg>);

const metaIcons = {
  calendar: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>),
  doc: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>),
  search: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>),
  shield: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
};

const toc = [
  { id: "s1", num: "01", title: "行业现状概览" },
  { id: "s2", num: "02", title: "核心数据" },
  { id: "s3", num: "03", title: "主流观点" },
  { id: "s4", num: "04", title: "争议点分析" },
  { id: "s5", num: "05", title: "趋势预判" },
  { id: "s6", num: "06", title: "问题与建议" },
];

const sources = [
  { num: "01", title: "IDC Worldwide AI Agent Forecast 2026-2028", meta: "IDC · 2026.03", tag: "研报" },
  { num: "02", title: "Gartner Market Guide for AI Agent Platforms", meta: "Gartner · 2026.02", tag: "研报" },
  { num: "03", title: "艾瑞咨询：中国 AI Agent 行业研究报告", meta: "艾瑞 · 2026.04", tag: "研报" },
  { num: "04", title: "Anthropic: Building Effective Agents", meta: "Anthropic Blog · 2025.12", tag: "博客" },
  { num: "05", title: "OpenAI: A Practical Guide to Building Agents", meta: "OpenAI Blog · 2026.01", tag: "博客" },
  { num: "06", title: "arXiv: Survey of LLM-based Agents", meta: "arXiv:2603.xxxxx · 2026.03", tag: "论文" },
  { num: "07", title: "36氪：AI Agent 赛道 2026 上半年融资盘点", meta: "36氪 · 2026.06", tag: "资讯" },
  { num: "08", title: "虎嗅：从 Chatbot 到 Agent，企业 AI 落地范式转移", meta: "虎嗅 · 2026.05", tag: "资讯" },
];

export default function ReportPage() {
  return (
    <div className="report-body">
      <TopNav ctaLabel="新建调研" ctaHref="/create" />

      <main className="report-wrap" id="content">
        {/* Action bar */}
        <div className="report-actions" data-od-id="actions">
          <div className="report-actions-left">
            <Link className="btn btn-outline" href="/execution">
              {backIcon}
              返回执行页
            </Link>
            <button className="btn btn-outline">{downloadIcon}导出 PDF</button>
            <button className="btn btn-outline">{copyIcon}复制文本</button>
          </div>
          <div className="report-actions-right">
            <button className="btn btn-outline">{shareIcon}分享报告</button>
            <Link className="btn btn-primary" href="/create">{refreshIcon}重新调研</Link>
          </div>
        </div>

        {/* Report header */}
        <header className="report-header" data-od-id="header">
          <div className="report-status"><span className="dot" />调研已完成</div>
          <h1 className="report-title">2026 年全球 AI Agent 市场规模与竞争格局分析</h1>
          <div className="report-meta">
            <div className="item">{metaIcons.calendar}2026 年 7 月 2 日</div>
            <div className="item">{metaIcons.doc}深度调研 · 18 页</div>
            <div className="item">{metaIcons.search}247 个数据源</div>
            <div className="item">{metaIcons.shield}综合可信度 92.4%</div>
          </div>
        </header>

        {/* TOC */}
        <nav className="report-toc" data-od-id="toc">
          <h3>报告目录</h3>
          <div className="toc-list">
            {toc.map((t) => (
              <a key={t.id} className="toc-item" href={`#${t.id}`}>
                <span className="toc-num">{t.num}</span>{t.title}
              </a>
            ))}
          </div>
        </nav>

        {/* Section 1 */}
        <section className="report-section" id="s1" data-od-id="s1">
          <h2>01 · 行业现状概览</h2>
          <p>2026 年，AI Agent 行业正式从「技术验证期」迈入「规模化落地期」。以大语言模型为核心推理引擎、结合工具调用与多步规划能力的 Agent 系统，正在从实验室走向企业级生产环境。<span className="hi">全球 AI Agent 市场规模在 2026 年预计达到 287 亿美元</span>，同比增长 68.3%，显著高于整体 AI 软件市场 32% 的增速。</p>
          <p>行业格局呈现「三梯队」特征：第一梯队为 OpenAI、Anthropic、Google 等基础模型厂商，凭借模型能力与生态优势占据约 43% 的市场份额；第二梯队为 LangChain、Dify、Coze 等 Agent 平台/框架提供商，占据约 28%；第三梯队为垂直行业 Agent 解决方案商，覆盖金融、医疗、客服、制造等场景。</p>
          <div className="insight-box">
            <div className="tag">核心洞察</div>
            <p>AI Agent 正从「聊天机器人」向「自主执行体」演进。2026 年超过 60% 的新部署 Agent 具备多工具调用能力，较 2024 年的 12% 实现跨越式增长。</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="report-section" id="s2" data-od-id="s2">
          <h2>02 · 核心数据</h2>
          <h3>2.1 全球市场规模（2022-2026）</h3>
          <p>AI Agent 市场在过去三年保持高速增长，2024 年突破 100 亿美元关口后持续加速。</p>

          <div className="chart-card">
            <div className="chart-card-head">
              <h4>全球 AI Agent 市场规模（亿美元）</h4>
              <span className="src">数据来源：IDC, Gartner, InsightMesh 综合测算</span>
            </div>
            <div className="chart-body">
              <div className="bar-chart">
                <div className="bar-col"><div className="bar-val">28</div><div className="bar" style={{ height: "18%", background: "var(--accent)" }} /><div className="bar-label">2022</div></div>
                <div className="bar-col"><div className="bar-val">53</div><div className="bar" style={{ height: "34%", background: "var(--accent)" }} /><div className="bar-label">2023</div></div>
                <div className="bar-col"><div className="bar-val">171</div><div className="bar" style={{ height: "68%", background: "var(--accent)" }} /><div className="bar-label">2024</div></div>
                <div className="bar-col"><div className="bar-val">287</div><div className="bar" style={{ height: "100%", background: "linear-gradient(180deg,var(--accent),var(--accent-2))" }} /><div className="bar-label">2026E</div></div>
              </div>
            </div>
          </div>

          <h3>2.2 竞争格局（2026 年市场份额）</h3>
          <p>头部效应显著，前 5 厂商合计占据 58% 市场，但长尾市场仍活跃着超过 200 家垂直方案商。</p>

          <div className="chart-card">
            <div className="chart-card-head">
              <h4>全球 AI Agent 市场份额分布</h4>
              <span className="src">数据来源：Gartner Market Share Report 2026</span>
            </div>
            <div className="chart-body">
              <div className="donut-wrap">
                <svg className="donut-svg" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--surface-2)" strokeWidth="32" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--accent)" strokeWidth="32" strokeDasharray="79 351" strokeDashoffset="0" transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--accent-2)" strokeWidth="32" strokeDasharray="62 368" strokeDashoffset="-79" transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--cat-violet)" strokeWidth="32" strokeDasharray="53 377" strokeDashoffset="-141" transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--warn)" strokeWidth="32" strokeDasharray="126 304" strokeDashoffset="-194" transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="var(--muted-2)" strokeWidth="32" strokeDasharray="126 304" strokeDashoffset="-320" transform="rotate(-90 100 100)" />
                  <text x="100" y="96" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="700" fill="var(--fg)">100%</text>
                  <text x="100" y="116" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)" letterSpacing="1">GLOBAL</text>
                </svg>
                <div className="donut-legend">
                  <div className="legend-item"><span className="legend-dot" style={{ background: "var(--accent)" }} /><span className="l">OpenAI（GPT Agent）</span><span className="v">18%</span></div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "var(--accent-2)" }} /><span className="l">Anthropic（Claude Agent）</span><span className="v">14%</span></div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "var(--cat-violet)" }} /><span className="l">Google（Gemini Agent）</span><span className="v">12%</span></div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "var(--warn)" }} /><span className="l">平台/框架商</span><span className="v">28%</span></div>
                  <div className="legend-item"><span className="legend-dot" style={{ background: "var(--muted-2)" }} /><span className="l">其他垂直方案商</span><span className="v">28%</span></div>
                </div>
              </div>
            </div>
          </div>

          <h3>2.3 区域分布</h3>
          <p>北美仍是最大市场（41%），但亚太地区增速最快（同比 +82%），中国市场在政策驱动下贡献了亚太增量的 62%。</p>
        </section>

        {/* Section 3 */}
        <section className="report-section" id="s3" data-od-id="s3">
          <h2>03 · 主流观点</h2>
          <h3>3.1 行业共识</h3>
          <p><strong>共识一：Agent 是 AI 的终极形态。</strong>超过 78% 的受访技术领导者认为，Agent 将从「辅助工具」演进为「自主执行体」，在 2028 年前承担企业 30% 以上的知识工作。</p>
          <p><strong>共识二：多 Agent 协作是复杂任务的必由之路。</strong>单一 Agent 难以覆盖复杂调研、决策链路的全部环节，分工协作的多 Agent 架构正成为主流范式。</p>
          <p><strong>共识三：可信度与可解释性是落地瓶颈。</strong>企业采用 Agent 的最大顾虑仍是「幻觉」与「不可解释的决策」，核验与溯源能力成为选型关键指标。</p>

          <h3>3.2 头部厂商立场</h3>
          <div className="procon-grid">
            <div className="procon-card pro">
              <h4>
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                优势信号
              </h4>
              <ul>
                <li>模型能力持续领先，Agent 推理深度显著提升</li>
                <li>企业客户付费意愿强，ARPU 同比增长 45%</li>
                <li>开发者生态成熟，插件市场突破 12,000 个</li>
                <li>中国政策利好，「AI+」行动计划加速落地</li>
              </ul>
            </div>
            <div className="procon-card con">
              <h4>
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>
                风险信号
              </h4>
              <ul>
                <li>算力成本居高不下，中小企业部署门槛高</li>
                <li>数据隐私与合规压力加大（GDPR、中国数安法）</li>
                <li>同质化竞争加剧，价格战苗头显现</li>
                <li>人才缺口扩大，Agent 架构师供不应求</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="report-section" id="s4" data-od-id="s4">
          <h2>04 · 争议点分析</h2>
          <h3>争议一：通用 Agent vs 垂直 Agent 谁主沉浮？</h3>
          <p>一方观点认为通用大模型将统一 Agent 底座，另一方则坚持垂直场景需要深度定制的专用 Agent。当前数据显示，<span className="hi">垂直 Agent 的客户留存率（78%）显著高于通用 Agent（52%）</span>，但通用 Agent 的获客成本更低。</p>
          <h3>争议二：开源 vs 闭源路线</h3>
          <p>Meta Llama、Mistral 等开源模型正在降低 Agent 开发门槛，但闭源厂商在安全性与企业服务上仍具优势。2026 年开源 Agent 框架贡献量同比增长 210%，但商业化落地仍以闭源方案为主。</p>
          <div className="insight-box warn">
            <div className="tag">风险提示</div>
            <p>当前 Agent 行业存在「演示效果 vs 生产效果」的鸿沟。超过 40% 的 POC 项目未能进入生产部署，主要瓶颈在于稳定性、成本控制与组织适配。</p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="report-section" id="s5" data-od-id="s5">
          <h2>05 · 趋势预判</h2>
          <p><strong>短期（2026-2027）：</strong>Agent 编排平台（Orchestration Platform）将成为新的基础设施层，多 Agent 协作框架标准化。</p>
          <p><strong>中期（2027-2028）：</strong>Agent 开始承担端到端业务流程，客服、研报、法律审核等场景渗透率超过 50%。</p>
          <p><strong>长期（2028+）：</strong>Agent 经济生态成型，Agent-to-Agent 协作与交易成为新业态，市场规模有望突破 800 亿美元。</p>
          <div className="insight-box success">
            <div className="tag">机会窗口</div>
            <p>中国 AI Agent 市场正处于「政策红利 + 需求爆发」的双重窗口期。建议关注 Agent 编排、可信核验、垂直场景落地三大方向。</p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="report-section" id="s6" data-od-id="s6">
          <h2>06 · 问题与建议</h2>
          <h3>关键问题</h3>
          <p>1. Agent 的「幻觉」问题在生产环境仍可能造成实质性损失；2. 多 Agent 协作的调试与监控工具尚不成熟；3. 企业数据接入的合规与安全框架有待完善。</p>
          <h3>行动建议</h3>
          <p>1. 优先选择具备可信核验与溯源能力的 Agent 平台；2. 从单一高价值场景切入，逐步扩展至多 Agent 协作；3. 建立 Agent 效果的量化评估体系，持续迭代。</p>
        </section>

        {/* Sources */}
        <section className="report-section" data-od-id="sources">
          <h2>参考资料</h2>
          <div className="source-list">
            {sources.map((s) => (
              <div key={s.num} className="source-item">
                <span className="source-num">{s.num}</span>
                <div className="source-text">
                  <span className="title">{s.title}</span><br />
                  <span className="meta">{s.meta}</span>
                </div>
                <span className="source-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="pagefoot" style={{ marginTop: "var(--sp-16)" }} data-od-id="footer">
        <div className="container">
          <div className="row-between">
            <span className="text-muted-2">由 InsightMesh 多 Agent 系统自动生成 · 2026 年 7 月 2 日</span>
            <Link href="/create" className="text-accent font-medium">开始新一轮调研 →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
