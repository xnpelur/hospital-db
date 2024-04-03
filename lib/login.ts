import { cookies } from "next/headers";
import { User, encrypt } from "./auth";
import { getUserRole } from "./db";

export async function login(formData: FormData) {
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
        return;
    }

    const role = await getUserRole(username, password);
    if (!role) {
        return;
    }

    const user: User = { username: username, role: role, password: password };

    const expirationTime = parseInt(process.env.EXPIRATION_TIME!);
    const expires = new Date(Date.now() + expirationTime * 1000);
    const session = await encrypt({ user, expires });

    cookies().set("session", session, { expires, httpOnly: true });
}
