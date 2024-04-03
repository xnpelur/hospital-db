"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.AUTH_SECRET) {
    throw new Error("Auth secret is not set in .env");
}

const key = new TextEncoder().encode(process.env.AUTH_SECRET);
const expirationTimeInSeconds = 2 * 24 * 60 * 60;

type Session = {
    user: User;
};

type User = {
    username: string;
    userRole: string;
};

export async function login() {
    const user: User = { username: "test", userRole: "test_role" };

    const expires = new Date(Date.now() + expirationTimeInSeconds * 1000);
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<Session | null> {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + expirationTimeInSeconds * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}

async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${expirationTimeInSeconds} sec from now`)
        .sign(key);
}

async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}
