export const fetchData = async (text: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&types=(cities)&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`,
  );

  return await response.json();
};
