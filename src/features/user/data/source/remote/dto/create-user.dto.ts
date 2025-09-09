export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  companyId: number;
  roleId: number | null;
}
