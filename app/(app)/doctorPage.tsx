import { runFunction } from "@/lib/db";
import { PatientRecord } from "@/lib/types";
import { DataTable } from "@/components/dataTable";
import { patientColumns } from "@/components/columns/patientColumns";

export default async function DoctorPage() {
    const data = await runFunction<PatientRecord>(
        "get_current_patient_records",
        []
    );

    const doctorAndDepartmentInfo = (
        await runFunction<{
            doctor: string;
            department: string;
        }>("get_doctor_and_department_info_by_current_username", [])
    )[0];

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Пациенты</h1>
                <p className="text-xl">{`${doctorAndDepartmentInfo.doctor} (${doctorAndDepartmentInfo.department})`}</p>
            </div>
            <div className="flex flex-1 pt-6">
                <DataTable
                    data={data}
                    columnDefs={patientColumns}
                    pageSize={10}
                    rowUrl="/patient-record"
                />
            </div>
        </div>
    );
}
