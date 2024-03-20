import { getTestData } from "@/lib/db";
import { PatientsTable } from "./_components/patientsTable";

export default async function Home() {
    const data = await getTestData();

    return (
        <div className="flex h-full w-full flex-col">
            <header className="h-20 px-6">
                <div className="flex h-full items-center justify-between">
                    <span className="text-3xl font-bold text-gray-600">
                        Hospital
                    </span>
                    <span className="text-2xl">Иван Иванов</span>
                </div>
            </header>
            <main className="flex flex-1 items-center justify-center bg-slate-200">
                <div className="flex h-4/5 w-4/5 flex-col rounded-lg bg-white px-6 py-4">
                    <h1 className="text-4xl font-semibold">Пациенты</h1>
                    <div className="flex-1 pt-6">
                        <PatientsTable data={data} />
                    </div>
                </div>
            </main>
        </div>
    );
}
