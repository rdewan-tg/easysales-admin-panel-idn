import { createSelectors } from "@/core/data";
import { create } from "zustand";
import { createCountry, CreateCountryDto, getCountries } from "../../data";
import { CountryState } from "../state/country-state";

const useCountryStore = create<CountryState>((set) => ({
  countries: [],
  isLoading: false,
  isCountryCreated: false,
  error: null,
  getCountries: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getCountries();
      set({ countries: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  createCountry: async (data: CreateCountryDto) => {
    try {
      set({ isLoading: true, error: null });
      await createCountry(data);
      set({ isLoading: false, isCountryCreated: true, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
}));

export default createSelectors(useCountryStore);
