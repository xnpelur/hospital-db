import { getTableValues, runFunction } from "@/lib/db";
import {
    ClinicalRecord,
    Disease,
    PatientRecord,
    RecordDependencies,
    TreatmentRecord,
} from "@/lib/types";
import { notFound } from "next/navigation";
import ClincicalRecordsEditModal from "./_components/clinicalRecordsEditModal";
import TreatmentRecordsPanel from "./_components/treatmentRecordsPanel";
import DeletePatientRecordButton from "./_components/deletePatientRecordButton";

export default async function PatientRecordPage({
    params,
}: {
    params: { stringId: string };
}) {
    const patientRecordId = parseInt(params.stringId);

    const patientRecord = (
        await runFunction<PatientRecord>("get_patient_record_by_id", [
            patientRecordId,
        ])
    )[0];

    if (!patientRecord) {
        notFound();
    }

    const clinicalRecords = await runFunction<ClinicalRecord>(
        "get_clinical_records_by_patient_record_id",
        [patientRecordId]
    );
    const treatmentRecords = await runFunction<TreatmentRecord>(
        "get_treatment_records_by_patient_record_id",
        [patientRecordId]
    );
    const clinicalRecordsDependencies = await runFunction<RecordDependencies>(
        "get_clinical_records_with_dependencies",
        [patientRecordId]
    );
    const diseases = await getTableValues<Disease>("disease");

    return (
        <div className="flex h-full flex-col space-y-6">
            <div className="flex justify-between">
                <h1 className="mx-1 text-4xl font-semibold">
                    {patientRecord.full_name}
                </h1>
                {clinicalRecords.length === 0 && (
                    <DeletePatientRecordButton
                        patientRecordId={patientRecordId}
                    />
                )}
            </div>
            <div className="grid flex-1 grid-cols-2 text-lg">
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата рождения:</span>{" "}
                        {patientRecord.birth_date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">
                            Социальный статус:
                        </span>{" "}
                        {patientRecord.social_status}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата поступления:</span>{" "}
                        {patientRecord.admission_date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата выписки:</span>{" "}
                        {patientRecord.discharge_date.toLocaleDateString()}
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
                        <ClincicalRecordsEditModal
                            clinicalRecordsDependencies={
                                clinicalRecordsDependencies
                            }
                            diseases={diseases}
                            patientRecordId={patientRecordId}
                        />
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
                editable={true}
            />
        </div>
    );
}
