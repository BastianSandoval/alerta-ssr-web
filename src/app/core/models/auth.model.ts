import { User } from './user.model';

export interface Auth {
    _id?: string;
    email: string;
    authenticated: User;
    entity: string;
    password?: string;
    token?: string;
    updatedAt?: Date;
    createdAt?: Date;
};