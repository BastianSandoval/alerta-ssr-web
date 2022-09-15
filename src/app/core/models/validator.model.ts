export interface Validator {
    _id?: string;
    names: string;
    institutionId: string;
    lastNames: string;
    email: string;
    address: string;
    phone: string;
    password: string;
    profilePictureUrl?: string;
    complaints?: string[];
    comments?: string[];
    rut: string;
    isAuth: boolean;
    checks?: string[];
    updatedAt?: Date;
    createdAt?: Date;
}