import {
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "../ui/button";
import DiseasesForm from "../forms/diseases";
import { useRouter } from "next/navigation";
import { SimplifiedColumnDef } from "@/lib/columnDefs";

type Props = {
    title: string;
    columns: SimplifiedColumnDef[];
};

export default function AddRowModal(props: Props) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Добавить
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DiseasesForm
                        columns={props.columns}
                        onFormSubmit={() => {
                            setOpen(false);
                            router.refresh();
                        }}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
