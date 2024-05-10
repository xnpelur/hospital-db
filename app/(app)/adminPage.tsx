import AdminPageCard from "./_components/admin/card";

export default function AdminPage() {
    return (
        <div className="flex h-full flex-col space-y-8">
            <h1 className="text-3xl font-bold">Панель администратора</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AdminPageCard
                    title="Заболевания"
                    description="Управление списком заболеваний в системе"
                    buttonText="Редактировать список"
                    url="/admin/treatments"
                />
                <AdminPageCard
                    title="Процедуры"
                    description="Управление списком процедур в системе"
                    buttonText="Редактировать список"
                    url="/admin/treatments"
                />
                <AdminPageCard
                    title="Отделения"
                    description="Управление списком отделений в системе"
                    buttonText="Редактировать список"
                    url="/admin/treatments"
                />
                <AdminPageCard
                    title="Социальные статусы"
                    description="Управление списком социальных статусов в системе"
                    buttonText="Редактировать список"
                    url="/admin/treatments"
                />
                <AdminPageCard
                    title="Врачи"
                    description="Управление данными врачей в системе"
                    buttonText="Редактировать данные"
                    url="/admin/treatments"
                />
                <AdminPageCard
                    title="Пациенты"
                    description="Управление данными пользователей в системе"
                    buttonText="Редактировать данные"
                    url="/admin/treatments"
                />
            </div>
        </div>
    );
}
