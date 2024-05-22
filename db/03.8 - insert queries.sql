INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_records_with_social_status', 
    'Записи о пациентах с социальным статусом', 
    'ФИО, дата поступления и выписки пациентов с заданным социальным статусом',
    'true',
    '[
        {
            "key": "full_name",
            "title": "ФИО",
            "sortable": true
        },
        {
            "key": "admission_date",
            "title": "Дата поступления",
            "type": "date"
        },
        {
            "key": "discharge_date",
            "title": "Дата выписки",
            "type": "date"
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'average_salary', 
    'Средняя зарплата в отделении', 
    'Средняя зарплата врачей в каждом отделении больницы',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "avg_salary",
            "title": "Средняя зарплата",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);
