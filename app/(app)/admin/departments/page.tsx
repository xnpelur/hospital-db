import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Department } from "@/lib/types";

export default async function DepartmentsPage() {
    const departments = await getTableValues<Department>(
        "department_with_dependencies"
    );

    return (
        <TablePanel
            title="Отделения"
            data={departments}
            columns={[
                {
                    key: "title",
                    title: "Название отделения",
                    sortable: true,
                },
                {
                    key: "beds_number",
                    title: "Число коек",
                    type: "number",
                    sortable: true,
                },
                {
                    key: "phone",
                    title: "Телефон",
                    type: "phone",
                },
            ]}
            editable={true}
            pageSize={10}
            tableName="department"
        />
    );
}
