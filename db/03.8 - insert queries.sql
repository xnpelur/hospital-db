INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_records_with_social_status', 
    'Записи о пациентах с социальным статусом ...', 
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
    'Данные врачей в отделении ...', 
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
    'Процедуры, проводимые после даты ...', 
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
    'Пациенты, поступившие после даты ...', 
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

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'all_patient_records_info', 
    'Данные о лечении пациентов за всё время', 
    'ФИО, дата рождения и социальный статус пациентов с датами поступления и выписки',
    'false',
    '[
        {
            "key": "full_name",
            "title": "ФИО",
            "sortable": true
        },
        {
            "key": "birth_date",
            "title": "Дата рождения",
            "type": "date"
        },
        {
            "key": "social_status",
            "title": "Социальный статус",
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
    'average_length_of_stay_by_department', 
    'Средняя продолжительность лечения в отделении', 
    'Средняя продолжительность лечения пациентов (в днях) в каждом отделении больницы',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "avg_length_of_stay",
            "title": "Средняя продолжительность лечения",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'doctor_count_by_department', 
    'Количество врачей в отделениях', 
    'Количество врачей в каждом отделении больницы',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "doctor_count",
            "title": "Количество врачей",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'stay_count_by_disease', 
    'Количество лечений каждой болезни', 
    'Данные о количестве лечений каждой болезни за всё время',
    'false',
    '[
        {
            "key": "disease",
            "title": "Болезнь",
            "sortable": true
        },
        {
            "key": "records_count",
            "title": "Количество",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patients_with_stay_count_higher_than_average', 
    'Пациенты с количеством лечений выше среднего', 
    'Список пациентов, которые пребывали в больнице больше раз, чем в среднем по больнице',
    'false',
    '[
        {
            "key": "full_name",
            "title": "ФИО пациента",
            "sortable": true
        },
        {
            "key": "stay_count",
            "title": "Количество лечений",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_count_by_department', 
    'Количество больных в каждом отделении больницы за всё время', 
    'Количество пациентов, прошедших лечение в каждом отделении больницы за весь период её существования',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'all_and_current_patient_count_by_department', 
    'Количество всех пациентов и количество текущих пациентов по отделениям', 
    'Отделения и количество их пациентов за всё время, а также количество пациентов, проходящих лечение сейчас',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов за всё время",
            "type": "number",
            "sortable": true
        },
        {
            "key": "current_patient_count",
            "title": "Количество пациентов сейчас",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'current_patient_count_by_department', 
    'Количество больных в каждом отделении больницы сейчас', 
    'Количество пациентов, проходящих лечение в каждом отделении больницы на текущий момент времени',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_count_by_russian_departments', 
    'Количество пациентов в отделениях с российскими номерами', 
    'Отделения, номер телефона которых начинается на +7, и количество пациентов в них',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_count_by_doctors_in_department', 
    'Количество пациентов у докторов, работающих в отделении ...', 
    'Доктора, работающие в заданном отделении, и количество их пациентов за всё время',
    'true',
    '[
        {
            "key": "doctor",
            "title": "ФИО врача",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_count_by_doctors_with_salary_higher_than_average', 
    'Количество пациентов у врачей, с зарплатой выше средней', 
    'Врачи, у которых зарплата выше средней по больнице, и их количество пациентов за всё время',
    'false',
    '[
        {
            "key": "doctor",
            "title": "ФИО врача",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'doctors_with_patient_count_more_than', 
    'Врачи с количеством пациентов более ...', 
    'Список врачей, у которых количество пациентов за все время превышает заданное количество человек',
    'true',
    '[
        {
            "key": "doctor",
            "title": "ФИО врача",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'doctors_with_current_patient_count_more_than', 
    'Врачи с количеством текущих пациентов более ...', 
    'Список врачей, у которых количество пациентов на текущий момент времени превышает заданное количество человек',
    'true',
    '[
        {
            "key": "doctor",
            "title": "ФИО врача",
            "sortable": true
        },
        {
            "key": "patient_count",
            "title": "Количество пациентов",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'departments_with_average_salary_higher_than_average', 
    'Отделения с средней зарплатой выше средней по больнице', 
    'Список отделений, где средняя зарплата врачей выше, чем в среднем по больнице',
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

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_and_doctor_usernames', 
    'Имена пользователей пациентов и докторов', 
    'ФИО и соответствующее им имена пользователей у докторов и пациентов',
    'false',
    '[
        {
            "key": "full_name",
            "title": "ФИО",
            "sortable": true
        },
        {
            "key": "username",
            "title": "Имя пользователя",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'total_cost_of_treatments_from', 
    'Стоимость всех процедур проведенных после ...', 
    'Процедуры и количество денег, потраченное на них пациентами после заданной даты',
    'true',
    '[
        {
            "key": "treatment",
            "title": "Процедура",
            "sortable": true
        },
        {
            "key": "total_cost",
            "title": "Общая стоимость",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patients_without_records', 
    'Пациенты, не лечившиеся в больнице', 
    'Данные пациентов, которые ни разу не лечились в больнице',
    'false',
    '[
        {
            "key": "full_name",
            "title": "ФИО пациента",
            "sortable": true
        },
        {
            "key": "birth_date",
            "title": "Дата рождения",
            "type": "date"
        },
        {
            "key": "social_status",
            "title": "Социальный статус",
            "sortable": true
        },
        {
            "key": "username",
            "title": "Имя пользователя",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'patient_records_full_info', 
    'Полная информация о лечениях пациентов', 
    'ФИО, дата рождения, поступления и выписки, а также социальный статус и статус лечения всех пациентов больницы',
    'false',
    '[
        {
            "key": "full_name",
            "title": "ФИО пациента",
            "sortable": true
        },
        {
            "key": "birth_date",
            "title": "Дата рождения",
            "type": "date"
        },
        {
            "key": "social_status",
            "title": "Социальный статус",
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
        },
        {
            "key": "status",
            "title": "Статус лечения",
            "type": "patient_badge",
            "sortable": true
        }
    ]'::jsonb
);

INSERT INTO query (function_name, title, description, with_parameters, columns) 
VALUES (
    'average_doctor_patient_count_by_department', 
    'Среднее количество пациентов у врачей по отделениям', 
    'Список отделений и среднее количество пациентов у врача этого отделения',
    'false',
    '[
        {
            "key": "department",
            "title": "Отделение",
            "sortable": true
        },
        {
            "key": "avg_patient_count",
            "title": "Среднее количество пациентов у врача отделения",
            "type": "number",
            "sortable": true
        }
    ]'::jsonb
);