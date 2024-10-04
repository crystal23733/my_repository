import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <head>
      	{/*메타데이터 핸들링 할 곳*/}
      </head>
      <body>{children}</body>
    </html>
  );
}
