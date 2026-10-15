"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { LocalImageField } from "@/components/admin/LocalImageField";
import type { UploadFolder } from "@/lib/uploads/constants";

const DEMO_IMAGES: { key: string; label: string; folder: UploadFolder }[] = [
  { key: "hero", label: "Homepage Hero", folder: "pages" },
  { key: "gallery", label: "Gallery Image", folder: "gallery" },
  { key: "product", label: "Product Image", folder: "products" },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/admin/login")
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => {
        setAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setSigningIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Invalid password");
      }

      setAuthenticated(true);
      toast.success("Signed in");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign in";
      toast.error(message);
    } finally {
      setSigningIn(false);
    }
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-ivory">
        <Loader2 className="h-8 w-8 animate-spin text-gold" aria-hidden />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 rounded-sm border border-gold/20 bg-carbon p-8 metallic-edge"
        >
          <div className="text-center">
            <Lock className="mx-auto mb-4 h-10 w-10 text-gold" aria-hidden />
            <h1 className="font-display text-2xl uppercase tracking-wide text-ivory">
              Admin Sign In
            </h1>
            <p className="mt-2 text-sm text-muted">
              Upload images that persist across Vercel deploys.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-ivory">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-sm border border-graphite bg-black px-4 py-3 text-ivory focus:border-gold focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={signingIn}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-4 py-3 font-semibold text-black transition-colors hover:bg-gold-bright disabled:opacity-60"
          >
            {signingIn ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-ivory">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="font-display text-3xl uppercase tracking-wide text-gold">
            Image Uploads
          </h1>
          <p className="mt-2 text-muted">
            Files are stored in MongoDB and served from `/api/uploads/...` so they survive
            redeploys on Vercel.
          </p>
        </div>

        <div className="space-y-8">
          {DEMO_IMAGES.map((item) => (
            <LocalImageField
              key={item.key}
              label={item.label}
              folder={item.folder}
              value={images[item.key] ?? ""}
              onChange={(url) =>
                setImages((current) => ({
                  ...current,
                  [item.key]: url,
                }))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
