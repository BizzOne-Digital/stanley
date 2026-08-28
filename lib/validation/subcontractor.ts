import { z } from "zod";

const yesNo = z.enum(["yes", "no"], { message: "Please select yes or no" });

export const subcontractorFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  phone: z.string().min(7, "Phone number is required").max(20),
  email: z.string().email("Valid email is required").max(254),
  cityArea: z.string().min(2, "City/area is required").max(200),
  hasLicense: yesNo,
  hasTransportation: yesNo,
  yearsExperience: z.string().min(1, "Years of experience is required").max(50),
  vehicleType: z.string().min(1, "Vehicle type is required").max(100),
  availability: z.string().min(2, "Availability is required").max(500),
  deliveryExperience: z.string().max(2000).optional().or(z.literal("")),
  courierExperience: z.string().max(2000).optional().or(z.literal("")),
  customerServiceExperience: z.string().max(2000).optional().or(z.literal("")),
  goodFit: z
    .string()
    .min(10, "Please tell us why you'd be a good fit (at least 10 characters)")
    .max(2000),
  additionalInfo: z.string().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to be contacted" }),
  website: z.string().max(0).optional(),
});

export type SubcontractorFormData = z.infer<typeof subcontractorFormSchema>;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
