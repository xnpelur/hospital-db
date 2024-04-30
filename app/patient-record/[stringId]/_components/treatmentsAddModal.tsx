import { Button } from "@/components/ui/button";
import {
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { ClinicalRecord } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TreatmentsForm from "./treatmentsForm";

type Props = {
    clinicalRecords: ClinicalRecord[];
};

export default function TreatmentsAddModal(props: Props) {
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
                    <DialogTitle>Добавить процедуру</DialogTitle>
                    <TreatmentsForm
                        clinicalRecords={props.clinicalRecords}
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
