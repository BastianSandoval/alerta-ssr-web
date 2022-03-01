export interface Admin {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role?: string;
  updatedAt?: Date;
  createdAt?: Date;
};
