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