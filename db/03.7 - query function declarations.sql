CREATE FUNCTION average_salary()
RETURNS TABLE (
    department VARCHAR(255),
    avg_salary NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        dep.title as department, 
        ROUND(AVG(d.salary), 2) AS avg_salary
    FROM doctor d
    INNER JOIN department dep ON d.department_id = dep.id
    GROUP BY dep.title;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION patient_records_with_social_status(
    social_status_value VARCHAR(255)
)
RETURNS TABLE (
    full_name VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.full_name,
        pr.admission_date,
        pr.discharge_date
    FROM patient_record pr
    INNER JOIN patient p ON pr.patient_id = p.id
    INNER JOIN social_status s ON p.social_status_id = s.id
    WHERE s.title = social_status_value;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION doctors_at_department(
    department_value VARCHAR(255)
)
RETURNS TABLE (
    full_name VARCHAR(255),
    enrollment_date DATE,
    category VARCHAR(255),
    salary positive_integer
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        doc.full_name,
        doc.enrollment_date,
        doc.category,
        doc.salary
    FROM doctor doc
    INNER JOIN department d ON doc.department_id = d.id
    WHERE d.title = department_value;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION treatment_records_from_date(
    from_date VARCHAR(255)
)
RETURNS TABLE (
    title VARCHAR(255),
    start_date DATE,
    end_date DATE,
    repeat_interval TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.title,
        tr.start_date,
        tr.end_date,
        get_human_readable_interval(tr.repeat_interval) as repeat_interval
    FROM treatment_record tr
    INNER JOIN treatment t ON tr.treatment_id = t.id
    WHERE tr.start_date >= from_date::DATE;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION patient_records_from_date(
    from_date VARCHAR(255)
)
RETURNS TABLE (
    full_name VARCHAR(255),
    admission_date DATE,
    discharge_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.full_name,
        pr.admission_date,
        pr.discharge_date
    FROM patient p
    INNER JOIN patient_record pr ON pr.patient_id = p.id
    WHERE pr.admission_date >= from_date::DATE;
END;
$$ LANGUAGE plpgsql;