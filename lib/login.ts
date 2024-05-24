"use server";

import { cookies } from "next/headers";
import { User, encrypt } from "./auth";
import { getUserRole } from "./db";

export async function login(username: string, password: string) {
    const role = await getUserRole(username, password);
    if (!role) {
        return false;
    }

    const user: User = { username: username, role: role, password: password };

    const expirationTime = parseInt(process.env.EXPIRATION_TIME!);
    const expires = new Date(Date.now() + expirationTime * 1000);
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: true });
    return true;
}
