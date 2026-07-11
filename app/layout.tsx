import type { Metadata } from "next";
import "./globals.css";

const title = "B1 Boost — Luyện tiếng Anh mỗi ngày";
const description = "Luyện ngữ pháp và từ vựng Destination B1 mỗi ngày với mục tiêu rõ ràng, chuỗi ngày học và lộ trình mở khóa.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dangkhue1301.github.io/b1-boost/"),
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
