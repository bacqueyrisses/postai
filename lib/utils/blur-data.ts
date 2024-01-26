import { getPlaiceholder } from "plaiceholder";

async function getBlurData(image: string) {
  const buffer = await fetch(image).then(async (response) =>
    Buffer.from(await response.arrayBuffer()),
  );

  return await getPlaiceholder(buffer);
}

export { getBlurData };
