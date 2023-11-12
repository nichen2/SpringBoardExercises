-- from the terminal run:
-- psql < medical_center.sql

DROP DATABASE IF EXISTS medical_center;

CREATE DATABASE medical_center;

\c medical_center

CREATE TABLE doctor (
    id SERIAL PRIMARY KEY,
    name TEXT,
    specialty TEXT
);

CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE doctor_patient (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctor,
    patient_id INTEGER REFERENCES patient,
    visit_date DATE
);

CREATE TABLE disease (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE patient_disease (
    id SERIAL PRIMARY KEY,
    disease_id INTEGER REFERENCES disease,
    patient_id INTEGER REFERENCES patient
);

-- Insertions to test DB
INSERT INTO doctor (name, specialty) VALUES ('Dr. Smith', 'Cardiology');
INSERT INTO doctor (name, specialty) VALUES ('Dr. Jones', 'Neurology');
INSERT INTO patient (name) VALUES ('John Doe');
INSERT INTO patient (name) VALUES ('Jane Doe');
INSERT INTO doctor_patient (doctor_id, patient_id, visit_date) VALUES (1, 1, '2023-08-01');
INSERT INTO doctor_patient (doctor_id, patient_id, visit_date) VALUES (2, 1, '2023-08-02');
INSERT INTO doctor_patient (doctor_id, patient_id, visit_date) VALUES (1, 2, '2023-08-03');
INSERT INTO disease (name, description) VALUES ('Diabetes', 'A chronic condition that affects the way the body processes blood sugar.');
INSERT INTO disease (name, description) VALUES ('Hypertension', 'A condition in which the blood pressure in the arteries is persistently elevated.');
INSERT INTO patient_disease (disease_id, patient_id) VALUES (1, 1);
INSERT INTO patient_disease (disease_id, patient_id) VALUES (2, 2);
