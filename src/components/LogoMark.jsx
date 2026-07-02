// InsightMesh logo mark — the starburst/asterisk glyph used across the app.
export default function LogoMark({ size = 28 }) {
  return (
    <span className="logo-mark" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
      </svg>
    </span>
  );
}
