import { Button } from "@/components/ui/button";

export default function HeadDoctorPage() {
    return (
        <div className="flex h-full flex-col space-y-8">
            <h1 className="text-3xl font-bold">Отчёты</h1>
            <div className="grid gap-6">
                <HeadDoctorPageCard
                    title="Записи о пациентах"
                    description="ФИО, дата поступления и выписки пациентов с заданным социальным статусом"
                />
                <HeadDoctorPageCard
                    title="Данные врачей"
                    description="ФИО, дата поступления на работу, категория и зарплата врачей, работающих в заданном отделении"
                />
                <HeadDoctorPageCard
                    title="Средняя зарплата в отделении"
                    description="Средняя зарплата врачей в каждом отделении больницы"
                />
            </div>
        </div>
    );
}

function HeadDoctorPageCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="text-gray-500">{description}</p>
                </div>
            </div>
            <Button>Открыть отчёт</Button>
        </div>
    );
}
