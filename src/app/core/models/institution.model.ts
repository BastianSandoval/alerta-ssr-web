export interface Institution{
    _id?:string;
    name: string;
    addres: string;
    atentionHour: string;
    phonesNumbers: string[];
    profilePicture?: string | File;
    email: string;
    password: string;
    description: string;
    categories: string[];
    assignedCommunes: string[];
    comments?: string[];
    createdAt?: Date;
    updateAt?: Date;
}