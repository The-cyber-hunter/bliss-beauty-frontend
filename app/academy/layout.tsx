import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy & Courses | BLISS Heaven of Beauty",
  description:
    "Professional beauty training courses for beauticians — makeup, hair, skin, bridal, and salon skills at BLISS Academy.",
  alternates: {
    canonical: "/academy",
  },
  keywords: [
    "beauty academy",
    "beautician course",
    "makeup training",
    "bridal makeup classes",
    "salon training institute",
  ],
  openGraph: {
    title: "Academy & Courses | BLISS Heaven of Beauty",
    description:
      "Join professional beauty courses in makeup, hair, skin, and bridal services at BLISS Academy.",
    url: "/academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Academy & Courses | BLISS Heaven of Beauty",
    description:
      "Join professional beauty courses in makeup, hair, skin, and bridal services at BLISS Academy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
