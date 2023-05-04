export interface Tender {
    _id?: string;
    title: string;
    category: string;
    description: string;
    budget: string;
    warranty: string;
    contract_conditions: string;
    execution_date: Date;
    address: string;
    documents: string;
    media: string;
    start_date: Date;
    end_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
}