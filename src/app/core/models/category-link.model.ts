export interface CategoryLink {
    _id?: string,
    categoryId: string;
    communeId: string;
    regionId: string;
    link: string;
    updatedAt?: Date;
    createdAt?: Date;
}