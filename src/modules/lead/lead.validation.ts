import { z } from "zod";

export const createLeadSchema = z.object({

  name: z
    .string()
    .min(2, "Name is required"),

  phone: z
    .string()
    .min(10, "Phone number invalid"),

  city: z
    .string()
    .min(2, "City is required"),

  serviceType: z.enum([
    "Service 1",
    "Service 2",
    "Service 3",
  ]),

  description: z.string().optional(),
});