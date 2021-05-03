export interface Report {
    _id?: string;
    user:string;
    title: string;
    category: string;
    date: Date;
    location: string;
    checks: number;
    lastCheckAt?: Date;
    reject: number;
    description:string;
    numeroDenuncias:number;
    imageUrl: string;
    updatedAt?: Date;
    createdAt?: Date;
  }