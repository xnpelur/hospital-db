SET client_encoding TO 'utf8';

CREATE FUNCTION get_current_patient_records()
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE,
    status TEXT,
    username NAME
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        patient_records_view pr
    WHERE
        pr.admission_date <= CURRENT_DATE
        AND pr.discharge_date >= CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_patient_record_by_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE,
    status TEXT,
    username NAME
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        patient_records_view pr
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_clinical_records_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    disease_title VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        cr.id,
        d.title as disease_title
    FROM
        clinical_record cr
    LEFT JOIN
        patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        disease d ON cr.disease_id = d.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_human_readable_interval(interval_value INTERVAL)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    result TEXT;
BEGIN
    IF interval_value < INTERVAL '24 hour' THEN
        result := format_interval(round(extract(hour from interval_value))::INT, ARRAY['час', 'часа', 'часов']::TEXT[]);
    ELSIF interval_value < INTERVAL '1 month' THEN
        result := format_interval(round(extract(day from interval_value))::INT,  ARRAY['день', 'дня', 'дней']::TEXT[]);
    ELSE
        result := format_interval(round(extract(month from interval_value))::INT, ARRAY['месяц', 'месяца', 'месяцев']::TEXT[]);
    END IF;

    RETURN result;
END;
$$;

CREATE FUNCTION get_treatment_records_by_patient_record_id(
    id_param INT
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255),
    cost positive_integer,
    start_date DATE,
    end_date DATE,
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
        get_human_readable_interval(tr.repeat_interval) as repeat_interval,
        d.title as disease
    FROM
        treatment_record tr
    LEFT JOIN
        clinical_record cr ON tr.clinical_record_id = cr.id
    LEFT JOIN
        patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        disease d ON cr.disease_id = d.id
    LEFT JOIN
        treatment t ON tr.treatment_id = t.id
    WHERE
        pr.id = id_param;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_current_patient_record_by_username (
    patient_username NAME
)
RETURNS TABLE (
    id INT,
    full_name VARCHAR(255),
    birth_date DATE,
    social_status VARCHAR(255),
    admission_date DATE,
    discharge_date DATE,
    status TEXT,
	username NAME
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        *
    FROM
        patient_records_view pr
    WHERE
        pr.username = patient_username AND pr.admission_date <= current_date AND pr.discharge_date >= current_date;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_current_clinical_records_by_username(
    patient_username NAME
)
RETURNS TABLE (
    id INT,
    disease_title VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        cr.id,
        d.title as disease_title
    FROM
        clinical_record cr
    LEFT JOIN
        patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        patient p ON pr.patient_id = p.id
    LEFT JOIN
        disease d ON cr.disease_id = d.id
    WHERE
        p.username = patient_username AND pr.admission_date <= current_date AND pr.discharge_date >= current_date;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_current_treatment_records_by_username(
    patient_username NAME
)
RETURNS TABLE (
    id INT,
    title VARCHAR(255),
    cost positive_integer,
    start_date DATE,
    end_date DATE,
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
        get_human_readable_interval(tr.repeat_interval) as repeat_interval,
        d.title as disease
    FROM
        treatment_record tr
    LEFT JOIN
        clinical_record cr ON tr.clinical_record_id = cr.id
    LEFT JOIN
        patient_record pr ON cr.patient_record_id = pr.id
    LEFT JOIN
        patient p ON pr.patient_id = p.id
    LEFT JOIN
        disease d ON cr.disease_id = d.id
	LEFT JOIN
        treatment t ON tr.treatment_id = t.id
    WHERE
        p.username = patient_username AND pr.admission_date <= current_date AND pr.discharge_date >= current_date;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_clinical_records_with_dependencies(
	pr_id INT
)
RETURNS TABLE (
    title VARCHAR(255),
    dependencies_count INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
		d.title,
        SUM(CASE WHEN tr.id IS NOT NULL THEN 1 ELSE 0 END)::INT as dependencies_count
	FROM clinical_record cr
	LEFT JOIN treatment_record tr ON tr.clinical_record_id = cr.id
	JOIN disease d ON cr.disease_id = d.id
	WHERE cr.patient_record_id = pr_id
	GROUP BY d.title;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_doctor_and_department_info(
    pr_id INT
)
RETURNS TABLE (
    doctor VARCHAR(255),
    department VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        doc.full_name as doctor,
        d.title as department
    FROM patient_record pr
    JOIN doctor doc ON pr.doctor_id = doc.id
    JOIN department d ON doc.department_id = d.id
    WHERE pr.id = pr_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_doctor_and_department_info_by_current_username()
RETURNS TABLE (
    doctor VARCHAR(255),
    department VARCHAR(255)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        doc.full_name as doctor,
        d.title as department
    FROM doctor doc
    JOIN department d ON doc.department_id = d.id
    WHERE doc.username = current_user;
END;
$$ LANGUAGE plpgsql;
