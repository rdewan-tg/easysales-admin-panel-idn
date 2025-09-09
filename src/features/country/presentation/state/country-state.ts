import { Country, CreateCountryDto } from "../../data";

export type CountryState = {
  countries: Country[];
  isLoading: boolean;
  isCountryCreated: boolean;
  error: string | null;
  getCountries: () => Promise<void>;
  createCountry: (data: CreateCountryDto) => Promise<void>;
};
