import { z } from "zod";

export const CreateSchema = z.object({
  image: z.string(),
  blur: z.string(),
  city: z.string(),
  countryCode: z.string(),
  userId: z.string(),
});
