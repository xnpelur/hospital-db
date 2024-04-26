import DiseasesEditModal from "@/app/_components/modals/diseasesEditModal";
import { TreatmentsTable } from "@/app/_components/tables/treatments";
import { Button } from "@/components/ui/button";
import { runFunction } from "@/lib/db";
import { Disease, Patient, Treatment } from "@/lib/types";
import { Pencil2Icon } from "@radix-ui/react-icons";
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
                <div className="flex justify-between">
                    <h1 className="mx-1 text-4xl font-semibold">
                        {patient.full_name}
                    </h1>
                    <Button variant="destructive">Выписать досрочно</Button>
                </div>
                <div className="grid flex-1 grid-cols-2 text-lg">
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
                            <DiseasesEditModal diseases={diseases} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="flex gap-2">
                        <h2 className="mx-1 text-2xl font-semibold">
                            Процедуры
                        </h2>
                        <Button variant="outline" className="px-2">
                            <Pencil2Icon />
                        </Button>
                    </div>
                    <TreatmentsTable data={treatments} />
                </div>
            </div>
        </div>
    );
}
