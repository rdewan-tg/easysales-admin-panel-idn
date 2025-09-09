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
  comapnyId: number;
}
