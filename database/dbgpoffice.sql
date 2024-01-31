CREATE SCHEMA healthcare_management;
ALTER DATABASE dbgpoffice SET search_path to healthcare_management, public;

CREATE TABLE healthcare_management.patient (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" varchar(50) NULL,
    surname varchar(50) NULL,
    dt_birth date NULL,
    fiscal_code varchar(16) NULL,
    phone varchar(10) NULL,
    CONSTRAINT patient_pkey PRIMARY KEY (id)
);

CREATE TABLE healthcare_management.medicine (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    "name" varchar(100) NULL,
    description text NULL,
    CONSTRAINT medicine_pkey PRIMARY KEY (id)
);

CREATE TABLE healthcare_management.prescription (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    id_patient uuid NOT NULL,
    dt date NULL,
    description text NULL,
    CONSTRAINT prescription_pkey PRIMARY KEY (id),
    CONSTRAINT fk_id_patient FOREIGN KEY (id_patient) REFERENCES
    healthcare_management.patient(id)
);

CREATE TABLE healthcare_management.medical_prescription (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    id_prescription uuid NOT NULL,
    id_medicine uuid NOT NULL,
    qta smallint DEFAULT 1,
    CONSTRAINT medical_prescription_pkey PRIMARY KEY (id),
    CONSTRAINT fk_id_prescription FOREIGN KEY (id_prescription) REFERENCES
    healthcare_management.prescription(id),
    CONSTRAINT fk_id_medicine FOREIGN KEY (id_medicine) REFERENCES
    healthcare_management.medicine(id)
);

INSERT INTO healthcare_management.patient
(id, "name", surname, dt_birth, fiscal_code, phone)
VALUES('f1f6c2ca-1015-4a21-bb48-d00911e8a668'::uuid, 'User1', 'Surname1',
'2000-01-01', 'USER1FISCALCODE1', '1111111111');

INSERT INTO healthcare_management.patient (id, "name", surname, dt_birth, fiscal_code, phone)
VALUES('4747d76c-7cdb-4a7e-9a37-0280fd4cbe60'::uuid, 'User2', 'Surname2',
'1998-03-25', 'USER2FISCALCODE2', '2222222222');

INSERT INTO healthcare_management.medicine (id, "name", description)
VALUES('73e7f326-8763-4645-a1c8-c7be806eb591'::uuid, 'Medicine1',
'Description1');

INSERT INTO healthcare_management.prescription (id, id_patient, dt, description)
VALUES('e4883731-68de-4304-95d0-227bbba57469'::uuid, 'f1f6c2ca-1015-4a21-bb48-d00911e8a668'::uuid, '2023-12-22', 'Prescription1');

INSERT INTO healthcare_management.medical_prescription (id, id_prescription, id_medicine, qta)
VALUES('32c952f9-9bc3-4c02-a575-a5002edb32c4'::uuid, 'e4883731-68de-4304-95d0-227bbba57469'::uuid, '73e7f326-8763-4645-a1c8-c7be806eb591'::uuid, 1);