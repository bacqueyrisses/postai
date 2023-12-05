import Replicate from "replicate";

export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export const model =
  "doriandarko/sdxl-hiroshinagai:563a66acc0b39e5308e8372bed42504731b7fec3bc21f2fcbea413398690f3ec";
