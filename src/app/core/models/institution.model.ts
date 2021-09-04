export interface Institution{
    _id?: string;
    name: string;
    address: string;
    atentionHour: string;
    phonesNumbers: string[]; 
    profilePicture: string;
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
