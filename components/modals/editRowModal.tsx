import {
    DialogTitle,
    DialogHeader,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import CustomForm from "../forms/customForm";
import { SimplifiedColumnDef } from "@/lib/types";

type Props = {
    tableName: string;
    columns: SimplifiedColumnDef[];
    open: boolean;
    setOpen: (value: boolean) => void;
    row: any;
};

export default function EditRowModal(props: Props) {
    const router = useRouter();

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Изменить запись</DialogTitle>
                    <CustomForm
                        onFormSubmit={() => {
                            props.setOpen(false);
                            router.refresh();
                        }}
                        tableName={props.tableName}
                        columns={props.columns}
                        row={props.row}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
