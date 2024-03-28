export type Patient = {
    id: number;
    full_name: string;
    birth_date: Date;
    social_status: string;
    admission_date: Date;
    discharge_date: Date;
};

export type Disease = {
    id: number;
    title: string;
};

export type Treatment = {
    id: number;
    title: string;
    cost: number;
    start_date: Date;
    end_date: Date;
    repeat_interval: string;
    disease: string;
};
