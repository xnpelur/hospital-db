"use server";

import { Client, DatabaseError } from "pg";
import { getSession } from "./auth";
import { redirect } from "next/navigation";

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_NAME) {
    throw new Error("Database credentials are not set in .env");
}

export async function runFunction<T>(
    functionName: string,
    params: any[]
): Promise<T[]> {
    const session = await getSession();
    if (session === null) {
        return [];
    }

    try {
        const client = new Client({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT!),
            database: process.env.DB_NAME,
            user: session.user.username,
            password: session.user.password,
        });

        await client.connect();
        const funcCallString = `${functionName}(${params.map((_, i) => `$${i + 1}`).join(",")})`;
        const result = await client.query(
            `SELECT * FROM ${funcCallString}`,
            params
        );

        return result.rows as T[];
    } catch (error) {
        if (error instanceof DatabaseError && error.code == "28P01") {
            redirect("/api/logout");
        }
        console.error("Error executing function:", error);
        throw error;
    }
}

export async function getUserRole(
    username: string,
    password: string
): Promise<string | null> {
    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        database: process.env.DB_NAME,
        user: username,
        password: password,
    });
    try {
        await client.connect();
        const result = await client.query(
            `SELECT c.rolname FROM pg_roles a INNER JOIN pg_auth_members b ON a.oid = b.member INNER JOIN pg_roles c ON b.roleid = c.oid WHERE a.rolname = '${username}'`
        );
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0] as string;
    } catch (error) {
        return null;
    }
}
