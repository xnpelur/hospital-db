"use client";

import ListEditModal from "@/components/modals/listEditModal";
import { Button } from "@/components/ui/button";
import { runFunction } from "@/lib/db";
import { RecordDependencies } from "@/lib/types";
import { useState } from "react";

type Props = {
    buttonText: string;
    treatmentsDependencies: RecordDependencies[];
};

export default function TreatmentsEditModal(props: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Button
                className="w-full border-slate-900 text-slate-900 hover:bg-slate-100 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-800"
                size="sm"
                variant="outline"
                onClick={() => setOpen(true)}
            >
                {props.buttonText}
            </Button>
            <ListEditModal
                open={open}
                setOpen={(value) => setOpen(value)}
                items={props.treatmentsDependencies}
                onSave={async (
                    itemsToInsert: RecordDependencies[],
                    itemsToRemove: RecordDependencies[]
                ) => {
                    await runFunction<null>("update_treatments", [
                        itemsToInsert.map((value) => value.title),
                        itemsToRemove.map((value) => value.title),
                    ]);
                }}
            />
        </div>
    );
}
