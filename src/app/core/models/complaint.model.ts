export interface Complaint{
  _id?: string;
  title: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  user: string;
  checks?: number;
  lastCheckedAt?: Date;
  rejections?: number;
  comments?: string[];
  rejected?: boolean;
  usersCheck?: string[];
  usersReject?: string[];
  institutionsCheck?: string[];
  institutionsReject?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}