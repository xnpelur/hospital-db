const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? "5432"),
    database: process.env.DB_NAME,
};

const hasUndefinedValues = Object.values(dbConfig).some(
    (value) => value === undefined
);
if (hasUndefinedValues) {
    throw new Error(
        "One or more database configuration values are undefined. Please check your .env file."
    );
}

async function reinitDatabase() {
    const initDirPath = __dirname;
    const postgresDbConfig = { ...dbConfig, database: "postgres" };

    const client = new Client(postgresDbConfig);

    try {
        await client.connect();
        await client.query(
            `UPDATE pg_database SET datallowconn = 'false' WHERE datname = '${process.env.DB_NAME}'`
        );
        await client.query(
            `SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${process.env.DB_NAME}' AND pid <> pg_backend_pid()`
        );
        await client.query("DROP DATABASE IF EXISTS hospital");
        await client.query("CREATE DATABASE hospital");
        await client.end();

        const newClient = new Client(dbConfig);
        await newClient.connect();

        const initFiles = fs
            .readdirSync(initDirPath)
            .filter((file) => file.endsWith(".sql"));

        for (const file of initFiles) {
            const sql = fs.readFileSync(path.join(initDirPath, file), "utf8");
            await newClient.query(sql);
        }

        await newClient.end();
        console.log("Database reinitialization completed successfully.");
    } catch (err) {
        console.error("Error during database reinitialization:", err);
    } finally {
        await client.end();
    }
}

reinitDatabase();
