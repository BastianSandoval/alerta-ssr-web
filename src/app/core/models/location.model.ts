export interface Location {
    _id?: string;
    latitude: string;
    longitude: string;
    commune: string;
    streetName?: string;
    streetNumber?: number;
    updatedAt?: Date;
    createdAt?: Date;
};