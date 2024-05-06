import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth";
import LogoutButton from "./_components/logoutButton";
import Link from "next/link";

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
                    <header className="bg-gray-900 px-6 py-4 text-white">
                        <div className="flex items-center justify-between">
                            <a href="/" className="flex items-center">
                                <HotelIcon className="mr-2 h-6 w-6" />
                                <h1 className="text-xl font-bold">Стационар</h1>
                            </a>
                            <div className="flex items-center gap-4">
                                {session !== null ? (
                                    <div className="flex items-center space-x-4 pl-4">
                                        <Link
                                            className="font-semibold hover:underline"
                                            href="/"
                                        >
                                            {session.user.username}
                                        </Link>
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

function HotelIcon(props: { className: string }) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
            <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
            <path d="M8 7h.01" />
            <path d="M16 7h.01" />
            <path d="M12 7h.01" />
            <path d="M12 11h.01" />
            <path d="M16 11h.01" />
            <path d="M8 11h.01" />
            <path d="M10 22v-6.5m4 0V22" />
        </svg>
    );
}
