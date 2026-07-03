import { Link } from "react-router-dom";

export default function ErrorStatePage() {
  return (
    <div className="state-body">
      <div className="state-card with-max-440">
        <div className="state-icon" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" /></svg>
        </div>
        <h2 className="big">调研未能完成</h2>
        <p className="lead-440">部分数据源响应超时，导致报告生成中断。你可以重试或微调主题。</p>
        <div className="state-error-detail">ERR_SOURCE_TIMEOUT · 3/5 数据源未响应 · 已采集数据已保存</div>
        <div className="state-actions">
          <Link className="btn btn-primary btn-lg" to="/execution">重新执行</Link>
          <Link className="btn btn-outline btn-lg" to="/create">微调主题</Link>
        </div>
      </div>
    </div>
  );
}
