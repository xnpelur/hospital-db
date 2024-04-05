const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { getGeneratedData } = require("./generator");

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_NAME) {
    throw new Error("Database credentials are not set in .env");
}

async function reinitDatabase() {
    const initDirPath = __dirname;

    const firstClient = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432"),
        database: "postgres",
        user: "postgres",
        password: "",
    });

    try {
        await firstClient.connect();
        await firstClient.query(
            `UPDATE pg_database SET datallowconn = 'false' WHERE datname = '${process.env.DB_NAME}'`
        );
        await firstClient.query(
            `SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${process.env.DB_NAME}' AND pid <> pg_backend_pid()`
        );
        await firstClient.query("DROP DATABASE IF EXISTS hospital");
        await firstClient.query("CREATE DATABASE hospital");
    } catch (err) {
        console.error("Error during database reinitialization:", err);
        return;
    } finally {
        await firstClient.end();
    }

    const secondClient = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432"),
        database: process.env.DB_NAME,
        user: "postgres",
        password: "",
    });

    try {
        await secondClient.connect();

        const initFiles = fs
            .readdirSync(initDirPath)
            .filter((file) => file.endsWith(".sql"));

        for (const file of initFiles) {
            const sql = fs.readFileSync(path.join(initDirPath, file), "utf8");
            await secondClient.query(sql);
        }

        const sql = getGeneratedData(100000);
        await secondClient.query(sql);
    } catch (err) {
        console.error("Error during database reinitialization:", err);
        return;
    } finally {
        await secondClient.end();
    }

    console.log("Database reinitialization completed successfully.");
}

reinitDatabase();
