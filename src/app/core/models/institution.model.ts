import { Address } from './address.model';
import { Category } from './category.model';
import { Commune } from './commune.model';
export interface Institution{
    _id?: string;
    name: string;
    address: Address;
    atentionHour: string;
    phonesNumbers: string[]; 
    profilePictureUrl: string;
    email?: string;
    password?: string;
    description: string;
    categories: Category[];
    assignedCommunes: Commune[];
    comments: string[];
    checks?: string[];
    rejects?: string[];
    updatedAt?: Date;
    createdAt?: Date;
};
