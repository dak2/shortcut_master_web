'use client';
import { UserProvider } from 'app/providers/UserProvider';
import { DotGothic16 } from 'next/font/google';
import 'styles/globals.css';

const font = DotGothic16({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
