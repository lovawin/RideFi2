import "./globals.css";

export const metadata = {
  title: "RideFi",
  description:
    "Driver-first crypto enabled rideshare"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
