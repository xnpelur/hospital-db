import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth";
import LogoutButton from "./_components/logoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hospital DB",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    return (
        <html>
            <body className={inter.className}>
                <div className="flex h-full w-full flex-col">
                    <header className="h-20 px-6">
                        <div className="flex h-full items-center justify-between">
                            <a href="/">
                                <span className="text-3xl font-bold text-gray-600">
                                    Hospital
                                </span>
                            </a>
                            <div>
                                {session !== null ? (
                                    <div className="space-x-4">
                                        <span className="text-2xl">
                                            {session.user.username}
                                        </span>
                                        <LogoutButton />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </header>
                    <main className="flex-1 bg-slate-200">{children}</main>
                </div>
            </body>
        </html>
    );
}
