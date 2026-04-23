import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blissalon.com"),
  title: {
    default: "BLISS Beauty Salon | Home Services & Academy",
    template: "%s | BLISS Beauty Salon",
  },
  description:
    "BLISS Beauty Salon offers premium salon and home beauty services, bridal makeup, and professional academy courses.",
  applicationName: "BLISS Beauty Salon",
  category: "Beauty & Wellness",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "BLISS Beauty Salon | Home Services & Academy",
    description:
      "Book premium beauty services at home or in salon, explore bridal packages, and join professional beauty courses.",
    url: "/",
    siteName: "BLISS Beauty Salon",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLISS Beauty Salon | Home Services & Academy",
    description:
      "Book premium beauty services at home or in salon, explore bridal packages, and join professional beauty courses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
