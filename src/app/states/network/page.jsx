"use client";

import Link from "next/link";

const refreshIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5" /></svg>);
const tipCheck = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>);

export default function NetworkStatePage() {
  return (
    <div className="state-body">
      <div className="state-card with-max-440">
        <div className="state-icon" style={{ background: "var(--warn-soft)", color: "var(--warn)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
        </div>
        <h2 className="big">网络连接异常</h2>
        <p className="lead-440">无法连接到 InsightMesh 服务器。请检查网络后重试。</p>
        <div className="state-tips">
          <div className="tip">{tipCheck}确认设备已连接到互联网</div>
          <div className="tip">{tipCheck}检查是否被防火墙或代理拦截</div>
          <div className="tip">{tipCheck}若问题持续，请联系 support@insightmesh.ai</div>
        </div>
        <div className="state-actions">
          <button className="btn btn-primary btn-lg" onClick={() => window.location.reload()}>
            {refreshIcon}
            重新连接
          </button>
          <Link className="btn btn-outline btn-lg" href="/">返回首页</Link>
        </div>
      </div>
    </div>
  );
}
