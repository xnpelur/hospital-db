import { runFunction } from "@/lib/db";
import { PatientsTable } from "./_components/tables/patients";
import { Patient } from "@/lib/types";

export default async function Home() {
    const data = await runFunction<Patient>("get_current_patients", []);

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-4/5 w-4/5 flex-col rounded-lg bg-white px-6 py-4">
                <h1 className="text-4xl font-semibold">Пациенты</h1>
                <div className="flex-1 pt-6">
                    <PatientsTable data={data} />
                </div>
            </div>
        </div>
    );
}
