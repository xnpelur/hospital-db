const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { getGeneratedData } = require("./generator");

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_NAME) {
    throw new Error("Database credentials are not set in .env");
}

async function down() {
    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432"),
        database: "postgres",
        user: "postgres",
        password: "",
    });

    try {
        await client.connect();
        await client.query(
            `UPDATE pg_database SET datallowconn = 'false' WHERE datname = '${process.env.DB_NAME}';SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '${process.env.DB_NAME}' AND pid <> pg_backend_pid();`
        );
        await client.query(`DROP DATABASE IF EXISTS hospital;`);
        await client.query(`CREATE DATABASE hospital;`);

        const oldUsers = await client.query(
            `SELECT a.rolname FROM pg_roles a INNER JOIN pg_auth_members b ON a.oid = b.member INNER JOIN pg_roles c ON b.roleid = c.oid WHERE c.rolname = 'patient' OR c.rolname = 'doctor' OR c.rolname = 'admin';`
        );

        let query = "";
        for (let i = 0; i < oldUsers.rowCount; i++) {
            const username = oldUsers.rows[i].rolname;
            query += `DROP ROLE "${username}";`;
        }
        query += `DROP ROLE IF EXISTS "admin";`;
        query += `DROP ROLE IF EXISTS "patient";`;
        query += `DROP ROLE IF EXISTS "doctor";`;

        await client.query(query);
    } catch (err) {
        return err;
    } finally {
        await client.end();
    }
}

async function up() {
    const initDirPath = __dirname;
    const client = new Client({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432"),
        database: process.env.DB_NAME,
        user: "postgres",
        password: "",
    });

    try {
        await client.connect();

        const initFiles = fs
            .readdirSync(initDirPath)
            .filter((file) => file.endsWith(".sql"));

        for (const file of initFiles) {
            const sql = fs.readFileSync(path.join(initDirPath, file), "utf8");
            await client.query(sql);
        }

        const sql = getGeneratedData(15000);
        await client.query(sql);
    } catch (err) {
        return err;
    } finally {
        await client.end();
    }
}

async function reinitDatabase() {
    const downError = await down();
    if (downError) {
        console.error("Error during database reinitialization:", downError);
        return;
    }
    const upError = await up();
    if (upError) {
        console.error("Error during database reinitialization:", upError);
        return;
    }
    console.log("Database reinitialization completed successfully.");
}

reinitDatabase();
