import {
  axiosAdminInstance,
  createCountryEndpoint,
  getCountriesEndpoint,
} from "@/core/data";
import { CountryDto } from "../dto/country.dto";
import { CreateCountryDto } from "../dto/create-country.dto";

export const getCountries = async () => {
  const response =
    await axiosAdminInstance.get<CountryDto>(getCountriesEndpoint);
  return response.data;
};

export const createCountry = async (data: CreateCountryDto) => {
  const response = await axiosAdminInstance.post<any>(
    createCountryEndpoint,
    data,
  );
  return response.data;
};
