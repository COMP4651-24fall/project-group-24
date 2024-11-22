import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider} from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "COMP4651FP",
  description: "Final project front end for Comp4651",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}