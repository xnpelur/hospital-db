import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
    title: string;
    description: string;
    buttonText: string;
};

export default function AdminPageCard(props: Props) {
    return (
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-50">
                    {props.title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                    {props.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    className="w-full border-slate-900 text-slate-900 hover:bg-slate-100 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-800"
                    size="sm"
                    variant="outline"
                >
                    {props.buttonText}
                </Button>
            </CardContent>
        </Card>
    );
}
