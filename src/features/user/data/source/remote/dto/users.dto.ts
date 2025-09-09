import { Company } from "@/common/dtos";
import { Role } from "@/common/interface";
import { Area } from "@/common/interface";

export interface UsersDto {
  status: string;
  data: User[];
}

export interface User {
  id: number;
  createAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  passwordHash: string;
  phoneNumber: null;
  photo: null;
  authType: string;
  emailVerified: boolean;
  firebaseUID: null;
  roles: Role[];
  company: Company;
  userAreas: Area[];
}
