export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export type Patient = {
    full_name: string;
    birth_date: Date;
    social_status: string;
    admission_date: Date;
    discharge_date: Date;
};
