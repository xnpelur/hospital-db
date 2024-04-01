SET client_encoding TO 'utf8';

DROP FUNCTION IF EXISTS get_patients_by_doctor(INT);
DROP FUNCTION IF EXISTS get_patient_by_id(INT);
DROP FUNCTION IF EXISTS get_diseases_by_patient_record_id(INT);
DROP FUNCTION IF EXISTS get_treatments_by_patient_record_id(INT);

CREATE FUNCTION get_patients_by_doctor(
    doctor_id_param INT
)
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pr.id,
        p.full_name,
        p.birth_date,
        s.title as social_status,
        pr.admission_date,
        pr.discharge_date
    FROM
        public.patient_record pr
    LEFT JOIN
        public.patient p ON pr.patient_id = p.id
    LEFT JOIN
        public.social_status s ON p.social_status_id = s.id
    WHERE
        pr.doctor_id = doctor_id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_patient_by_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        pr.id,
        p.full_name,
        p.birth_date,
        s.title as social_status,
        pr.admission_date,
        pr.discharge_date
    FROM
        public.patient_record pr
    LEFT JOIN
        public.patient p ON pr.patient_id = p.id
    LEFT JOIN
        public.social_status s ON p.social_status_id = s.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_diseases_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        d.id,
        d.title
    FROM
        public.clinical_record cr
    LEFT JOIN
        public.patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        public.disease d ON cr.disease_id = d.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_treatments_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255),
    cost INT,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    repeat_interval TEXT,
    disease VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        tr.id,
        t.title,
        t.cost,
        tr.start_date,
        tr.end_date,
        TO_CHAR(tr.repeat_interval, 'DD" дней" HH24" часов"') as repeat_interval,
        d.title as disease
    FROM
        public.treatment_record tr
    LEFT JOIN
        public.clinical_record cr ON tr.clinical_record_id = cr.id
    LEFT JOIN
        public.patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        public.disease d ON cr.disease_id = d.id
    LEFT JOIN
        public.treatment t ON tr.treatment_id = t.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;