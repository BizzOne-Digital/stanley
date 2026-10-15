import "server-only";

import mongoose, { Schema, type Model } from "mongoose";
import { UPLOAD_FOLDERS, type UploadFolder } from "@/lib/uploads/constants";

export type { UploadFolder };

export interface StoredUploadDocument {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const StoredUploadSchema = new Schema<StoredUploadDocument>(
  {
    folder: { type: String, required: true, enum: UPLOAD_FOLDERS },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

export const StoredUpload: Model<StoredUploadDocument> =
  mongoose.models.StoredUpload ??
  mongoose.model<StoredUploadDocument>("StoredUpload", StoredUploadSchema);
