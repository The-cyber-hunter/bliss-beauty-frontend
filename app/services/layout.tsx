import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salon Services & Pricing | BLISS Heaven of Beauty",
  description:
    "Explore BLISS Beauty service categories including regular salon services, makeup packages, and bridal packages with booking options.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "beauty services",
    "salon price list",
    "bridal package",
    "makeup services",
    "home salon service",
  ],
  openGraph: {
    title: "Salon Services & Pricing | BLISS Heaven of Beauty",
    description:
      "Browse services, compare pricing, and book beauty appointments at home or in salon with BLISS.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salon Services & Pricing | BLISS Heaven of Beauty",
    description:
      "Browse services, compare pricing, and book beauty appointments at home or in salon with BLISS.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
