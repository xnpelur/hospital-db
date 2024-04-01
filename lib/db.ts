"use server";

import { Client } from "pg";

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

export async function runFunction<T>(
    functionName: string,
    params: any[]
): Promise<T[]> {
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
        const funcCallString = `${functionName}(${params.map((_, i) => `$${i + 1}`).join(",")})`;
        const result = await client.query(
            `SELECT * FROM ${funcCallString}`,
            params
        );

        return result.rows as T[];
    } catch (error) {
        console.error("Error executing function:", error);
        throw error;
    }
}
