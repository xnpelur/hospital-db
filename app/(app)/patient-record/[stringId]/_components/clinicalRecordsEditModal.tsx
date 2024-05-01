"use client";

import ListEditModal from "@/components/modals/listEditModal";
import { runFunction } from "@/lib/db";
import { ClinicalRecord } from "@/lib/types";

type Props = {
    clinicalRecords: ClinicalRecord[];
    patientRecordId: number;
};

export default function ClincicalRecordsEditModal(props: Props) {
    return (
        <ListEditModal
            items={props.clinicalRecords.map((record) => record.disease_title)}
            onSave={async (
                itemsToInsert: string[],
                itemsToRemove: string[]
            ) => {
                await runFunction<null>("update_clinical_records", [
                    props.patientRecordId,
                    itemsToInsert,
                    itemsToRemove,
                ]);
            }}
        />
    );
}
