import TablePanel from "@/components/tablePanel";
import { getTableValues } from "@/lib/db";
import { Department } from "@/lib/types";

export default async function DepartmentsPage() {
    const departments = await getTableValues<Department>(
        "departments_with_dependencies"
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
                    sortable: true,
                },
                {
                    key: "phone",
                    title: "Телефон",
                },
            ]}
            editable={true}
            pageSize={10}
        />
    );
}
