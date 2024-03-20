import { getTestData } from "@/lib/db";
import { PatientsTable } from "./_components/patientsTable";

export default async function Home() {
    const data = await getTestData();

    return (
        <div className="flex flex-col w-full h-full">
            <header className="h-20 px-6">
                <div className="flex justify-between h-full items-center">
                    <span className="text-3xl font-bold text-gray-600">
                        Hospital
                    </span>
                    <span className="text-2xl">Иван Иванов</span>
                </div>
            </header>
            <main className="flex-1 bg-slate-200 flex justify-center items-center">
                <div className="bg-white w-4/5 h-4/5 px-6 py-4 rounded-lg flex flex-col">
                    <h1 className="text-4xl font-semibold">Пациенты</h1>
                    <div className="pt-6 flex-1">
                        <PatientsTable data={data} />
                    </div>
                </div>
            </main>
        </div>
    );
}
