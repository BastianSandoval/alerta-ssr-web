export interface Report {
    _id: string;
    usuario:string;
    title: string;
    category: string;
    date: Date;
    location: string;
    validation: {
        number: number;
        date: Date;
    };
    reject: number;
    description:string;
    numeroDenuncias:number;
  }