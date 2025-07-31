import { Toaster } from "sonner";
import { ReactQueryClientProvider } from "@/lib/client/tanstack-query";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <Toaster />
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
