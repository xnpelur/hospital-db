CREATE FUNCTION update_doctor(
    doctor_full_name VARCHAR(255),
    doctor_department VARCHAR(255),
    doctor_enrollment_date DATE,
    doctor_category VARCHAR(255),
    doctor_salary INT,
    doctor_username NAME,
    doctor_id INT
)
RETURNS VOID AS $$
DECLARE
    doctor_department_id INT;
BEGIN
    SELECT id INTO doctor_department_id FROM department WHERE title = doctor_department;

    UPDATE doctor 
    SET full_name = doctor_full_name,
        department_id = doctor_department_id,
        enrollment_date = doctor_enrollment_date,
        category = doctor_category,
        salary = doctor_salary,
        username = doctor_username
    WHERE id = doctor_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_disease(
    disease_title VARCHAR(255),
    disease_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE disease 
    SET title = disease_title
    WHERE id = disease_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_treatment(
    treatment_title VARCHAR(255),
    treatment_cost INT,
    treatment_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE treatment 
    SET title = treatment_title,
        cost = treatment_cost
    WHERE id = treatment_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_department(
    department_title VARCHAR(255),
    department_beds_number INT,
    department_phone VARCHAR(255),
    department_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE department 
    SET title = department_title,
        beds_number = department_beds_number,
        phone = department_phone
    WHERE id = department_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_social_status(
    social_status_title VARCHAR(255),
    social_status_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE social_status 
    SET title = social_status_title
    WHERE id = social_status_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_patient(
    patient_full_name VARCHAR(255),
    patient_birth_date DATE,
    patient_social_status VARCHAR(255),
    patient_username NAME,
    patient_id INT
)
RETURNS VOID AS $$
DECLARE
    patient_social_status_id INT;
BEGIN
    SELECT id INTO patient_social_status_id FROM social_status WHERE title = patient_social_status;

    UPDATE patient 
    SET full_name = patient_full_name,
        birth_date = patient_birth_date,
        social_status_id = patient_social_status_id,
        username = patient_username
    WHERE id = patient_id;
END;
$$ LANGUAGE plpgsql;
