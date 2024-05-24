import { getSession } from "@/lib/auth";
import { runFunction } from "@/lib/db";
import { ClinicalRecord, PatientRecord, TreatmentRecord } from "@/lib/types";
import TreatmentRecordsPanel from "./patient-record/[stringId]/_components/treatmentRecordsPanel";

export default async function PatientPage() {
    const session = await getSession();
    if (session === null) {
        return null;
    }

    const patientRecord = (
        await runFunction<PatientRecord>(
            "get_current_patient_record_by_username",
            [session.user.username]
        )
    )[0];

    if (!patientRecord) {
        return (
            <div className="flex h-full flex-col">
                <h1 className="text-3xl font-bold">Информация о лечении</h1>
                <div className="flex flex-1 flex-col items-center justify-center text-center text-2xl">
                    <div className="w-4/5">
                        <p className="pb-4">
                            На данный момент информация о Вашем лечении
                            отсутствует.
                        </p>
                        <p>
                            Пожалуйста, проверьте эту страницу позже или
                            свяжитесь с медицинским персоналом для получения
                            дополнительной информации.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const clinicalRecords = await runFunction<ClinicalRecord>(
        "get_current_clinical_records_by_username",
        [session.user.username]
    );
    const treatmentRecords = await runFunction<TreatmentRecord>(
        "get_current_treatment_records_by_username",
        [session.user.username]
    );
    const doctorAndDepartmentInfo = (
        await runFunction<{
            doctor: string;
            department: string;
        }>("get_doctor_and_department_info", [patientRecord.id])
    )[0];

    return (
        <div className="flex h-full flex-col space-y-8">
            <h1 className="text-3xl font-bold">Информация о лечении</h1>
            <div className="grid flex-1 grid-cols-2 text-lg">
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата поступления:</span>{" "}
                        {patientRecord.admission_date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата выписки:</span>{" "}
                        {patientRecord.discharge_date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Лечащий врач:</span>{" "}
                        {`${doctorAndDepartmentInfo.doctor} (${doctorAndDepartmentInfo.department})`}
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">Заболевания:</p>
                    <div className="flex items-end space-x-4">
                        {clinicalRecords.length > 0 ? (
                            <p className="text-gray-600">
                                {clinicalRecords
                                    .map((record, index) =>
                                        index == 0
                                            ? record.disease_title
                                            : record.disease_title.toLowerCase()
                                    )
                                    .join(", ")}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
            <TreatmentRecordsPanel
                treatmentRecords={treatmentRecords}
                columns={[
                    {
                        key: "title",
                        title: "Название процедуры",
                        sortable: true,
                    },
                    {
                        key: "cost",
                        title: "Стоимость",
                        sortable: true,
                    },
                    {
                        key: "start_date",
                        title: "Дата начала",
                        type: "date",
                    },
                    {
                        key: "end_date",
                        title: "Дата окончания",
                        type: "date",
                    },
                    {
                        key: "repeat_interval",
                        title: "Интервал повторения",
                    },
                    {
                        key: "disease",
                        title: "Заболевание",
                        sortable: true,
                        values: clinicalRecords.map((cr) => cr.disease_title),
                    },
                ]}
                clinicalRecords={clinicalRecords}
                editable={false}
            />
        </div>
    );
}
