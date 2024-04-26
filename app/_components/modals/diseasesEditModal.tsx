"use client";

import { Button } from "@/components/ui/button";
import {
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import { Disease } from "@/lib/types";
import { Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type Props = {
    diseases: Disease[];
};

export default function DiseasesEditModal(props: Props) {
    const [open, setOpen] = useState(false);

    function cancel() {
        setOpen(false);
    }

    function save() {
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="px-2">
                    <Pencil2Icon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Список болезней</DialogTitle>
                    <DialogDescription>
                        Изменение списка заболеваний выбранного пациента
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid gap-4">
                        {props.diseases.map((disease) => (
                            <div
                                className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800"
                                key={disease.id}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-medium">
                                        {disease.title}
                                    </span>
                                </div>
                                <Button
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <TrashIcon className="h-6 w-6" />
                                    <span className="sr-only">Удалить</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="px-3">
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Добавить
                    </Button>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={cancel}>
                        Отмена
                    </Button>
                    <Button className="ml-auto" onClick={save}>
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
