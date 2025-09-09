export interface CompanyDto {
  status: string;
  data: Company[];
}

export interface Company {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  companyCode: string;
  createdAt: Date;
  updatedAt: Date;
  companySetting: CompanySetting;
}

export interface CompanySetting {
  timeZone: string;
  currencyCode: string;
  isSiteVisitEnabled: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCompanyDto(json: string): CompanyDto {
    return JSON.parse(json);
  }

  public static companyDtoToJson(value: CompanyDto): string {
    return JSON.stringify(value);
  }
}
