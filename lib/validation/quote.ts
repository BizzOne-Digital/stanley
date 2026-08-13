import { z } from "zod";

export const quoteFormSchema = z.object({
  serviceType: z.string().min(1, "Service type is required"),
  deliveryTiming: z.enum(["same-day", "rush", "scheduled", "recurring"]),
  customerType: z.enum(["business", "individual"]),
  pickupAddress: z.string().min(3, "Pickup location is required").max(300),
  deliveryAddress: z.string().min(3, "Delivery location is required").max(300),
  numberOfStops: z.number().min(1).max(20),
  roundTrip: z.enum(["yes", "no"]),
  preferredDate: z.string().min(1, "Preferred date is required"),
  pickupTime: z.string().optional().or(z.literal("")),
  deliveryTime: z.string().optional().or(z.literal("")),
  itemCategory: z.string().min(1, "Item category is required"),
  approximateSize: z.string().min(1, "Approximate size is required"),
  approximateWeight: z.string().min(1, "Approximate weight is required"),
  quantity: z.number().min(1).max(100),
  fragile: z.enum(["yes", "no"]),
  specialHandling: z.string().max(1000).optional().or(z.literal("")),
  waitTime: z.string().optional().or(z.literal("")),
  itemClassification: z.enum(["medical", "legal", "business", "general"]),
  fullName: z.string().min(2, "Full name is required").max(100),
  company: z.string().max(100).optional().or(z.literal("")),
  email: z.string().email("Valid email is required").max(254),
  phone: z.string().min(7, "Phone number is required").max(20),
  preferredContact: z.enum(["email", "phone", "either"]),
  additionalNotes: z.string().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to be contacted" }),
  website: z.string().max(0).optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;

export const quoteStep1Schema = quoteFormSchema.pick({
  serviceType: true,
  deliveryTiming: true,
  customerType: true,
});

export const quoteStep2Schema = quoteFormSchema.pick({
  pickupAddress: true,
  deliveryAddress: true,
  numberOfStops: true,
  roundTrip: true,
  preferredDate: true,
  pickupTime: true,
  deliveryTime: true,
});

export const quoteStep3Schema = quoteFormSchema.pick({
  itemCategory: true,
  approximateSize: true,
  approximateWeight: true,
  quantity: true,
  fragile: true,
  specialHandling: true,
  waitTime: true,
  itemClassification: true,
});

export const quoteStep4Schema = quoteFormSchema.pick({
  fullName: true,
  company: true,
  email: true,
  phone: true,
  preferredContact: true,
  additionalNotes: true,
  consent: true,
});
