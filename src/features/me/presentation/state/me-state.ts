import { ChangeCompanyDto, Me } from "../../data";

export type MeState = {
  isLoading: boolean;
  me: Me | null;
  error: string | null;
  getMe: () => Promise<void>;
  changeCompany: (data: ChangeCompanyDto) => Promise<void>;
};
