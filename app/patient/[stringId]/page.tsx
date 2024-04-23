import { TreatmentsTable } from "@/app/_components/tables/treatments";
import { runFunction } from "@/lib/db";
import { Disease, Patient, Treatment } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function PatientPage({
    params,
}: {
    params: { stringId: string };
}) {
    const patientId = parseInt(params.stringId);

    const patient = (
        await runFunction<Patient>("get_patient_by_id", [patientId])
    )[0];

    if (!patient) {
        notFound();
    }

    const diseases = await runFunction<Disease>(
        "get_diseases_by_patient_record_id",
        [patientId]
    );
    const treatments = await runFunction<Treatment>(
        "get_treatments_by_patient_record_id",
        [patientId]
    );

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-4/5 w-4/5 flex-col space-y-6 rounded-lg bg-white px-6 py-4">
                <h1 className="mx-1 text-4xl font-semibold">
                    {patient.full_name}
                </h1>
                <div className="grid grid-cols-2 text-lg">
                    <div className="space-y-2">
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Дата рождения:
                            </span>{" "}
                            {patient.birth_date.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Социальный статус:
                            </span>{" "}
                            {patient.social_status}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">
                                Дата поступления:
                            </span>{" "}
                            {patient.admission_date.toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-semibold">Дата выписки:</span>{" "}
                            {patient.discharge_date.toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-600">
                            Заболевания:
                        </p>
                        <ul className="list-inside list-disc">
                            {diseases.map((disease, index) => (
                                <li key={index} className="text-gray-600">
                                    {disease.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-1 flex-col space-y-5">
                    <h2 className="mx-1 text-2xl font-semibold">Процедуры</h2>
                    <TreatmentsTable data={treatments} />
                </div>
            </div>
        </div>
    );
}
