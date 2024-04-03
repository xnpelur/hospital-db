INSERT INTO social_status (title)
VALUES
  ('Предприниматель'),
  ('Служащий'),
  ('Рабочий'),
  ('Пенсионер');

INSERT INTO patient (full_name, birth_date, social_status_id, username)
VALUES
  ('Иван Иванов', '1990-05-15', 1, 'sdflh31'),
  ('Анна Петрова', '1985-11-22', 2, 'sdfjlafsalkfdjksajfd'),
  ('Сергей Сидоров', '1978-03-10', 3, 'dfjsldfisfd'),
  ('Мария Кузнецова', '1992-09-29', 1, '12312udsf'),
  ('Дмитрий Соколов', '1988-07-05', 2, '123jldkjslkda');

INSERT INTO department (title, beds_number, phone)
VALUES
  ('Кардиология', 50, '555-1234'),
  ('Неврология', 30, '555-5678'),
  ('Педиатрия', 40, '555-9012'),
  ('Онкология', 25, '555-3456'),
  ('Ортопедия', 35, '555-7890');

INSERT INTO doctor (full_name, department_id, enrollment_date, salary, username)
VALUES
  ('Елена Смирнова', 1, '2015-06-01', 80000, 'hslkjlkj'),
  ('Александр Попов', 2, '2018-09-15', 75000, 'ijohsfdln1'),
  ('Ольга Лебедева', 3, '2020-03-01', 90000, 'sdjlfkjlkjjljjkkjj'),
  ('Владимир Козлов', 4, '2017-11-20', 85000, 'sui123');

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
  (5, 1, '2023-03-15', '2023-03-25');

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