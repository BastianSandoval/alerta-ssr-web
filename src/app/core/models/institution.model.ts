import { Address } from './address.model';
export interface Institution{
    _id?: string;
    name: string;
    address: string | Address;
    atentionHour: string;
    phonesNumbers: string[]; 
    profilePictureUrl: string;
    email?: string;
    password?: string;
    description: string;
    categories: string[];
    assignedCommunes: string[];
    comments: string[];
    checks?: string[];
    rejects?: string[];
    updatedAt?: Date;
    createdAt?: Date;
};
