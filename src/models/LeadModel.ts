export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    opportunities: string[];
}

export interface CreateLead {
    name: string;
    email: string;
    phone: string;
    status: string;
    opportunities: string[];
}