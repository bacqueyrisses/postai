"use server";

import { kv } from "@vercel/kv";
import { nanoid } from "@/lib/utils";
import { WEBHOOK_URL } from "@/lib/constants";
import {
  generatePrompt,
  height,
  replicate,
  version,
  width,
} from "@/lib/replicate";

export async function generate(form: FormData) {
  const city = form.get("city") as string;
  const countryCode = form.get("countryCode") as string;

  const id = nanoid();

  const prompt = generatePrompt(city);

  await Promise.all([
    kv.hset(id, {
      prompt,
      city,
      countryCode,
    }),
    replicate.predictions.create({
      version,
      input: {
        prompt,
        width,
        height,
      },
      webhook: `${WEBHOOK_URL}?id=${id}${
        process.env.REPLICATE_WEBHOOK_SECRET
          ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
          : ""
      }`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  return id;
}
