import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Doctor } from "@/lib/types";

export default async function DoctorsPage() {
    const doctors = await getTableValues<Doctor>("doctors_with_dependencies");

    return (
        <TablePanel
            title="Врачи"
            data={doctors}
            columns={[
                {
                    key: "full_name",
                    title: "ФИО врача",
                    sortable: true,
                },
                {
                    key: "department",
                    title: "Отделение",
                    sortable: true,
                },
                {
                    key: "enrollment_date",
                    title: "Дата поступления на работу",
                    type: "date",
                    default: new Date(),
                    sortable: true,
                    disabled: true,
                },
                {
                    key: "category",
                    title: "Категория",
                    sortable: true,
                },
                {
                    key: "salary",
                    title: "Зарплата",
                    type: "number",
                    sortable: true,
                },
                {
                    key: "username",
                    title: "Имя пользователя",
                    disabled: true,
                },
            ]}
            editable={true}
            pageSize={10}
            tableName="doctor"
        />
    );
}
