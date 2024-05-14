"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

type Props = {
    items: string[];
    value: string;
    setValue: (value: string) => void;
    hideSearch?: boolean;
};

export default function CustomCombobox({
    items,
    value,
    setValue,
    hideSearch = false,
}: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "col-span-2 w-full justify-between dark:text-white",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value
                        ? items.find((item) => item === value)
                        : "Не выбрано"}
                    <CaretSortIcon className="ml-2 hidden h-4 w-4 shrink-0 opacity-50 lg:block" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    {!hideSearch && <CommandInput />}
                    <CommandList>
                        <CommandEmpty>Записи не найдены.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item, index) => (
                                <CommandItem
                                    key={index}
                                    value={item}
                                    onSelect={(currentItem) => {
                                        setValue(currentItem);
                                        setOpen(false);
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === item
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {item}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
