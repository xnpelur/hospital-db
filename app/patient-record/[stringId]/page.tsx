import { Button } from "@/components/ui/button";
import { runFunction } from "@/lib/db";
import { Disease, PatientRecord, TreatmentRecord } from "@/lib/types";
import { notFound } from "next/navigation";
import DiseasesEditModal from "./_components/diseasesEditModal";
import TreatmentsPanel from "./_components/treatmentsPanel";

export default async function PatientPage({
    params,
}: {
    params: { stringId: string };
}) {
    const patientId = parseInt(params.stringId);

    const patientRecord = (
        await runFunction<PatientRecord>("get_patient_record_by_id", [
            patientId,
        ])
    )[0];

    if (!patientRecord) {
        notFound();
    }

    const diseases = await runFunction<Disease>(
        "get_diseases_by_patient_record_id",
        [patientId]
    );
    const treatmentRecords = await runFunction<TreatmentRecord>(
        "get_treatment_records_by_patient_record_id",
        [patientId]
    );

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-4/5 w-4/5 flex-col space-y-6 rounded-lg bg-white px-6 py-4">
                <div className="flex justify-between">
                    <h1 className="mx-1 text-4xl font-semibold">
                        {patientRecord.full_name}
                    </h1>
                    <Button variant="destructive">Выписать досрочно</Button>
                </div>
                <div className="grid flex-1 grid-cols-2 text-lg">
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Дата рождения:
                            </span>{" "}
                            {patientRecord.birth_date.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Социальный статус:
                            </span>{" "}
                            {patientRecord.social_status}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Дата поступления:
                            </span>{" "}
                            {patientRecord.admission_date.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Дата выписки:</span>{" "}
                            {patientRecord.discharge_date.toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-600">
                            Заболевания:
                        </p>
                        <div className="flex items-end space-x-4">
                            {diseases.length > 0 ? (
                                <p className="text-gray-600">
                                    {diseases
                                        .map((disease, index) =>
                                            index == 0
                                                ? disease.title
                                                : disease.title.toLowerCase()
                                        )
                                        .join(", ")}
                                </p>
                            ) : null}
                            <DiseasesEditModal
                                diseases={diseases}
                                patientRecordId={patientId}
                            />
                        </div>
                    </div>
                </div>
                <TreatmentsPanel
                    treatmentRecords={treatmentRecords}
                    diseases={diseases}
                />
            </div>
        </div>
    );
}
