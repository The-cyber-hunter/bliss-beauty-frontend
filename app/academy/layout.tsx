import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy & Courses | BLISS Heaven of Beauty",
  description:
    "Professional beauty training courses for beauticians — makeup, hair, skin, bridal, and salon skills at BLISS Academy.",
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
