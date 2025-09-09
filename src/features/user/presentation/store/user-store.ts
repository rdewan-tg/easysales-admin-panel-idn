import { create } from "zustand";
import { createSelectors } from "../../../../core/data";
import { UserState } from "../state/user-state";
import {
  createUser,
  deleteUser,
  getCompanies,
  getUserById,
  getUsersByCompany,
  updatePassword,
  updateUser,
  UpdateUserDto,
} from "../../data";
import { SignupForm, UpdatePasswordForm } from "@/common/types";

const useUserStore = create<UserState>((set, get) => ({
  users: [],
  user: undefined,
  companies: [],
  isLoading: false,
  isPasswordUpdated: null,
  isUserDeleted: null,
  isUserCreated: null,  
  isUserUpdated: null,
  error: null,
  deleteSnackbarOpen: false,
  createUser: async (data: SignupForm): Promise<void> => {
    try {
      set({ isLoading: true, isUserCreated: null, error: null });
      await createUser(data);
      set({ isLoading: false, isUserCreated: true, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  setDeleteUserSnackbarOpen: (value: boolean) => {
    set({ deleteSnackbarOpen: value });
  },
  getUsersByCompany: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getUsersByCompany();
      set({ users: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ users: [], isLoading: false, error: errorMessage });
    }
  },
  getUserById: async (id: number) => {
    try {
      set({ isLoading: true, error: null, isUserDeleted: null });
      const response = await getUserById(id);
      set({ user: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  deleteUser: async function (id: number) {
    try {
      set({ isLoading: true, error: null, isUserDeleted: null });
      await deleteUser(id);
      set({ isUserDeleted: true, isLoading: false, error: null });
      get().reset();
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  setUserDeleted: (value: boolean) => {
    set({ isUserDeleted: value });
  },
  getCompanies: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await getCompanies();
      set({ companies: response.data, isLoading: false, error: null });
    } catch (error) {
      const errorMessage = (error as Error).message;
      set({ isLoading: false, error: errorMessage });
    }
  },
  updatePassword: async (data: UpdatePasswordForm) => {
    try {
      set({ isLoading: true, error: null, isPasswordUpdated: null });
      // call the api to update the password
      await updatePassword(data);
      // update state
      set({ isLoading: false, error: null, isPasswordUpdated: true });
      // after 5 sec update the isPasswordUpdated to false
      setTimeout(() => {
        set({ isPasswordUpdated: false });
      }, 5000);
    } catch (error) {
      // Better error handling
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      set({ isLoading: false, error: errorMessage });
    }
  },
  updateUser: async (data: UpdateUserDto) => {
    try {
      set({ isLoading: true, error: null, isUserUpdated: null });
      await updateUser(data);
      set({ isLoading: false, error: null, isUserUpdated: true });
      // Refresh user data
      await get().getUserById(data.id);
      setTimeout(() => {
        set({ isUserUpdated: false });
      }, 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user";
      set({ isLoading: false, error: errorMessage });
    }
  },
  reset: () => {
    set({
      users: [],
    });
  },
}));

export default createSelectors(useUserStore);
