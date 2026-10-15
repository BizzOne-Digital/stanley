import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  company: z.string().max(100).optional().or(z.literal("")),
  email: z.string().email("Valid email is required").max(254),
  phone: z.string().min(7, "Phone number is required").max(20),
  preferredContact: z.enum(["email", "phone", "either"]),
  serviceInterest: z.string().min(1, "Please select a service interest").max(100),
  pickupArea: z.string().min(2, "Pickup area is required").max(200),
  deliveryArea: z.string().min(2, "Delivery area is required").max(200),
  preferredDate: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to be contacted" }),
  website: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
