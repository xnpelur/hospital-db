"use client";

import ListEditModal from "@/components/modals/listEditModal";
import { Button } from "@/components/ui/button";
import { runFunction } from "@/lib/db";
import { Disease, RecordDependencies } from "@/lib/types";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

type Props = {
    clinicalRecordsDependencies: RecordDependencies[];
    patientRecordId: number;
    diseases: Disease[];
};

export default function ClincicalRecordsEditModal(props: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button
                variant="outline"
                className="px-2"
                onClick={() => setOpen(true)}
            >
                <Pencil2Icon />
            </Button>
            <ListEditModal
                open={open}
                setOpen={(value) => setOpen(value)}
                items={props.clinicalRecordsDependencies}
                allowedItems={props.diseases.map((disease) => disease.title)}
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
        </div>
    );
}
