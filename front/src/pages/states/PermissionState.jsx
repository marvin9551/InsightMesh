import { Link } from "react-router-dom";

const lockIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
const perkCheck = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);

export default function PermissionStatePage() {
  return (
    <div className="state-body">
      <div className="state-card with-max-440">
        <div className="state-icon" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
          {lockIcon}
        </div>
        <h2 className="big">登录后查看此内容</h2>
        <p className="lead-440">该报告需要登录后才能访问。登录你的账号，或注册一个新账号。</p>
        <div className="state-perks">
          <div className="perk">{perkCheck}免费体验 3 次完整调研</div>
          <div className="perk">{perkCheck}永久保存你的历史报告</div>
          <div className="perk">{perkCheck}支持 PDF / Word 多格式导出</div>
        </div>
        <div className="state-actions">
          <Link className="btn btn-primary btn-lg" to="/login">登录 / 注册</Link>
          <Link className="btn btn-outline btn-lg" to="/">返回首页</Link>
        </div>
      </div>
    </div>
  );
}
