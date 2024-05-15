CREATE OR REPLACE FUNCTION delete_doctor(
    doctor_id INT
) RETURNS VOID AS
$$
BEGIN
    DELETE FROM doctor WHERE id = doctor_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_patient(
    patient_id INT
) RETURNS VOID AS
$$
BEGIN
    DELETE FROM patient WHERE id = patient_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_social_status(
    status_id INT
) RETURNS VOID AS
$$
BEGIN
    DELETE FROM social_status WHERE id = status_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_department(
    department_id INT
) RETURNS VOID AS
$$
BEGIN
    DELETE FROM department WHERE id = department_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_treatment(
    treatment_id INT
) RETURNS VOID AS
$$
BEGIN
    DELETE FROM treatment WHERE id = treatment_id;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_disease(
    disease_id INT
) RETURNS VOID AS
$$
BEGIN
    DELETE FROM disease WHERE id = disease_id;
END;
$$
LANGUAGE plpgsql;
