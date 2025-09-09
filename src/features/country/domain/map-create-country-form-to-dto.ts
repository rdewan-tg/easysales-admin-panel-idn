import { CreateCountryDto } from "../data";

export const mapCreateCountryFormToDto = (form: CreateCountryDto) => {
  return {
    name: form.name,
    countryCode: form.countryCode,
    currencyCode: form.currencyCode,
  };
};
