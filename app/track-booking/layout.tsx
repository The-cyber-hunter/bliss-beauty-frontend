import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Booking | BLISS Heaven of Beauty",
  description:
    "Track your BLISS Beauty booking status quickly using your booking ID and stay updated on appointment progress.",
  alternates: {
    canonical: "/track-booking",
  },
  keywords: [
    "track salon booking",
    "booking status",
    "BLISS booking ID",
    "appointment tracking",
  ],
  openGraph: {
    title: "Track Booking | BLISS Heaven of Beauty",
    description:
      "Track your BLISS Beauty booking status quickly using your booking ID.",
    url: "/track-booking",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Track Booking | BLISS Heaven of Beauty",
    description:
      "Track your BLISS Beauty booking status quickly using your booking ID.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrackBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
