"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoMark from "@/components/LogoMark";

const backIcon = (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>);
const eyeOpen = (<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>);
const eyeClosed = (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>);

const socialIcons = {
  google: (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.35 11.1h-9.17v2.92h5.27c-.23 1.4-1.65 4.1-5.27 4.1-3.17 0-5.76-2.62-5.76-5.86s2.59-5.86 5.76-5.86c1.81 0 3.02.77 3.71 1.43l2.53-2.43C16.83 4.1 14.78 3.2 12.18 3.2 7.16 3.2 3.1 7.26 3.1 12.26s4.06 9.06 9.08 9.06c5.24 0 8.71-3.68 8.71-8.86 0-.6-.06-1.05-.14-1.36z" /></svg>),
  apple: (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.04-.02-.07-.02-.11 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.18.05.36.06.54v.64zm4.565 17.05c-.66 1.47-1.59 2.95-2.83 2.96-1.18.02-1.5-.78-2.81-.78-1.32 0-1.71.76-2.8.8-1.14.04-2.05-1.59-2.72-3.05-1.39-2.98-2.47-8.42-1.04-12.06.71-1.81 2.06-2.96 3.56-2.96 1.24.02 2.37.84 3.06.84.66 0 2.13-1.03 3.66-.88.65.02 2.45.26 3.62 1.96-.09.06-2.15 1.26-2.13 3.73.02 3.02 2.62 4.03 2.65 4.04-.02.07-.41 1.43-1.36 2.81z" /></svg>),
  wechat: (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.04 21.54c.96.29 1.93.46 2.96.46a10 10 0 0 0 10-10A10 10 0 0 0 12 2 10 10 0 0 0 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.18-2.07 0-2.96l1.15-4.94s-.29-.58-.29-1.5c0-1.38.86-2.41 1.84-2.41.86 0 1.26.63 1.26 1.44 0 .86-.57 2.09-.86 3.27-.17.98.52 1.84 1.52 1.84 1.78 0 3.16-1.9 3.16-4.58 0-2.4-1.72-4.04-4.19-4.04-2.82 0-4.48 2.1-4.48 4.31 0 .86.28 1.73.74 2.3.09.06.09.14.06.29l-.29 1.09c0 .17-.11.23-.28.11-1.28-.56-2.02-2.38-2.02-3.85 0-3.16 2.24-6.03 6.56-6.03 3.44 0 6.12 2.47 6.12 5.75 0 3.44-2.13 6.2-5.18 6.2-.97 0-1.92-.52-2.26-1.13l-.67 2.37c-.23.86-.86 2.01-1.29 2.7v-.03z" /></svg>),
};

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const isReg = tab === "register";

  const switchTab = (next) => {
    setTab(next);
    // Focus management — defer slightly so the input is visible.
    setTimeout(() => {
      const el = next === "register" ? nameRef.current : emailRef.current;
      if (el) el.focus();
    }, 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <div className="login-body">
      {/* Brand panel */}
      <div className="login-brand" data-od-id="login-brand">
        <div className="brand-nodes" aria-hidden="true">
          <span className="brand-node" />
          <span className="brand-node" />
          <span className="brand-node" />
          <span className="brand-node" />
          <span className="brand-node" />
          <span className="brand-node" />
        </div>
        <div className="logo">
          <span className="logo-mark"><LogoMark size={18} /></span>
          InsightMesh
        </div>
        <div>
          <div className="brand-quote">
            「过去三天的行业调研，<br />现在 <span className="grad">4 分钟</span> 就能完成。」
          </div>
          <div className="brand-author">— 陈默，某头部券商科技行业分析师</div>
          <div className="brand-dots">
            <span className="brand-dot active" />
            <span className="brand-dot" />
            <span className="brand-dot" />
          </div>
        </div>
        <div className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>© 2026 InsightMesh Inc.</div>
      </div>

      {/* Form panel */}
      <div className="login-form-wrap" data-od-id="login-form">
        <form className="login-form" noValidate onSubmit={onSubmit}>
          <Link className="login-back" href="/">
            {backIcon}
            返回首页
          </Link>

          <h1 id="formTitle">{isReg ? "创建账号" : "欢迎回来"}</h1>
          <p className="sub" id="formSub">{isReg ? "注册即可免费体验 3 次完整调研" : "登录以继续你的智能调研"}</p>

          {/* Tabs */}
          <div className="login-tabs" role="tablist" aria-label="登录或注册">
            <button
              type="button"
              className={`login-tab ${tab === "login" ? "active" : ""}`}
              role="tab"
              id="tab-login"
              aria-selected={tab === "login"}
              tabIndex={tab === "login" ? 0 : -1}
              onClick={() => switchTab("login")}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") { e.preventDefault(); switchTab("register"); }
              }}
            >
              登录
            </button>
            <button
              type="button"
              className={`login-tab ${tab === "register" ? "active" : ""}`}
              role="tab"
              id="tab-register"
              aria-selected={tab === "register"}
              tabIndex={tab === "register" ? 0 : -1}
              onClick={() => switchTab("register")}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft") { e.preventDefault(); switchTab("login"); }
              }}
            >
              注册
            </button>
          </div>

          {/* Fields */}
          <div className="login-fields" id="panel-login" role="tabpanel" aria-labelledby="tab-login">
            {isReg && (
              <div className="field">
                <label htmlFor="loginName">姓名</label>
                <input className="input" type="text" id="loginName" name="name" placeholder="你的姓名" autoComplete="name" ref={nameRef} />
              </div>
            )}
            <div className="field">
              <label htmlFor="loginEmail">邮箱</label>
              <input className="input" type="email" id="loginEmail" name="email" placeholder="name@company.com" required autoComplete="email" ref={emailRef} />
            </div>
            <div className="field password-field">
              <label htmlFor="loginPassword">密码</label>
              <input
                className="input"
                type={showPw ? "text" : "password"}
                id="loginPassword"
                name="password"
                placeholder="输入密码"
                required
                autoComplete={isReg ? "new-password" : "current-password"}
              />
              <button
                type="button"
                className="password-toggle"
                aria-label="显示密码"
                onClick={() => setShowPw((v) => !v)}
                tabIndex={0}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {showPw ? eyeClosed : eyeOpen}
                </svg>
              </button>
            </div>
          </div>

          {!isReg && (
            <div className="login-options">
              <label className="remember">
                <input type="checkbox" id="rememberMe" name="remember" />
                <span>记住我</span>
              </label>
              <a className="forgot" href="#">忘记密码？</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary login-btn" id="submitBtn">
            {isReg ? "注册" : "登录"}
          </button>

          <div className="login-divider">或使用以下方式</div>

          <div className="social-row">
            <button type="button" className="social-btn" aria-label="使用 Google 账号登录">{socialIcons.google}Google</button>
            <button type="button" className="social-btn" aria-label="使用 Apple 账号登录">{socialIcons.apple}Apple</button>
            <button type="button" className="social-btn" aria-label="使用微信账号登录">{socialIcons.wechat}微信</button>
          </div>

          <div className="login-foot" id="footText">
            {isReg ? (
              <>已有账号？<a href="#" onClick={(e) => { e.preventDefault(); switchTab("login"); }}>立即登录</a></>
            ) : (
              <>还没有账号？<a href="#" onClick={(e) => { e.preventDefault(); switchTab("register"); }}>立即注册</a></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
