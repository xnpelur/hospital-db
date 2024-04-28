CREATE ROLE patient;
CREATE ROLE doctor;
CREATE ROLE admin;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO patient;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO patient;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO doctor;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO doctor;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO admin;

CREATE USER admin1 WITH PASSWORD 'admin';
GRANT admin TO admin1;
