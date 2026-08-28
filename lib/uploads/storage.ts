import "server-only";

import { randomBytes } from "crypto";
import { connectMongo } from "@/lib/mongodb";
import { StoredUpload } from "@/models/StoredUpload";
import type { UploadFolder } from "@/lib/uploads/constants";
import { buildUploadUrl, parseUploadUrl } from "@/lib/uploads/urls";

export const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const DOCUMENT_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
] as const;

export const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
export const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

const EXTENSION_MIME: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export function getExtensionFromFile(file: File): string | null {
  const fromMime = MIME_EXTENSIONS[file.type];
  if (fromMime) return fromMime;

  const match = file.name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? null;
}

function isAllowedMime(file: File, ext: string, allowedMimeTypes: readonly string[]): boolean {
  if (allowedMimeTypes.includes(file.type)) return true;

  if (file.type === "application/octet-stream" || file.type === "") {
    return ["pdf", "jpg", "jpeg", "png", "webp", "doc", "docx", "gif"].includes(ext);
  }

  return false;
}

export function generateUploadFilename(ext: string): string {
  return `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;
}

export async function saveUploadBuffer(params: {
  folder: UploadFolder;
  originalName: string;
  mimeType: string;
  buffer: Buffer;
  allowedMimeTypes: readonly string[];
  maxSize: number;
}): Promise<{ url: string; filename: string; size: number; folder: UploadFolder }> {
  const { folder, originalName, mimeType, buffer, allowedMimeTypes, maxSize } = params;

  if (buffer.length === 0) {
    throw new Error("File is empty");
  }

  if (buffer.length > maxSize) {
    throw new Error(`File exceeds the ${Math.round(maxSize / (1024 * 1024))} MB size limit`);
  }

  const ext = getExtensionFromName(originalName, mimeType);
  if (!ext) {
    throw new Error("Unsupported file type");
  }

  if (!isAllowedMimeType(mimeType, ext, allowedMimeTypes)) {
    throw new Error("Unsupported file type");
  }

  const filename = generateUploadFilename(ext);
  const resolvedMimeType = mimeType || EXTENSION_MIME[ext] || "application/octet-stream";

  await connectMongo();
  await StoredUpload.create({
    folder,
    filename,
    mimeType: resolvedMimeType,
    size: buffer.length,
    data: buffer,
  });

  return {
    url: buildUploadUrl(folder, filename),
    filename,
    size: buffer.length,
    folder,
  };
}

function getExtensionFromName(name: string, mimeType: string): string | null {
  const fromMime = MIME_EXTENSIONS[mimeType];
  if (fromMime) return fromMime;

  const match = name.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match?.[1] ?? null;
}

function isAllowedMimeType(
  mimeType: string,
  ext: string,
  allowedMimeTypes: readonly string[]
): boolean {
  if (allowedMimeTypes.includes(mimeType)) return true;

  if (mimeType === "application/octet-stream" || mimeType === "") {
    return ["pdf", "jpg", "jpeg", "png", "webp", "doc", "docx", "gif"].includes(ext);
  }

  return false;
}

export async function saveUpload(params: {
  folder: UploadFolder;
  file: File;
  allowedMimeTypes: readonly string[];
  maxSize: number;
}): Promise<{ url: string; filename: string; size: number; folder: UploadFolder }> {
  const { folder, file, allowedMimeTypes, maxSize } = params;

  if (file.size === 0) {
    throw new Error("File is empty");
  }

  if (file.size > maxSize) {
    throw new Error(`File exceeds the ${Math.round(maxSize / (1024 * 1024))} MB size limit`);
  }

  const ext = getExtensionFromFile(file);
  if (!ext) {
    throw new Error("Unsupported file type");
  }

  if (!isAllowedMime(file, ext, allowedMimeTypes)) {
    throw new Error("Unsupported file type");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return saveUploadBuffer({
    folder,
    originalName: file.name,
    mimeType: file.type,
    buffer,
    allowedMimeTypes,
    maxSize,
  });
}

export async function deleteUploadByUrl(url: string): Promise<boolean> {
  const parsed = parseUploadUrl(url);
  if (!parsed) return false;

  await connectMongo();
  const result = await StoredUpload.deleteOne({
    folder: parsed.folder,
    filename: parsed.filename,
  });

  return result.deletedCount > 0;
}

export async function getStoredUpload(folder: UploadFolder, filename: string) {
  await connectMongo();
  return StoredUpload.findOne({ folder, filename }).lean();
}
