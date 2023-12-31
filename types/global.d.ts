type SelectionType = "default" | "currentLocation" | "userSelection";

export type SelectedCityType = {
  city: string;
  countryCode: string;
  type?: SelectionType;
};

export type SelectedCityPreType = Omit<SelectedCityType, "type"> & {
  type?: "default";
};
