"use client";

import { useState } from "react";
import { profile } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Fallback path: when Formspree isn't configured, pre-fill the user's
    // email client with the form contents so the message still reaches us.
    if (!formspreeId) {
      const name = String(data.get("name") ?? "");
      const message = String(data.get("message") ?? "");
      const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
      const body = encodeURIComponent(`${message}\n\n— ${name}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json?.error ?? "Something went wrong. Please try email instead.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try email instead.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-mono text-ink-dim">Name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
            placeholder="Jane Doe"
          />
        </label>
        <label className="block">
          <span className="text-xs font-mono text-ink-dim">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs font-mono text-ink-dim">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-line bg-bg px-3 py-2 text-sm text-ink placeholder:text-ink-dim focus:border-accent focus:outline-none"
          placeholder="What are you working on?"
        />
      </label>
      {/* Honeypot for bots */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="flex items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Send message →"}
        </button>
        <div className="text-xs font-mono text-ink-dim min-h-[1.25rem]" aria-live="polite">
          {status === "success" && <span className="text-accent">Thanks — I&apos;ll reply within a day.</span>}
          {status === "error" && <span className="text-red-400">{errorMsg}</span>}
          {status === "idle" && !formspreeId && <span>(Will open your email client)</span>}
        </div>
      </div>
    </form>
  );
}
