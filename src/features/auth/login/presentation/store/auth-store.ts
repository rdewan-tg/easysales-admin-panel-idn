import { create } from "zustand";
import { AuthState } from "..";
import { LoginForm } from "../../../../../common/types";
import {
  checkAuthState,
  getMyRoles,
  login,
  logout,
} from "@/features/auth/login/data";
import { createSelectors } from "../../../../../core/data/index";
import { Role } from "@/common/interface";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  roles: [] as Role[],
  login: async (data: LoginForm) => {
    try {
      set({ isLoading: true, error: null });
      // call api
      await login(data);
      // update the state
      set({ isAuthenticated: true, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isAuthenticated: false, isLoading: false, error: errorMessage });
    }
  },
  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      // call api
      await logout();
      // update the state
      set({ isAuthenticated: false, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  checkAuthState: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await checkAuthState();
      set({
        isAuthenticated: response.isAuthenticated,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isAuthenticated: false, isLoading: false, error: errorMessage });
    }
  },
  getMyRoles: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getMyRoles();
      set({
        roles: response.data,
      });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ error: errorMessage });
    }
  },
}));

export default createSelectors(useAuthStore);
