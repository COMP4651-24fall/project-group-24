import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut} from '@clerk/nextjs'
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
        <body className="bg-gray-900 text-white">
          <header>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
          </SignedIn>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
