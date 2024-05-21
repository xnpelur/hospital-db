import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/auth";

export const config = {
    matcher: ["/((?!login|_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
    const session = await getSession();

    if (session === null) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (
        (request.nextUrl.pathname.startsWith("/admin") &&
            session.user.role !== "admin") ||
        (request.nextUrl.pathname.startsWith("/query") &&
            session.user.role !== "head_doctor")
    ) {
        return NextResponse.error();
    }

    return await updateSession(request);
}
