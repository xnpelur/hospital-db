import { runFunction } from "@/lib/db";
import { PatientRecord } from "@/lib/types";
import { DataTable } from "@/components/dataTable";
import { patientColumns } from "@/components/columns/patientColumns";

export default async function DoctorsPage() {
    const data = await runFunction<PatientRecord>(
        "get_current_patient_records",
        []
    );

    return (
        <div>
            <h1 className="text-3xl font-bold">Пациенты</h1>
            <div className="flex-1 pt-6">
                <DataTable
                    data={data}
                    columns={patientColumns}
                    pageSize={10}
                    rowUrl="/patient-record"
                />
            </div>
        </div>
    );
}
