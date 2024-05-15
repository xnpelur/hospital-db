CREATE FUNCTION format_interval(num INT, unit_words TEXT[])
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
    result TEXT;
    last_digit INT;
BEGIN
    last_digit := num % 10;
    
    IF num = 1 THEN
        result := 'каждый ' || unit_words[1];
    ELSIF last_digit = 1 AND num <> 11 THEN
        result := 'каждый ' || num || ' ' || unit_words[1];
    ELSIF last_digit >= 2 AND last_digit <= 4 AND (num < 12 OR num > 14) THEN
        result := 'каждые ' || num || ' ' || unit_words[2];
    ELSE
        result := 'каждые ' || num || ' ' || unit_words[3];
    END IF;
    
    RETURN result;
END;
$$;
