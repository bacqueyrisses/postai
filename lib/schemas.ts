import { z } from "zod";

export const CreateSchema = z.object({
  id: z.string(),
  image: z.string(),
  blur: z.string(),
  city: z.string(),
  countryCode: z.string(),
  userId: z.string(),
});
