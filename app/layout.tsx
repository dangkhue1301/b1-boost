import type { Metadata } from "next";
import "./globals.css";

const title = "B1 Boost — Daily English Practice";
const description = "Luyện ngữ pháp và từ vựng Destination B1 mỗi ngày với streak, tracking và lộ trình mở khóa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://b1-boost-daily-english.nguyendang13012007.chatgpt.site"),
  title,
  description,
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "B1 Boost — Học ít, nhớ lâu" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
