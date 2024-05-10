type WithDependencies = {
    dependencies: number;
};

export type Patient = WithDependencies & {
    id: number;
    full_name: string;
    birth_date: Date;
    social_status: string;
    username?: string;
};

export type PatientRecord = Patient & {
    admission_date: Date;
    discharge_date: Date;
};

export type Disease = WithDependencies & {
    id: number;
    title: string;
};

export type Treatment = WithDependencies & {
    id: number;
    title: string;
    cost: number;
};

export type TreatmentRecord = Treatment & {
    start_date: Date;
    end_date: Date;
    repeat_interval: string;
    disease: string;
};

export type ClinicalRecord = {
    id: number;
    disease_title: string;
};

export type RecordDependencies = {
    title: string;
    dependencies_count: number;
};

export type Department = WithDependencies & {
    id: number;
    title: string;
    beds_number: number;
    phone: string;
};

export type SocialStatus = WithDependencies & {
    id: number;
    title: string;
};

export type Doctor = WithDependencies & {
    id: number;
    full_name: string;
    department: string;
    enrollment_date: Date;
    category: string;
    salary: number;
};
