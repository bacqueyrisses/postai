import { getPlaiceholder } from "plaiceholder";

async function getBlurData(src: string) {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  return await getPlaiceholder(buffer);
}

export { getBlurData };
