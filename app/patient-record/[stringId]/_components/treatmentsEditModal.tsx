import {
    DialogTitle,
    DialogHeader,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { ClinicalRecord, TreatmentRecord } from "@/lib/types";
import { useRouter } from "next/navigation";
import TreatmentsForm from "./treatmentsForm";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    treatmentRecord: TreatmentRecord;
    clinicalRecords: ClinicalRecord[];
};

export default function TreatmentsEditModal(props: Props) {
    const router = useRouter();

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Изменить процедуру</DialogTitle>
                    <TreatmentsForm
                        onFormSubmit={() => {
                            props.setOpen(false);
                            router.refresh();
                        }}
                        treatmentRecord={props.treatmentRecord}
                        clinicalRecords={props.clinicalRecords}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
