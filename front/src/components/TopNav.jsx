import Link from "next/link";
import LogoMark from "./LogoMark";

// Shared top navigation. `active` highlights the matching nav link
// ("features" | "how" | "cases" | "profile" | null).
// `ctaHref` / `ctaLabel` control the primary button on the right.
export default function TopNav({ active = null, ctaHref = "/create", ctaLabel = "免费开始" }) {
  const featuresHref = "/features";
  const howHref = "/how";

  const navLink = (href, label, key) => (
    <Link
      href={href}
      style={active === key ? { color: "var(--fg)" } : undefined}
    >
      {label}
    </Link>
  );

  return (
    <header className="topnav">
      <div className="container topnav-inner">
        <Link className="logo" href="/">
          <LogoMark size={28} />
          InsightMesh
        </Link>
        <nav>
          {navLink(featuresHref, "功能介绍", "features")}
          {navLink(howHref, "协作原理", "how")}
          {navLink("/cases", "案例", "cases")}
          {navLink("/profile", "我的报告", "profile")}
        </nav>
        <div className="topnav-actions">
          <Link className="btn btn-ghost" href="/login">
            登录
          </Link>
          <Link className="btn btn-primary" href={ctaHref}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
