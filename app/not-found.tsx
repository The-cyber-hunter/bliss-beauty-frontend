import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F7] text-[#2D2D2D]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/[0.08] blur-3xl" />
        <div className="absolute -left-20 bottom-24 h-80 w-80 rounded-full bg-stone-300/20 blur-3xl" />
      </div>

      <main className="flex-1 px-6 md:px-8 py-12 md:py-16 flex items-center">
        <div className="max-w-5xl w-full mx-auto rounded-3xl border border-[#E8E2D9] bg-white shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-[#F7F2E9] to-white border-b md:border-b-0 md:border-r border-[#E8E2D9]">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B] mb-3">
                Error
              </p>
              <p className="text-7xl md:text-8xl font-bold leading-none text-[#2D2D2D]">404</p>
              <p className="text-sm text-gray-500 mt-4">
                The page URL may be outdated or typed incorrectly.
              </p>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
                This page can&apos;t be found
              </h1>
              <p className="text-gray-600 text-base md:text-lg mb-8">
                Let&apos;s take you back to the main experience and help you find the right service quickly.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-[#D4AF37] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#c9a432] transition-colors"
                >
                  Go to home
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center border border-[#2D2D2D]/20 px-6 py-3 rounded-xl text-sm font-medium text-[#2D2D2D] hover:border-[#D4AF37] hover:text-[#B8860B] transition-colors"
                >
                  View services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
