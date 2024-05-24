import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Patient, SocialStatus } from "@/lib/types";

export default async function PatientsPage() {
    const patients = await getTableValues<Patient>(
        "patients_with_dependencies"
    );
    const socialStatuses = await getTableValues<SocialStatus>("social_status");

    const socialStatusValues = socialStatuses.map((status) => status.title);

    return (
        <TablePanel
            title="Пациенты"
            data={patients}
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
                    values: socialStatusValues,
                },
                {
                    key: "username",
                    title: "Имя пользователя",
                    disabled: true,
                    sortable: true,
                },
            ]}
            editable={true}
            pageSize={10}
            tableName="patients_with_dependencies"
        />
    );
}
