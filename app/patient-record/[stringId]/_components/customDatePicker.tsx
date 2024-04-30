import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import { ru } from "date-fns/locale";

type Props = {
    name?: string;
};

export default function CustomDatePicker(props: Props) {
    const [date, setDate] = useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "col-span-2 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                        format(date, "PPP", { locale: ru })
                    ) : (
                        <span>Не выбрано</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                    initialFocus
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    locale={ru}
                />
            </PopoverContent>
            <input
                type="text"
                style={{ display: "none" }}
                value={date?.toISOString()}
                onChange={(e) => setDate(new Date(e.target.value))}
                name={props.name}
            />
        </Popover>
    );
}
