import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Patient } from "@/lib/types";

export default async function PatientsPage() {
    const doctors = await getTableValues<Patient>("patients_with_dependencies");

    return (
        <TablePanel
            title="Пациенты"
            data={doctors}
            columns={[
                {
                    key: "full_name",
                    title: "ФИО пациента",
                    sortable: true,
                },
                {
                    key: "birth_date",
                    title: "Дата рождения",
                    type: "date",
                    sortable: true,
                },
                {
                    key: "social_status",
                    title: "Социальный статус",
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
            tableName="patient"
        />
    );
}
