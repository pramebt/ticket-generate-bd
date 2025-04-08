import type { Metadata } from "next";
import { Inconsolata } from "next/font/google";
import "./globals.css";

const inconsolata = Inconsolata({
  variable: "--font-geist-sans",
  subsets: ["latin"],weight:["400","500","600","700"]
});



export const metadata: Metadata = {
  title: "Ticket Generate - BD",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inconsolata.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
