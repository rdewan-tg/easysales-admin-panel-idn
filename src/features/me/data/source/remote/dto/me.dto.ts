export interface MeDto {
  status: string;
  data: Me;
}

export interface Me {
  id: number;
  name: string;
  email: string;
  phoneNumber: null;
  role: Role[];
  company: Company;
}

export interface Company {
  id: number;
  name: string;
  timeZone: string;
}

export interface Role {
  id: number;
  name: string;
}
