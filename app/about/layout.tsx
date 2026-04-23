import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BLISS Beauty Salon",
  description:
    "Learn about BLISS Beauty Salon, our mission, customer-first approach, and commitment to premium beauty and wellness services.",
  alternates: {
    canonical: "/about",
  },
  keywords: [
    "about BLISS",
    "beauty salon",
    "wellness salon",
    "beauty experts",
    "salon mission",
  ],
  openGraph: {
    title: "About BLISS Beauty Salon",
    description:
      "Discover BLISS Beauty Salon's story, values, and dedication to quality beauty and wellness experiences.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About BLISS Beauty Salon",
    description:
      "Discover BLISS Beauty Salon's story, values, and dedication to quality beauty and wellness experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
