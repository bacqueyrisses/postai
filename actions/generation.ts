"use server";

import Replicate from "replicate";
import { kv } from "@vercel/kv";
import { nanoid } from "@/lib/utils";
import { WEBHOOK_URL } from "@/lib/constants";
import { put } from "@vercel/blob";
import { generatePrompt } from "@/lib/replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export async function generate(form: FormData) {
  const city = form.get("city") as string;
  const countryCode = form.get("countryCode") as string;

  const id = nanoid();

  const prompt = generatePrompt(city);

  const res = await Promise.all([
    kv.hset(id, {
      prompt,
      countryCode,
    }),
    replicate.predictions.create({
      version:
        "563a66acc0b39e5308e8372bed42504731b7fec3bc21f2fcbea413398690f3ec",
      input: {
        prompt,
      },
      webhook: `${WEBHOOK_URL}?id=${id}${
        process.env.REPLICATE_WEBHOOK_SECRET
          ? `&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
          : ""
      }`,
      webhook_events_filter: ["completed"],
    }),
  ]);

  console.log(res);

  return id;
}
