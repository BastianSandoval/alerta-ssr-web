export interface Event {
    _id?: string;
    complaints: string[];
    location: string;
    checks: number;
    rejections: number;
    updatedAt?: Date;
    createdAt?: Date;
  };