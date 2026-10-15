export const LEGACY_UPLOAD_PREFIX = "/uploads/";
export const PLACEHOLDER_IMAGE = "/images/placeholders/new-orleans-skyline.svg";

export function resolveImageUrl(url: string | undefined | null): string {
  if (!url) return PLACEHOLDER_IMAGE;
  if (url.startsWith(LEGACY_UPLOAD_PREFIX)) return PLACEHOLDER_IMAGE;
  return url;
}

export function isManagedUploadUrl(url: string | undefined | null): boolean {
  return Boolean(url?.startsWith("/api/uploads/"));
}
