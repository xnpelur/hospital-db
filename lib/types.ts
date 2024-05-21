export type WithDependencies = {
    id: number;
    dependencies: number;
};

export type Patient = WithDependencies & {
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
    title: string;
};

export type Treatment = WithDependencies & {
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
    title: string;
    beds_number: number;
    phone: string;
};

export type SocialStatus = WithDependencies & {
    title: string;
};

export type Doctor = WithDependencies & {
    full_name: string;
    department: string;
    enrollment_date: Date;
    category: string;
    salary: number;
};

export type SimplifiedColumnDef = {
    key: string;
    title: string;
    type?: "date" | "number" | "phone" | "patient_badge";
    sortable?: boolean;
    default?: any;
    disabled?: boolean;
    values?: string[];
    hiddenInForm?: boolean;
};

export type Query = {
    id: number;
    function_name: string;
    title: string;
    description: string;
    columns: SimplifiedColumnDef[];
};
