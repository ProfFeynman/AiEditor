/**
 * Root layout component that wraps all pages in the application.
 * This component is responsible for:
 * - Importing global styles
 * - Setting up the basic HTML structure
 * - Setting the default language
 * - Providing the base layout structure for all pages
 */

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
