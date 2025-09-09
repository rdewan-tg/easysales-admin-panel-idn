import { SignupForm, UpdatePasswordForm } from "@/common/types";
import { Company, UpdateUserDto, User, UserDetail } from "../../data";

export type UserState = {
  users: User[];
  user?: UserDetail;
  companies: Company[];
  isLoading: boolean;
  isUserDeleted: boolean | null;
  isPasswordUpdated: boolean | null;
  error: string | null;
  deleteSnackbarOpen: boolean;
  isUserCreated: boolean | null;
  isUserUpdated: boolean | null;
  createUser: (data: SignupForm) => Promise<void>;
  setDeleteUserSnackbarOpen: (value: boolean) => void;
  getUsersByCompany: () => Promise<void>;
  getUserById: (id: number) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setUserDeleted: (value: boolean) => void;
  getCompanies: () => Promise<void>;
  updatePassword: (data: UpdatePasswordForm) => Promise<void>;
  updateUser: (data: UpdateUserDto) => Promise<void>;
  reset: () => void;
};
