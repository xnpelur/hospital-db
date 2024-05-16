CREATE FUNCTION insert_disease(
    disease_title VARCHAR(255)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO disease (title) VALUES (disease_title);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_treatment(
    treatment_title VARCHAR(255),
    treatment_cost INT
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO treatment (title, cost) VALUES (treatment_title, treatment_cost);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_department(
    department_title VARCHAR(255),
    department_beds_number INT,
    department_phone VARCHAR(255)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO department (title, beds_number, phone) 
    VALUES (department_title, department_beds_number, department_phone);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_social_status(
    social_status_title VARCHAR(255)
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO social_status (title) VALUES (social_status_title);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_doctor(
    doctor_full_name VARCHAR(255),
    doctor_department VARCHAR(255),
    doctor_enrollment_date DATE,
    doctor_category VARCHAR(255),
    doctor_salary INT,
    doctor_username NAME
)
RETURNS VOID AS $$
DECLARE
    doctor_department_id INT;
BEGIN
    SELECT id INTO doctor_department_id FROM department WHERE title = doctor_department;

    INSERT INTO doctor (full_name, department_id, enrollment_date, category, salary, username) 
    VALUES (doctor_full_name, doctor_department_id, doctor_enrollment_date, doctor_category, doctor_salary, doctor_username);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_patient(
    patient_full_name VARCHAR(255),
    patient_birth_date DATE,
    patient_social_status VARCHAR(255),
    patient_username NAME
)
RETURNS VOID AS $$
DECLARE
    patient_social_status_id INT;
BEGIN
    SELECT id INTO patient_social_status_id FROM social_status WHERE title = patient_social_status;

    INSERT INTO patient (full_name, birth_date, social_status_id, username) 
    VALUES (patient_full_name, patient_birth_date, patient_social_status_id, patient_username);
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION insert_treatment_record(
    treatment_title VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    repeat_interval INTERVAL,
    clinical_record_id INT
)
RETURNS VOID AS $$
DECLARE
    treatment_id_value INT;
BEGIN
    SELECT id INTO treatment_id_value FROM treatment WHERE title = treatment_title;

    INSERT INTO treatment_record (treatment_id, clinical_record_id, start_date, end_date, repeat_interval)
    VALUES (treatment_id_value, clinical_record_id, start_date, end_date, repeat_interval);
END;
$$ LANGUAGE plpgsql;