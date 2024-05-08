"use client";

import ListEditModal from "@/components/modals/listEditModal";
import { Button } from "@/components/ui/button";
import { runFunction } from "@/lib/db";
import { RecordDependencies } from "@/lib/types";
import { useState } from "react";

type Props = {
    buttonText: string;
    getFunction: string;
    updateFunction: string;
};

export default function TreatmentsEditModal(props: Props) {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<RecordDependencies[]>([]);

    async function openModal() {
        if (values.length == 0) {
            const data = await runFunction<RecordDependencies>(
                props.getFunction,
                []
            );
            setValues(data);
        }
        setOpen(true);
    }

    return (
        <div>
            <Button
                className="w-full border-slate-900 text-slate-900 hover:bg-slate-100 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-800"
                size="sm"
                variant="outline"
                onClick={openModal}
            >
                {props.buttonText}
            </Button>
            <ListEditModal
                open={open}
                setOpen={(value) => setOpen(value)}
                items={values}
                onSave={async (
                    itemsToInsert: RecordDependencies[],
                    itemsToRemove: RecordDependencies[]
                ) => {
                    await runFunction<null>(props.updateFunction, [
                        itemsToInsert.map((value) => value.title),
                        itemsToRemove.map((value) => value.title),
                    ]);
                }}
            />
        </div>
    );
}
