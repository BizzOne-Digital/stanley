import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth/admin";
import { isMongoConfigured } from "@/lib/mongodb";
import {
  IMAGE_MIME_TYPES,
  MAX_IMAGE_SIZE,
  deleteUploadByUrl,
  saveUpload,
} from "@/lib/uploads/storage";
import { isValidUploadFolder } from "@/lib/uploads/urls";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { error: "File storage is not configured. Set MONGODB_URI." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    if (!isValidUploadFolder(folder)) {
      return NextResponse.json({ error: "Invalid upload folder" }, { status: 400 });
    }

    const saved = await saveUpload({
      folder,
      file,
      allowedMimeTypes: IMAGE_MIME_TYPES,
      maxSize: MAX_IMAGE_SIZE,
    });

    return NextResponse.json({
      success: true,
      url: saved.url,
      filename: saved.filename,
      size: saved.size,
      folder: saved.folder,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url).searchParams.get("url");
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const deleted = await deleteUploadByUrl(url);
    return NextResponse.json({ success: true, deleted });
  } catch {
    return NextResponse.json({ error: "Unable to delete file" }, { status: 500 });
  }
}
