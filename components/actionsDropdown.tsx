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
import { useState } from "react";
import ConfirmationDialog from "./modals/confirmationDialog";
import { useRouter } from "next/navigation";
import { runFunction } from "@/lib/db";

type Props = {
    tableName: string;
    id: number;
    dependencies: number;
};

export default function ActionsDropdown(props: Props) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const router = useRouter();

    async function deleteRecord() {
        await runFunction<null>(`delete_${props.tableName}`, [props.id]);
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
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil1Icon className="mr-2 h-4 w-4" />
                    Изменить
                </DropdownMenuItem>
                {props.dependencies == 0 ? (
                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => setDeleteOpen(true)}
                    >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Удалить
                    </DropdownMenuItem>
                ) : null}
            </DropdownMenuContent>
            {/* <TreatmentsEditModal
                open={editOpen}
                setOpen={setEditOpen}
                treatmentRecord={props.treatmentRecord}
                clinicalRecords={props.clinicalRecords}
            /> */}
            <ConfirmationDialog
                variant="destructive"
                modalTitle="Подтвердите удаление"
                modalDescription="Вы уверены, что хотите безвозвратно удалить эту запись из таблицы?"
                onConfirm={deleteRecord}
                customControls={{ open: deleteOpen, setOpen: setDeleteOpen }}
            />
        </DropdownMenu>
    );
}
