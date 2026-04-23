import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | BLISS Heaven of Beauty",
  description:
    "Get in touch with BLISS Beauty Salon — address, phone, email, and enquiry form for appointments and academy courses.",
  alternates: {
    canonical: "/contact",
  },
  keywords: [
    "BLISS contact",
    "beauty salon contact",
    "book salon appointment",
    "beauty academy enquiry",
  ],
  openGraph: {
    title: "Contact Us | BLISS Heaven of Beauty",
    description:
      "Get in touch with BLISS Beauty Salon for appointments, service enquiries, and academy admissions.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | BLISS Heaven of Beauty",
    description:
      "Get in touch with BLISS Beauty Salon for appointments, service enquiries, and academy admissions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
