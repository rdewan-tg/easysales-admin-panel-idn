import { Role } from "@/common/interface";

export interface LoginResponse {
  status: string;
  data: LoginResponseData;
}

export interface LoginResponseData {
  token: Token;
  user: User;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string | null;
  photo: string | null;
  role: Role[];
  company: Company;
  deviceSetting: DeviceSetting;
}

export interface Company {
  id: number;
  name: string;
  timeZone: string;
  companyCode: string;
  countryCode: string;
}

export interface DeviceSetting {}
