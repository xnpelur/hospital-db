"use client";

import ListEditModal from "@/components/modals/listEditModal";
import { runFunction } from "@/lib/db";
import { RecordDependencies } from "@/lib/types";

type Props = {
    clinicalRecordsDependencies: RecordDependencies[];
    patientRecordId: number;
};

export default function ClincicalRecordsEditModal(props: Props) {
    return (
        <ListEditModal
            items={props.clinicalRecordsDependencies}
            onSave={async (
                itemsToInsert: RecordDependencies[],
                itemsToRemove: RecordDependencies[]
            ) => {
                await runFunction<null>("update_clinical_records", [
                    props.patientRecordId,
                    itemsToInsert.map((value) => value.title),
                    itemsToRemove.map((value) => value.title),
                ]);
            }}
        />
    );
}
