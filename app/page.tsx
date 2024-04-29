import { runFunction } from "@/lib/db";
import { Patient } from "@/lib/types";
import { DataTable } from "@/components/dataTable";
import { patientColumns } from "@/components/columns/patientColumns";

export default async function Home() {
    const data = await runFunction<Patient>("get_current_patients", []);

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-4/5 w-4/5 flex-col rounded-lg bg-white px-6 py-4">
                <h1 className="text-3xl font-bold">Пациенты</h1>
                <div className="flex-1 pt-6">
                    <DataTable
                        data={data}
                        columns={patientColumns}
                        pageSize={10}
                        rowUrl="/patient"
                    />
                </div>
            </div>
        </div>
    );
}
