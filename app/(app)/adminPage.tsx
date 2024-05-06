import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    return (
        <div className="flex h-full flex-col space-y-8">
            <h1 className="text-3xl font-bold">Панель администратора</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AdminPageCard
                    title="Заболевания"
                    description="Управление списком заболеваний в системе"
                    buttonText="Редактировать список"
                />
                <AdminPageCard
                    title="Процедуры"
                    description="Управление списком процедур в системе"
                    buttonText="Редактировать список"
                />
                <AdminPageCard
                    title="Отделения"
                    description="Управление списком отделений в системе"
                    buttonText="Редактировать список"
                />
                <AdminPageCard
                    title="Социальные статусы"
                    description="Управление списком социальных статусов в системе"
                    buttonText="Редактировать список"
                />
                <AdminPageCard
                    title="Врачи"
                    description="Управление данными врачей в системе"
                    buttonText="Редактировать данные"
                />
                <AdminPageCard
                    title="Пациенты"
                    description="Управление данными пользователей в системе"
                    buttonText="Редактировать данные"
                />
            </div>
        </div>
    );
}

function AdminPageCard({
    title,
    description,
    buttonText,
}: {
    title: string;
    description: string;
    buttonText: string;
}) {
    return (
        <Card className="transition-shadow hover:shadow-lg">
            <CardHeader>
                <CardTitle className="text-slate-900 dark:text-slate-50">
                    {title}
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    className="w-full border-slate-900 text-slate-900 hover:bg-slate-100 dark:border-slate-50 dark:text-slate-50 dark:hover:bg-slate-800"
                    size="sm"
                    variant="outline"
                >
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
}
