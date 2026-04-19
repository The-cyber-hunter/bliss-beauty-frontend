import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | BLISS Heaven of Beauty",
  description:
    "Get in touch with BLISS Beauty Salon — address, phone, email, and enquiry form for appointments and academy courses.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
