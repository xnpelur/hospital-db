CREATE OR REPLACE FUNCTION insert_patients_with_dependencies() RETURNS TRIGGER AS $$
DECLARE
    patient_social_status_id INT;
BEGIN
    SELECT id INTO patient_social_status_id FROM social_status WHERE title = NEW.social_status;

    INSERT INTO patient (full_name, birth_date, social_status_id, username)
    VALUES (NEW.full_name, NEW.birth_date, patient_social_status_id, NEW.username);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_patients_with_dependencies_trigger
INSTEAD OF INSERT ON patients_with_dependencies
FOR EACH ROW
EXECUTE FUNCTION insert_patients_with_dependencies();

CREATE OR REPLACE FUNCTION update_patients_with_dependencies() RETURNS TRIGGER AS $$
DECLARE
    patient_social_status_id INT;
BEGIN
    SELECT id INTO patient_social_status_id FROM social_status WHERE title = NEW.social_status;

    UPDATE patient
    SET full_name = NEW.full_name,
        birth_date = NEW.birth_date,
        social_status_id = patient_social_status_id,
        username = NEW.username
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_patients_with_dependencies_trigger
INSTEAD OF UPDATE ON patients_with_dependencies
FOR EACH ROW
EXECUTE FUNCTION update_patients_with_dependencies();

CREATE OR REPLACE FUNCTION delete_patients_with_dependencies() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM patient
    WHERE id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_patients_with_dependencies_trigger
INSTEAD OF DELETE ON patients_with_dependencies
FOR EACH ROW
EXECUTE FUNCTION delete_patients_with_dependencies();
