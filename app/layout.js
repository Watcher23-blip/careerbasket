import "./globals.css";
import { passero, robotoSlab, ubuntu } from "@/lib/fonts";

export const metadata = {
  title: 'Career Basket ',
  description: 'The leading platform for managed freelance services and remote work.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${passero.variable} ${robotoSlab.variable} ${ubuntu.variable}`}>
      <body className={`${ubuntu.className} bg-[#09090b] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}