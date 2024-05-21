import { getTableValues, runFunction } from "@/lib/db";
import { Patient, PatientRecord, SimplifiedColumnDef } from "@/lib/types";
import PatientsPanel from "./_components/doctor/patientsPanel";
import AddRowModal from "@/components/modals/addRowModal";
import { getDateAfterNDays } from "@/lib/dates";

export default async function DoctorPage() {
    const data = await runFunction<PatientRecord>(
        "get_current_patient_records",
        []
    );

    const patients = await getTableValues<Patient>("patient");
    const patientNames = patients.map((patient) => patient.full_name);

    const columns: SimplifiedColumnDef[] = [
        {
            key: "full_name",
            title: "ФИО",
            sortable: true,
            values: patientNames,
        },
        {
            key: "birth_date",
            title: "Дата рождения",
            type: "date",
            hiddenInForm: true,
        },
        {
            key: "social_status",
            title: "Социальный статус",
            sortable: true,
            hiddenInForm: true,
        },
        {
            key: "admission_date",
            title: "Дата поступления",
            type: "date",
            disabled: true,
            default: new Date(),
        },
        {
            key: "discharge_date",
            title: "Дата выписки",
            type: "date",
            disabled: true,
            default: getDateAfterNDays(new Date(), 7),
        },
        {
            key: "status",
            title: "Статус",
            type: "patient_badge",
            sortable: true,
            hiddenInForm: true,
        },
    ];

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
                <AddRowModal tableName="patient_record" columns={columns} />
            </div>
            <PatientsPanel data={data} columns={columns} />
        </div>
    );
}
