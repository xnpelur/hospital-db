import {
    DotsHorizontalIcon,
    LockClosedIcon,
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
import { useEffect, useState } from "react";
import ConfirmationDialog from "./modals/confirmationDialog";
import { useRouter } from "next/navigation";
import { runFunction } from "@/lib/db";
import EditRowModal from "./modals/editRowModal";
import { SimplifiedColumnDef } from "@/lib/types";
import ChangePasswordDialog from "./modals/changePasswordDialog";

type Props = {
    tableName: string;
    row: any;
    dependencies: number;
    columns: SimplifiedColumnDef[];
};

export default function ActionsDropdown(props: Props) {
    const [editOpen, setEditOpen] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [usernameInRow, setUsernameInRow] = useState<string | undefined>();

    useEffect(() => {
        setUsernameInRow(props.row["username"]);
    }, [props.row]);

    const router = useRouter();

    async function deleteRecord() {
        await runFunction<null>(`delete_${props.tableName}`, [props.row.id]);
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
            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Pencil1Icon className="mr-2 h-4 w-4" />
                    Изменить
                </DropdownMenuItem>
                {usernameInRow ? (
                    <DropdownMenuItem
                        onClick={() => setChangePasswordOpen(true)}
                    >
                        <LockClosedIcon className="mr-2 h-4 w-4" />
                        Изменить пароль
                    </DropdownMenuItem>
                ) : null}
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
            <EditRowModal
                open={editOpen}
                setOpen={setEditOpen}
                tableName={props.tableName}
                columns={props.columns}
                row={props.row}
            />
            <ChangePasswordDialog
                open={changePasswordOpen}
                setOpen={setChangePasswordOpen}
                username={usernameInRow ?? ""}
            />
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
