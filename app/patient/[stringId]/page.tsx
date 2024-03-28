import { TreatmentsTable } from "@/app/_components/tables/treatments";
import {
    getDiseasesOfPatient,
    getPatient,
    getTreatmentsOfPatient,
} from "@/lib/db";

export default async function PatientPage({
    params,
}: {
    params: { stringId: string };
}) {
    const patientId = parseInt(params.stringId);

    const patient = await getPatient(patientId);
    const diseases = await getDiseasesOfPatient(patientId);
    const treatments = await getTreatmentsOfPatient(patientId);

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
