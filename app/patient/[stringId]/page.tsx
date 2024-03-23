import { getPatient } from "@/lib/db";

export default async function PatientPage({
    params,
}: {
    params: { stringId: string };
}) {
    const patient = await getPatient(parseInt(params.stringId));

    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex h-4/5 w-4/5 flex-col rounded-lg bg-white px-6 py-4">
                <h1 className="m-1 mb-5 text-4xl font-semibold">
                    {patient.full_name}
                </h1>
                <div className="space-y-2 text-xl">
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата рождения:</span>{" "}
                        {patient.birth_date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">
                            Социальный статус:
                        </span>{" "}
                        {patient.social_status}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата поступления:</span>{" "}
                        {patient.admission_date.toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Дата выписки:</span>{" "}
                        {patient.discharge_date.toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
