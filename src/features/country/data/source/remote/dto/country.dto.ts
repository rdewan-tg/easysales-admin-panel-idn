export interface CountryDto {
  status: string;
  data: Country[];
}
export interface Country {
  id: number;
  name: string;
  countryCode: string;
  companyCode: string;
  currencyCode: string;
  timeZone: string;
}
