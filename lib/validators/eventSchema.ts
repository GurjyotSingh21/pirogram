import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(10, "Description too short"),

  category: z.string().min(1),

  location: z.string().min(2),

  startDate: z.date(),

  endDate: z.date(),

  price: z.number().min(0),

  url: z.string().url().optional(),

  imageUrl: z.string().optional(),

  isFree: z.boolean().optional()
})

export type EventFormValues = z.infer<typeof eventSchema>