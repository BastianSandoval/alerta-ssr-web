export interface User {
    _id?: string;
    names: string;
    lastNames: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    complaints?: string[];
    comments?: string[];
    checks?: string[];
    updatedAt?: Date;
    createdAt?: Date;
};