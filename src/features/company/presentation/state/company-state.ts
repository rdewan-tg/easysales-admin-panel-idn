import { Company } from "@/common/dtos";
import { CreateCompanyDto } from "../../data";

export type CompanyState = {
  isLoading: boolean;
  companies: Company[];
  error: string | null;
  isCreated: boolean | null;
  isUpdated: boolean | null;
  isDeleted: boolean | null;
  getCompanies: () => Promise<void>;
  createCompany: (data: CreateCompanyDto) => Promise<void>;
  updateCompany: (data: Company) => Promise<void>;
  deleteCompany: (id: number) => Promise<void>;
};
