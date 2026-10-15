import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { getStoredUpload } from "@/lib/uploads/storage";
import { isValidUploadFolder, sanitizeFilename } from "@/lib/uploads/urls";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ folder: string; filename: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { folder, filename } = await context.params;

    if (!isValidUploadFolder(folder)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const safeFilename = sanitizeFilename(filename);
    if (!safeFilename) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await connectMongo();
    const upload = await getStoredUpload(folder, safeFilename);

    if (!upload) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(upload.data), {
      status: 200,
      headers: {
        "Content-Type": upload.mimeType,
        "Content-Length": String(upload.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to load file" }, { status: 500 });
  }
}
