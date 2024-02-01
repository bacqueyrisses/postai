import Replicate from "replicate";

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("The REPLICATE_API_TOKEN environment variable is not set.");
}
export const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN as string,
});

export const model =
  "doriandarko/sdxl-hiroshinagai:563a66acc0b39e5308e8372bed42504731b7fec3bc21f2fcbea413398690f3ec";

export const version =
  "563a66acc0b39e5308e8372bed42504731b7fec3bc21f2fcbea413398690f3ec";

export const generatePrompt = (city: string) =>
  `In the style of HISGH. Create a single vibrant, picturesque postcard image that captures the essence of ${city}. Incorporate iconic landmarks, the cityscape, or elements that symbolize its culture, history, and unique atmosphere. Emphasize vivid colors, bustling streets, and a lively ambiance to evoke a sense of wonder and excitement for anyone receiving this postcard.`;

export const width = 1024;
export const height = 768;
