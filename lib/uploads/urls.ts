import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/uploads/constants";

export { UPLOAD_FOLDERS, type UploadFolder };

export function isValidUploadFolder(folder: string): folder is UploadFolder {
  return (UPLOAD_FOLDERS as readonly string[]).includes(folder);
}

export function sanitizeFilename(filename: string): string | null {
  if (!filename || filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return null;
  }
  return filename;
}

export function buildUploadUrl(folder: UploadFolder, filename: string): string {
  return `/api/uploads/${folder}/${filename}`;
}

export function parseUploadUrl(url: string): { folder: UploadFolder; filename: string } | null {
  const match = url.match(/^\/api\/uploads\/([^/]+)\/([^/]+)$/);
  if (!match) return null;

  const folder = match[1];
  const filename = match[2];
  if (!isValidUploadFolder(folder) || !sanitizeFilename(filename)) return null;

  return { folder, filename };
}
