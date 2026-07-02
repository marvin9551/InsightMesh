import "./globals.css";

export const metadata = {
  title: "InsightMesh — 多 AI Agent 智能调研平台",
  description:
    "输入任意主题，5 个专业 AI Agent 并行协作，五分钟产出结构化调研报告。",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
