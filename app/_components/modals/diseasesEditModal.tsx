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
import {
    CheckIcon,
    Cross2Icon,
    Pencil2Icon,
    PlusIcon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import ConfirmationButton from "./confirmationButton";

type Props = {
    diseases: Disease[];
};

export default function DiseasesEditModal(props: Props) {
    const [diseases, setDiseases] = useState(
        props.diseases.map((disease) => disease.title)
    );

    const [open, setOpen] = useState(false);

    const [editing, setEditing] = useState(false);
    const [newDisease, setNewDisease] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const [elementsToInsert, setElementsToInsert] = useState<string[]>([]);
    const [elementsToRemove, setElementsToRemove] = useState<string[]>([]);

    useEffect(() => {
        const oldDiseases = props.diseases.map((disease) => disease.title);
        const uniqueOldDiseases = oldDiseases.filter(
            (disease) => !diseases.includes(disease)
        );
        const uniqueNewDiseases = diseases.filter(
            (disease) => !oldDiseases.includes(disease)
        );

        setElementsToInsert(uniqueNewDiseases);
        setElementsToRemove(uniqueOldDiseases);

        console.log(uniqueNewDiseases);
        console.log(uniqueOldDiseases);
    }, [diseases, props.diseases]);

    function cancel() {
        changeOpen(false);
    }

    function save() {
        changeOpen(false);
    }

    function changeOpen(value: boolean) {
        if (value) {
            setOpen(true);
        } else {
            setOpen(false);
            resetAll();
        }
    }

    function resetAll() {
        setEditing(false);
        setNewDisease("");
        setDiseases(props.diseases.map((disease) => disease.title));
    }

    function startEditing() {
        setEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 1);
    }

    function cancelAdd() {
        setEditing(false);
        setNewDisease("");
    }

    function confirmAdd() {
        setDiseases([...diseases, newDisease]);
        setEditing(false);
        setNewDisease("");
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Escape") {
            cancelAdd();
            event.stopPropagation();
        } else if (event.key === "Enter") {
            confirmAdd();
        }
    }

    function removeElement(index: number) {
        const newDiseases = [...diseases];
        newDiseases.splice(index, 1);
        setDiseases(newDiseases);
    }

    return (
        <Dialog open={open} onOpenChange={changeOpen}>
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
                        {diseases.map((disease, index) => (
                            <div
                                className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800"
                                key={index}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-medium">
                                        {disease}
                                    </span>
                                </div>
                                <Button
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeElement(index)}
                                >
                                    <TrashIcon className="h-6 w-6" />
                                    <span className="sr-only">Удалить</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                    {editing ? (
                        <div className="flex items-center justify-between gap-1 rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
                            <div className="flex flex-1 items-center gap-3">
                                <input
                                    ref={inputRef}
                                    className="w-full bg-inherit font-medium outline-none"
                                    value={newDisease}
                                    onChange={(e) =>
                                        setNewDisease(e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className="space-x-1">
                                <Button
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    size="icon"
                                    variant="ghost"
                                    onClick={cancelAdd}
                                >
                                    <Cross2Icon className="h-5 w-5" />
                                    <span className="sr-only">Убрать</span>
                                </Button>
                                <Button
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                    size="icon"
                                    variant="ghost"
                                    onClick={confirmAdd}
                                >
                                    <CheckIcon className="h-6 w-6" />
                                    <span className="sr-only">Подтвердить</span>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <Button
                            variant="outline"
                            className="px-3"
                            onClick={startEditing}
                        >
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Добавить
                        </Button>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={cancel}>
                        Отмена
                    </Button>
                    <ConfirmationButton
                        text="Сохранить"
                        variant="destructive"
                        modalTitle="Подтвердите удаление"
                        modalDescription="В результате изменения списка были удалены элементы, которые ранее были в нём. Это значит, что все элементы и связанные с ними данные будут удалены. Продолжить?"
                        onConfirm={save}
                        skipConfirmation={elementsToRemove.length == 0}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
