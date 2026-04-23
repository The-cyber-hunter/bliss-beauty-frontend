import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BLISS Beauty Salon",
    short_name: "BLISS",
    description:
      "Premium beauty salon services, at-home appointments, bridal makeup, and beauty academy courses.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9F8F7",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/globe.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/next.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
