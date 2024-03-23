"use server";

import { Client } from "pg";
import { Patient } from "./types";

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
