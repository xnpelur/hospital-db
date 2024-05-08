import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";
import TreatmentsEditModal from "./treatmentsEditModal";

type Props = {
    title: string;
    description: string;
    buttonText: string;
    getItemsFunction: string;
    updateItemsFunction: string;
};

export default async function AdminPageCard(props: Props) {
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
                <TreatmentsEditModal
                    buttonText={props.buttonText}
                    getFunction={props.getItemsFunction}
                    updateFunction={props.updateItemsFunction}
                />
            </CardContent>
        </Card>
    );
}
