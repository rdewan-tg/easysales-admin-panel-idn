import { Area } from "@/common/interface";
import { Role } from "@/common/interface";

export interface UserDto {
  status: string;
  data: UserDetail;
}

export interface UserDetail {
  id: number;
  createAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  phoneNumber: string | null;
  photo: string | null;
  roles: Role[];
  company: Company;
  areas: Area[];
}


interface Company {
  id: number;
  name: string;
  timeZone: string;
}


