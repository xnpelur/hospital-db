drop table if exists treatment_record;
drop table if exists clinical_record;
drop table if exists treatment;
drop table if exists disease;
drop table if exists patient_record;
drop table if exists doctor;
drop table if exists department;
drop table if exists patient;
drop table if exists social_status;
drop table if exists app_user;

create table app_user (
  id serial unique,
  username varchar(255) not null,
  password_hash varchar(255) not null,
  user_role varchar(255) not null
);

create table social_status (
  id serial unique,
  title varchar(255) not null
);

create table patient (
  id serial unique,
  full_name varchar(255) not null,
  birth_date date not null,
  social_status_id integer not null references social_status(id),
  user_id integer not null references app_user(id)
);

create table department (
  id serial unique,
  title varchar(255) not null,
  beds_number integer not null,
  phone varchar(255) not null
);

create table doctor (
  id serial unique,
  full_name varchar(255) not null,
  department_id integer not null references department(id),
  enrollment_date date not null,
  salary integer not null,
  user_id integer not null references app_user(id)
);

create table patient_record (
  id serial unique,
  patient_id integer not null references patient(id),
  doctor_id integer not null references doctor(id),
  admission_date date not null,
  discharge_date date not null
);

create table disease (
  id serial unique,
  title varchar(255) not null
);

create table treatment (
  id serial unique,
  title varchar(255) not null,
  cost integer not null
);

create table clinical_record (
  id serial unique,
  patient_record_id integer not null references patient_record(id),
  disease_id integer not null references disease(id)
);

create table treatment_record (
  id serial unique,
  treatment_id integer not null references treatment(id),
  clinical_record_id integer not null references clinical_record(id),
  start_date timestamp not null,
  end_date timestamp not null,
  repeat_interval interval not null
);
