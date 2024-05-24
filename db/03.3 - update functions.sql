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

CREATE FUNCTION update_treatment_record(
    treatment_record_id INT,
    treatment_title VARCHAR(255),
    start_date_value DATE,
    end_date_value DATE,
    repeat_interval_value INTERVAL,
    clinical_record_id_value INT
)
RETURNS VOID AS $$
DECLARE
    treatment_id_value INT;
BEGIN
    SELECT id INTO treatment_id_value FROM treatment WHERE title = treatment_title;

    UPDATE treatment_record
    SET treatment_id = treatment_id_value,
        start_date = start_date_value,
        end_date = end_date_value,
        repeat_interval = repeat_interval_value,
        clinical_record_id = clinical_record_id_value
    WHERE id = treatment_record_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION terminate_treatment_record(
    treatment_record_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE treatment_record
    SET end_date = current_date
    WHERE id = treatment_record_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION update_clinical_records(
    patientRecordId INTEGER,
    diseasesToInsert TEXT[],
    diseasesToRemove TEXT[]
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    diseaseId INTEGER;
    diseaseTitle TEXT;
BEGIN
    FOREACH diseaseTitle IN ARRAY diseasesToInsert
    LOOP
        SELECT id INTO diseaseId
        FROM disease
        WHERE title = diseaseTitle;

        IF diseaseId IS NULL THEN
            RAISE EXCEPTION 'Disease title "%" not found in the disease table', diseaseTitle;
        END IF;

        INSERT INTO clinical_record (patient_record_id, disease_id)
        VALUES (patientRecordId, diseaseId);
    END LOOP;

    FOREACH diseaseTitle IN ARRAY diseasesToRemove
    LOOP
        SELECT id INTO diseaseId
        FROM disease
        WHERE title = diseaseTitle;

        IF diseaseId IS NULL THEN
            RAISE EXCEPTION 'Disease title "%" not found in the disease table', diseaseTitle;
        END IF;

        DELETE FROM clinical_record
        WHERE patient_record_id = patientRecordId
            AND disease_id = diseaseId;
    END LOOP;
END;
$$;

CREATE FUNCTION update_patients_with_dependencies(
    patient_full_name VARCHAR(255),
    patient_birth_date DATE,
    patient_social_status VARCHAR(255),
    patient_username NAME,
    patient_id INT
)
RETURNS VOID AS $$
BEGIN
    UPDATE patients_with_dependencies 
    SET full_name = patient_full_name,
        birth_date = patient_birth_date,
        social_status = patient_social_status,
        username = patient_username
    WHERE id = patient_id;
END;
$$ LANGUAGE plpgsql;