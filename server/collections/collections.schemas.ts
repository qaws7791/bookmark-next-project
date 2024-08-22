import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200),
  colorCode: z.string().regex(/^#[\da-f]{6}$/i),
});
