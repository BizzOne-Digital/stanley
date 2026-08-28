"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/uploads/constants";
import { resolveImageUrl, isManagedUploadUrl } from "@/lib/uploads/resolve";
import { cn } from "@/lib/utils";

type LocalImageFieldProps = {
  label: string;
  value: string;
  folder: UploadFolder;
  onChange: (url: string) => void;
  className?: string;
};

export function LocalImageField({
  label,
  value,
  folder,
  onChange,
  className,
}: LocalImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const previewUrl = resolveImageUrl(value);

  const uploadFile = async (file: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as {
        success?: boolean;
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        throw new Error(result.error ?? "Upload failed");
      }

      if (value && value !== result.url && isManagedUploadUrl(value)) {
        await fetch(`/api/upload?url=${encodeURIComponent(value)}`, {
          method: "DELETE",
        }).catch(() => undefined);
      }

      onChange(result.url);
      toast.success("Image uploaded");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      toast.error(message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    if (value && isManagedUploadUrl(value)) {
      await fetch(`/api/upload?url=${encodeURIComponent(value)}`, {
        method: "DELETE",
      }).catch(() => undefined);
    }
    onChange("");
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-ivory">{label}</label>
        <span className="text-xs uppercase tracking-wide text-muted">{folder}</span>
      </div>

      <div className="rounded-sm border border-gold/20 bg-carbon p-4">
        {value ? (
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-gold/10 bg-black">
              <Image
                src={previewUrl}
                alt={label}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 320px"
                unoptimized={previewUrl.startsWith("/api/uploads/")}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-4 py-2 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold/10 disabled:opacity-60"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Upload className="h-4 w-4" aria-hidden />
                )}
                Replace
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-sm border border-error/40 px-4 py-2 text-sm font-semibold text-error transition-colors hover:bg-error/10 disabled:opacity-60"
              >
                <X className="h-4 w-4" aria-hidden />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="flex min-h-40 w-full flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-gold/30 px-4 py-8 text-center transition-colors hover:border-gold hover:bg-gold/5 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-gold" aria-hidden />
            ) : (
              <Upload className="h-8 w-8 text-gold" aria-hidden />
            )}
            <span className="text-sm text-muted">
              Upload PNG, JPG, WEBP, or GIF (max 8 MB)
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void uploadFile(file);
        }}
      />

      <p className="text-xs text-muted">
        Allowed folders: {UPLOAD_FOLDERS.join(" · ")}
      </p>
    </div>
  );
}
