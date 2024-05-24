"use client";

import ConfirmationDialog from "@/components/modals/confirmationDialog";
import { runFunction } from "@/lib/db";
import { useRouter } from "next/navigation";

type Props = {
    patientRecordId: number;
};

export default function DeletePatientRecordButton(props: Props) {
    const router = useRouter();

    return (
        <ConfirmationDialog
            text="Удалить запись"
            modalTitle="Удаление записи о пациенте"
            modalDescription="Вы уверены, что хотите безвозвратно удалить эту запись?"
            onConfirm={async () => {
                await runFunction<null>("delete_patient_record", [
                    props.patientRecordId,
                ]);
                router.push("/");
            }}
            variant="destructive"
        />
    );
}
