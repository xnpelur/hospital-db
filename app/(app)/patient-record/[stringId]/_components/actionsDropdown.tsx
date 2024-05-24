import {
    CrossCircledIcon,
    DotsHorizontalIcon,
    Pencil1Icon,
    TrashIcon,
} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TreatmentsEditModal from "@/app/(app)/patient-record/[stringId]/_components/treatmentsEditModal";
import { useState } from "react";
import { ClinicalRecord, TreatmentRecord } from "@/lib/types";
import { useRouter } from "next/navigation";
import { runFunction } from "@/lib/db";
import { isToday } from "date-fns";
import ConfirmationDialog from "@/components/modals/confirmationDialog";

type Props = {
    treatmentRecord: TreatmentRecord;
    clinicalRecords: ClinicalRecord[];
};

export default function TreatmentRecordActionsDropdown(props: Props) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [terminateOpen, setTerminateOpen] = useState(false);

    const router = useRouter();

    async function terminateRecord() {
        await runFunction<null>("terminate_treatment_record", [
            props.treatmentRecord.id,
        ]);
        setTerminateOpen(false);
        router.refresh();
    }

    async function deleteRecord() {
        await runFunction<null>("delete_treatment_record", [
            props.treatmentRecord.id,
        ]);
        setDeleteOpen(false);
        router.refresh();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Открыть меню</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                {isToday(props.treatmentRecord.start_date) ? (
                    <>
                        <DropdownMenuItem onClick={() => setEditOpen(true)}>
                            <Pencil1Icon className="mr-2 h-4 w-4" />
                            Изменить
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeleteOpen(true)}
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Удалить
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setTerminateOpen(true)}
                        disabled={props.treatmentRecord.end_date < new Date()}
                    >
                        <CrossCircledIcon className="mr-2 h-4 w-4" />
                        Прекратить
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
            <ConfirmationDialog
                variant="destructive"
                modalTitle="Подтвердите прекращение процедуры"
                modalDescription="Вы уверены, что хотите прекратить эту процедуру?"
                onConfirm={terminateRecord}
                customControls={{
                    open: terminateOpen,
                    setOpen: setTerminateOpen,
                }}
            />
            <TreatmentsEditModal
                open={editOpen}
                setOpen={setEditOpen}
                treatmentRecord={props.treatmentRecord}
                clinicalRecords={props.clinicalRecords}
            />
            <ConfirmationDialog
                variant="destructive"
                modalTitle="Подтвердите удаление"
                modalDescription="Вы уверены, что хотите безвозвратно удалить эту запись?"
                onConfirm={deleteRecord}
                customControls={{
                    open: deleteOpen,
                    setOpen: setDeleteOpen,
                }}
            />
        </DropdownMenu>
    );
}
