'use client';
import { ChakraProviders } from 'app/providers/ChakraProvider';
import { UserProvider } from 'app/providers/UserProvider';
import 'styles/globals.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProviders>
          <UserProvider>{children}</UserProvider>
        </ChakraProviders>
      </body>
    </html>
  );
}
