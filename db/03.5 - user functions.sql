CREATE FUNCTION add_user(username TEXT, password TEXT, user_role TEXT) RETURNS VOID AS
$$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = username) THEN
        RAISE EXCEPTION 'User % already exists.', username;
    END IF;

    EXECUTE format('CREATE USER %I WITH PASSWORD %L', username, password);
    EXECUTE format('GRANT %I TO %I', user_role, username);
END;
$$
LANGUAGE plpgsql;