import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  time: z.string(),
  visibility: z.enum(["public", "private"]),
});
export type CreateEventType = z.infer<typeof CreateEventSchema>;
