import { createSelectors } from "@/core/data";
import { create } from "zustand";
import { CompanyState } from "../state/company-state";
import { getCompanies } from "@/features/user/data";
import { 
  createCompany, 
  updateCompany as updateCompanyApi, 
  deleteCompany as deleteCompanyApi 
} from "../../data/source/remote/api/company-api-service";
import { CreateCompanyDto } from "../../data";
import { Company } from "@/common/dtos";

const useCompanyStore = create<CompanyState>((set) => ({
  companies: [],
  isLoading: false,
  error: null,
  isCreated: null,
  isUpdated: null,
  isDeleted: null,
  getCompanies: async () => {
    try {
      set({ isLoading: true, error: null, isCreated: null, isUpdated: null, isDeleted: null });
      const response = await getCompanies();
      set({ companies: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    }
  },
  createCompany: async (data: CreateCompanyDto): Promise<void> => {
    try {
      set({ isLoading: true, error: null, isCreated: null, isUpdated: null, isDeleted: null });
      await createCompany(data);
      set({ isLoading: false, error: null, isCreated: true });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage, isCreated: false });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    }
  },
  
  updateCompany: async (data: Company): Promise<void> => {
    try {
      set({ isLoading: true, error: null, isCreated: null, isUpdated: null, isDeleted: null });
      await updateCompanyApi(data);
      const updatedCompanies = await getCompanies();
      set({ 
        companies: updatedCompanies.data, 
        isLoading: false, 
        error: null,
        isUpdated: true 
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage, isUpdated: false });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    }
  },
  
  deleteCompany: async (id: number): Promise<void> => {
    try {
      set({ isLoading: true, error: null, isCreated: null, isUpdated: null, isDeleted: null });
      await deleteCompanyApi(id);
      const updatedCompanies = await getCompanies();
      set({ 
        companies: updatedCompanies.data, 
        isLoading: false, 
        error: null,
        isDeleted: true 
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage, isDeleted: false });
      setTimeout(() => {
        set({ error: null });
      }, 5000);
    }
  },
}));

export default createSelectors(useCompanyStore);
