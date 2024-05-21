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
