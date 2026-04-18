import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-page py-32 sm:py-40 text-center">
        <p className="section-eyebrow">404</p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-6 max-w-md mx-auto text-ink-muted">
          That URL didn&apos;t match anything here. The link might be stale, or you typed it from memory.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/#contact" className="btn-ghost">
            Contact
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
