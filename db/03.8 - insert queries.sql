INSERT INTO query (function_name, title, description, columns) 
VALUES (
    'average_salary', 
    'Средняя зарплата в отделении', 
    'Средняя зарплата врачей в каждом отделении больницы', 
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
