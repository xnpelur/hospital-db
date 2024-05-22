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
    'doctors_at_department', 
    'Данные врачей в отделении', 
    'ФИО, дата поступления на работу, категория и зарплата каждого врача в отделении',
    'true',
    '[
        {
            "key": "full_name",
            "title": "ФИО",
            "sortable": true
        },
        {
            "key": "enrollment_date",
            "title": "Дата поступления на работу",
            "type": "date"
        },
        {
            "key": "category",
            "title": "Категория",
            "sortable": true
        },
        {
            "key": "salary",
            "title": "Зарплата",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'treatment_records_from_date', 
    'Процедуры, проводимые после даты', 
    'Название, даты начала, окончания и интервал повторения процедур, начиная с заданной даты',
    'true',
    '[
        {
            "key": "title",
            "title": "Название процедуры",
            "sortable": true
        },
        {
            "key": "start_date",
            "title": "Дата начала",
            "type": "date"
        },
        {
            "key": "end_date",
            "title": "Дата окончания",
            "type": "date"
        },
        {
            "key": "repeat_interval",
            "title": "Интервал повторения"
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_records_from_date', 
    'Пациенты, поступившие после даты', 
    'ФИО, дата поступления и выписки пациентов, проходящих лечение с определенной даты',
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
