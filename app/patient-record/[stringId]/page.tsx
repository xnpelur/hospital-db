import { Button } from "@/components/ui/button";
import { runFunction } from "@/lib/db";
import { ClinicalRecord, PatientRecord, TreatmentRecord } from "@/lib/types";
import { notFound } from "next/navigation";
import ClincicalRecordsEditModal from "./_components/clinicalRecordsEditModal";
import TreatmentsPanel from "./_components/treatmentsPanel";

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between">
                <h1 className="mx-1 text-4xl font-semibold">
                    {patientRecord.full_name}
                </h1>
                <Button variant="destructive">Выписать досрочно</Button>
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
                            clinicalRecords={clinicalRecords}
                            patientRecordId={patientRecordId}
                        />
                    </div>
                </div>
            </div>
            <TreatmentsPanel
                treatmentRecords={treatmentRecords}
                clinicalRecords={clinicalRecords}
            />
        </div>
    );
}
