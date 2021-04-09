export interface Report {
    _id: string;
    title: string;
    category: string;
    date: Date;
    location: string;
    validation: {
        number: number;
        date: Date;
    };
    reject: number;
  }