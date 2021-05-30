export interface Report {
    _id?: string;
    title: string;
    location: string;
    ubication?: string;
    category: string;
    description:string;
    imageUrl: string | File;
    user:string;
    checks?: number;
    reject?: number;
    date: Date;
    rejected?: boolean;
    lastCheckAt?: Date;
    updatedAt?: Date;
    createdAt?: Date;
  }