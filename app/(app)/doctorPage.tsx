import { runFunction } from "@/lib/db";
import { PatientRecord } from "@/lib/types";
import PatientsPanel from "./_components/doctor/patientsPanel";

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
            <PatientsPanel
                data={data}
                columns={[
                    {
                        key: "full_name",
                        title: "ФИО",
                        sortable: true,
                    },
                    {
                        key: "birth_date",
                        title: "Дата рождения",
                        type: "date",
                    },
                    {
                        key: "social_status",
                        title: "Социальный статус",
                        sortable: true,
                    },
                    {
                        key: "discharge_date",
                        title: "Дата выписки",
                        type: "date",
                    },
                    {
                        key: "status",
                        title: "Статус",
                        type: "patient_badge",
                    },
                ]}
            />
        </div>
    );
}
