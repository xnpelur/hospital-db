"use client";

import { Button } from "@/components/ui/button";
import {
    DialogTitle,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogContent,
    Dialog,
} from "@/components/ui/dialog";
import {
    CheckIcon,
    Cross2Icon,
    PlusIcon,
    TrashIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RecordDependencies } from "@/lib/types";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    items: RecordDependencies[];
    onSave: (
        itemsToInsert: RecordDependencies[],
        itemsToRemove: RecordDependencies[]
    ) => void;
};

export default function ListEditModal(props: Props) {
    const [items, setItems] = useState(props.items);
    useEffect(() => setItems(props.items), [props.items]);

    const [editing, setEditing] = useState(false);
    const [newItem, setNewItem] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    const [itemsToInsert, setItemsToInsert] = useState<RecordDependencies[]>(
        []
    );
    const [itemsToRemove, setItemsToRemove] = useState<RecordDependencies[]>(
        []
    );

    const router = useRouter();

    useEffect(() => {
        const oldItems = props.items.slice();
        const uniqueOldItems = oldItems.filter(
            (oldItem) => !items.some((item) => item.title === oldItem.title)
        );
        const uniqueNewItems = items.filter(
            (item) => !oldItems.some((oldItem) => oldItem.title === item.title)
        );

        setItemsToInsert(uniqueNewItems);
        setItemsToRemove(uniqueOldItems);
    }, [items, props.items]);

    function cancel() {
        changeOpen(false);
    }

    async function save() {
        props.onSave(itemsToInsert, itemsToRemove);
        props.setOpen(false);
        router.refresh();
    }

    function changeOpen(value: boolean) {
        if (value) {
            props.setOpen(true);
        } else {
            props.setOpen(false);
            resetAll();
        }
    }

    function resetAll() {
        setEditing(false);
        setNewItem("");
        setItems(props.items);
    }

    function startEditing() {
        setEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 1);
    }

    function cancelAdd() {
        setEditing(false);
        setNewItem("");
    }

    function confirmAdd() {
        if (!items.some((item) => item.title === newItem)) {
            setItems([
                ...items,
                {
                    title: newItem,
                    dependencies_count: 0,
                },
            ]);
        }
        setEditing(false);
        setNewItem("");
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Escape") {
            cancelAdd();
            event.stopPropagation();
        } else if (event.key === "Enter") {
            confirmAdd();
        }
    }

    function removeItem(index: number) {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    }

    return (
        <Dialog open={props.open} onOpenChange={changeOpen}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Список болезней</DialogTitle>
                    <DialogDescription>
                        Изменение списка заболеваний выбранного пациента
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid max-h-96 gap-4 overflow-y-auto">
                        {items.map((item, index) => (
                            <div
                                className="flex h-16 items-center justify-between rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800"
                                key={index}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-medium">
                                        {item.title}
                                    </span>
                                </div>
                                {item.dependencies_count === 0 ? (
                                    <Button
                                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeItem(index)}
                                    >
                                        <TrashIcon className="h-6 w-6" />
                                        <span className="sr-only">Удалить</span>
                                    </Button>
                                ) : null}
                            </div>
                        ))}
                    </div>
                    {editing ? (
                        <div className="flex items-center justify-between gap-1 rounded-md bg-gray-100 px-4 py-3 dark:bg-gray-800">
                            <div className="flex flex-1 items-center gap-3">
                                <input
                                    ref={inputRef}
                                    className="w-full bg-inherit font-medium outline-none"
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
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
                    <Button onClick={save}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
