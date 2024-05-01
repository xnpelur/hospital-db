export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-4/5 w-4/5 flex-col rounded-lg bg-white px-6 py-4 shadow-md">
                {children}
            </div>
        </div>
    );
}
