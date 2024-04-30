"use client";

import ListEditModal from "@/components/modals/listEditModal";
import { runFunction } from "@/lib/db";
import { Disease } from "@/lib/types";

type Props = {
    diseases: Disease[];
    patientRecordId: number;
};

export default function DiseasesEditModal(props: Props) {
    return (
        <ListEditModal
            items={props.diseases.map((disease) => disease.title)}
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
