import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DragAndDropProvider from "./DragAndDropProvider";
import packageJson from "../package.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lottie Batch Player",
  description: "A tool for playing multiple Lottie animations at once.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const commitDate = new Date(
    require("child_process").execSync("git log -1 --format=%cd").toString(),
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        <DragAndDropProvider>{children}</DragAndDropProvider>

        {/* Group container for version and date time */}
        <div className="group absolute bottom-4 right-4 flex flex-row text-gray-600/25">
          <span className="mr-2 hidden border-r pr-2 group-hover:block">
            {commitDate.toLocaleString("sk-SK")}
          </span>
          <span>v{packageJson.version}</span>
        </div>
      </body>
    </html>
  );
}
