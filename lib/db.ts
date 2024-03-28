"use server";

import { Client } from "pg";
import { Disease, Patient, Treatment } from "./types";

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    database: process.env.DB_NAME,
};

async function runQuery(query: string) {
    const hasUndefinedValues = Object.values(dbConfig).some(
        (value) => value === undefined
    );

    if (hasUndefinedValues) {
        throw new Error(
            "One or more database configuration values are undefined. Please check your .env file."
        );
    }

    const client = new Client(dbConfig);

    try {
        await client.connect();
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error executing query:", error);
        throw error;
    } finally {
        await client.end();
    }
}

export async function getPatients(): Promise<Patient[]> {
    const query = `
    SELECT
        pr.id as id,
        full_name,
        birth_date,
        s.title as social_status,
        admission_date,
        discharge_date
    FROM public.patient_record pr 
    LEFT JOIN public.patient p
    ON pr.patient_id = p.id
    LEFT JOIN public.social_status s
    ON p.social_status_id = s.id
    WHERE pr.doctor_id = 1;`;

    return runQuery(query);
}

export async function getPatient(id: number): Promise<Patient> {
    const query = `
    SELECT
        pr.id as id,
        full_name,
        birth_date,
        s.title as social_status,
        admission_date,
        discharge_date
    FROM public.patient_record pr 
    LEFT JOIN public.patient p
    ON pr.patient_id = p.id
    LEFT JOIN public.social_status s
    ON p.social_status_id = s.id
    WHERE pr.id = ${id};`;

    const queryResult = (await runQuery(query)) as Patient[];
    return queryResult[0];
}

export async function getDiseasesOfPatient(id: number): Promise<Disease[]> {
    const query = `
    SELECT
        d.id,
        d.title
    FROM public.clinical_record cr
    LEFT JOIN public.patient_record pr
    ON cr.patient_record_id = pr.id
    LEFT JOIN public.disease d
    ON cr.disease_id = d.id
    WHERE pr.id = ${id};`;

    return runQuery(query);
}

export async function getTreatmentsOfPatient(id: number): Promise<Treatment[]> {
    const query = `
    SELECT
        tr.id,
        t.title,
        t.cost,
        tr.start_date,
        tr.end_date,
        TO_CHAR(tr.repeat_interval, 'DD" дней" HH24" часов"') as repeat_interval,
        d.title as disease
    FROM public.treatment_record tr
    LEFT JOIN public.clinical_record cr
    ON tr.clinical_record_id = cr.id
    LEFT JOIN public.patient_record pr
    ON cr.patient_record_id = pr.id
    LEFT JOIN public.disease d
    ON cr.disease_id = d.id
    LEFT JOIN public.treatment t
    ON tr.treatment_id = t.id
    WHERE pr.id = ${id};`;

    return runQuery(query);
}
