import {
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
import TreatmentsEditModal from "@/app/patient-record/[stringId]/_components/treatmentsEditModal";
import { useState } from "react";
import { ClinicalRecord, TreatmentRecord } from "@/lib/types";

type Props = {
    treatmentRecord: TreatmentRecord;
    clinicalRecords: ClinicalRecord[];
};

export default function ActionsDropdown(props: Props) {
    const [editOpen, setEditOpen] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Открыть меню</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil1Icon className="mr-2 h-4 w-4" />
                    Изменить
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                    <TrashIcon className="mr-2 h-4 w-4" />
                    Удалить
                </DropdownMenuItem>
            </DropdownMenuContent>
            <TreatmentsEditModal
                open={editOpen}
                setOpen={setEditOpen}
                treatmentRecord={props.treatmentRecord}
                clinicalRecords={props.clinicalRecords}
            />
        </DropdownMenu>
    );
}
