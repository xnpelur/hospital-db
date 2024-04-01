INSERT INTO social_status (title)
VALUES
  ('Предприниматель'),
  ('Служащий'),
  ('Рабочий'),
  ('Пенсионер');

INSERT INTO app_user (username, password_hash, user_role)
VALUES
  ('ivan_ivanov', 'password_hash_1', 'patient'),
  ('anna_petrova', 'password_hash_2', 'patient'),
  ('sergey_sidorov', 'password_hash_3', 'patient'),
  ('maria_kuznetsova', 'password_hash_4', 'patient'),
  ('dmitriy_sokolov', 'password_hash_5', 'patient'),
  ('elena_smirnova', 'password_hash_6', 'doctor'),
  ('alexander_popov', 'password_hash_7', 'doctor'),
  ('olga_lebedeva', 'password_hash_8', 'doctor'),
  ('vladimir_kozlov', 'password_hash_9', 'doctor'),
  ('natalia_novikova', 'password_hash_10', 'admin'),
  ('alexey_alexeev', 'password_hash_11', 'patient'),
  ('victoria_victorova', 'password_hash_12', 'patient'),
  ('andrey_andreev', 'password_hash_13', 'patient'),
  ('ekaterina_ekaterinina', 'password_hash_14', 'patient'),
  ('mikhail_mikhailov', 'password_hash_15', 'patient'),
  ('tatiana_tatianina', 'password_hash_16', 'patient'),
  ('denis_denisov', 'password_hash_17', 'patient'),
  ('olga_olgina', 'password_hash_18', 'patient'),
  ('alexander_alexandrov', 'password_hash_19', 'patient'),
  ('natalia_natalina', 'password_hash_20', 'patient'),
  ('igor_igorev', 'password_hash_21', 'patient'),
  ('elena_elenina', 'password_hash_22', 'patient'),
  ('vasiliy_vasiliev', 'password_hash_23', 'patient'),
  ('yulia_yulina', 'password_hash_24', 'patient'),
  ('petr_petrov', 'password_hash_25', 'patient'),
  ('anastasia_anastasina', 'password_hash_26', 'patient'),
  ('nikolay_nikolaev', 'password_hash_27', 'patient'),
  ('maria_marina', 'password_hash_28', 'patient'),
  ('ivan_ivanov', 'password_hash_29', 'patient'),
  ('ksenia_ksenina', 'password_hash_30', 'patient');

INSERT INTO patient (full_name, birth_date, social_status_id, user_id)
VALUES
  ('Иван Иванов', '1990-05-15', 1, 1),
  ('Анна Петрова', '1985-11-22', 2, 2),
  ('Сергей Сидоров', '1978-03-10', 3, 3),
  ('Мария Кузнецова', '1992-09-29', 1, 4),
  ('Дмитрий Соколов', '1988-07-05', 2, 5),
  ('Алексей Алексеев', '1975-08-12', 2, 11),
  ('Виктория Викторова', '1982-04-20', 1, 12),
  ('Андрей Андреев', '1991-11-05', 3, 13),
  ('Екатерина Екатеринина', '1998-02-28', 1, 14),
  ('Михаил Михайлов', '1980-07-18', 2, 15),
  ('Татьяна Татьянина', '1974-03-08', 4, 16),
  ('Денис Денисов', '1989-09-22', 1, 17),
  ('Ольга Ольгина', '1993-06-14', 2, 18),
  ('Александр Александров', '1985-12-31', 3, 19),
  ('Наталья Натальина', '1977-05-09', 2, 20),
  ('Игорь Игорев', '1970-10-25', 4, 21),
  ('Елена Еленина', '1983-01-03', 1, 22),
  ('Василий Васильев', '1995-07-12', 1, 23),
  ('Юлия Юльина', '1988-11-29', 2, 24),
  ('Петр Петров', '1972-04-16', 3, 25),
  ('Анастасия Анастасьина', '1999-09-06', 1, 26),
  ('Николай Николаев', '1986-06-21', 2, 27),
  ('Мария Марьина', '1992-12-15', 2, 28),
  ('Иван Иванов', '1979-02-09', 4, 29),
  ('Ксения Ксенина', '1996-08-30', 1, 30);

INSERT INTO department (title, beds_number, phone)
VALUES
  ('Кардиология', 50, '555-1234'),
  ('Неврология', 30, '555-5678'),
  ('Педиатрия', 40, '555-9012'),
  ('Онкология', 25, '555-3456'),
  ('Ортопедия', 35, '555-7890');

INSERT INTO doctor (full_name, department_id, enrollment_date, salary, user_id)
VALUES
  ('Елена Смирнова', 1, '2015-06-01', 80000, 6),
  ('Александр Попов', 2, '2018-09-15', 75000, 7),
  ('Ольга Лебедева', 3, '2020-03-01', 90000, 8),
  ('Владимир Козлов', 4, '2017-11-20', 85000, 9);

INSERT INTO disease (title)
VALUES
  ('Грипп'),
  ('Пневмония'),
  ('Диабет'),
  ('Гипертония'),
  ('Астма');

INSERT INTO treatment (title, cost)
VALUES
  ('Антибиотики', 500),
  ('Инсулинотерапия', 1000),
  ('Ингибиторы АПФ', 800),
  ('Бронходилататоры', 600),
  ('Химиотерапия', 5000);

INSERT INTO patient_record (patient_id, doctor_id, admission_date, discharge_date)
VALUES
  (1, 1, '2023-03-01', '2023-03-10'),
  (2, 2, '2023-02-15', '2023-02-22'),
  (3, 3, '2023-01-05', '2023-01-20'),
  (4, 4, '2022-12-10', '2022-12-25'),
  (5, 1, '2023-03-15', '2023-03-25'),
  (6, 1, '2023-04-01', '2023-04-10'),
  (7, 1, '2023-04-05', '2023-04-15'),
  (8, 1, '2023-04-08', '2023-04-20'),
  (9, 1, '2023-04-12', '2023-04-25'),
  (10, 1, '2023-04-15', '2023-04-30'),
  (11, 1, '2023-04-18', '2023-05-05'),
  (12, 2, '2023-04-20', '2023-05-01'),
  (13, 2, '2023-04-22', '2023-05-03'),
  (14, 3, '2023-04-25', '2023-05-05'),
  (15, 3, '2023-04-28', '2023-05-08'),
  (16, 4, '2023-05-01', '2023-05-10'),
  (17, 4, '2023-05-03', '2023-05-12'),
  (18, 1, '2023-05-05', '2023-05-15'),
  (19, 1, '2023-05-08', '2023-05-18'),
  (20, 1, '2023-05-10', '2023-05-20');

INSERT INTO clinical_record (patient_record_id, disease_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);

INSERT INTO treatment_record (treatment_id, clinical_record_id, start_date, end_date, repeat_interval)
VALUES
  (1, 1, '2023-03-01 09:00:00', '2023-03-10 18:00:00', interval '1 day'),
  (2, 3, '2023-01-05 10:00:00', '2023-01-20 16:00:00', interval '1 day'),
  (3, 4, '2022-12-10 11:00:00', '2022-12-25 15:00:00', interval '1 day'),
  (4, 5, '2023-03-15 13:00:00', '2023-03-25 19:00:00', interval '1 day');