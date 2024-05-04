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
import { ru } from "date-fns/locale";

type Props = {
    value: Date;
    onSelect: (value?: Date) => void;
    disabled?: boolean;
};

export default function CustomDatePicker(props: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !props.value && "text-muted-foreground"
                    )}
                    disabled={props.disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {props.value ? (
                        format(props.value, "PPP", { locale: ru })
                    ) : (
                        <span>Не выбрано</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                    initialFocus
                    mode="single"
                    selected={props.value}
                    onSelect={props.onSelect}
                    locale={ru}
                />
            </PopoverContent>
        </Popover>
    );
}
