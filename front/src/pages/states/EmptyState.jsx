import { Link } from "react-router-dom";

const plusIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>);

export default function EmptyStatePage() {
  return (
    <div className="state-body">
      <div className="state-card with-max">
        <div className="empty-ico">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
        </div>
        <h2 className="big">还没有调研报告</h2>
        <p className="lead">完成第一份调研后，报告会出现在这里。输入主题，5 分钟拿到结构化报告。</p>
        <div className="state-actions">
          <Link className="btn btn-primary btn-lg" to="/create">
            {plusIcon}
            创建第一份报告
          </Link>
          <Link className="btn btn-outline btn-lg" to="/cases">浏览案例</Link>
        </div>
      </div>
    </div>
  );
}
