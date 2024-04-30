import { Button } from "@/components/ui/button";
import {
    DialogTrigger,
    DialogTitle,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import CustomCombobox from "./customCombobox";
import CustomDatePicker from "./customDatePicker";
import { Disease, Treatment } from "@/lib/types";
import { useEffect, useState } from "react";
import { runFunction } from "@/lib/db";

type Props = {
    diseases: Disease[];
};

export default function TreatmentsAddModal(props: Props) {
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    async function confirm(formData: FormData) {
        const payload = Object.fromEntries(formData);
        console.log(payload);
    }

    useEffect(() => {
        async function fetchTreatments() {
            const data = await runFunction<Treatment>("get_treatments", []);
            setTreatments(data);
        }
        fetchTreatments();
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-3">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Добавить
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Добавить процедуру</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4" action={confirm}>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-right" htmlFor="title">
                            Процедура
                        </Label>
                        <CustomCombobox
                            items={treatments.map(
                                (treatment) => treatment.title
                            )}
                            name="treatment"
                        />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-right" htmlFor="start-date">
                            Дата начала
                        </Label>
                        <CustomDatePicker name="start-date" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-right" htmlFor="end-date">
                            Дата окончания
                        </Label>
                        <CustomDatePicker name="end-date" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-right" htmlFor="repeat-interval">
                            Интервал повторения
                        </Label>
                        <div className="col-span-2 flex items-center gap-2">
                            <Input
                                className="w-20"
                                defaultValue="1"
                                id="repeat-interval"
                                name="repeat-interval"
                                type="number"
                                min={1}
                            />
                            <CustomCombobox
                                items={["час", "день", "месяц"]}
                                name="repeat-interval-unit"
                                defaultValue="час"
                                allowEmpty={false}
                                hideSearch={true}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className="text-right" htmlFor="disease">
                            Болезнь
                        </Label>
                        <CustomCombobox
                            items={props.diseases.map(
                                (disease) => disease.title
                            )}
                            name="disease"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Подтвердить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
