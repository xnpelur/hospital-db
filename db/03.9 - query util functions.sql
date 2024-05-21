CREATE FUNCTION get_queries()
RETURNS TABLE (
    id INT,
    function_name VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    columns JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        *
    FROM query;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_query_by_function_name(
    query_function_name VARCHAR(255)
)
RETURNS TABLE (
    id INT,
    function_name VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    columns JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        *
    FROM query
    WHERE query.function_name = query_function_name;
END;
$$ LANGUAGE plpgsql;