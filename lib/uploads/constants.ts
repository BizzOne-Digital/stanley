export const UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];
