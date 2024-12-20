CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.doctors;
DROP TABLE IF EXISTS public.patients;
DROP TABLE IF EXISTS public.schedules;
DROP TABLE IF EXISTS public.appointments;
DROP TABLE IF EXISTS public.staffs;


-- STAFFS TABLE
CREATE TABLE public.staffs (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- DOCTORS TABLE
CREATE TABLE public.doctors (
  uuid UUID PRIMARY KEY REFERENCES public.staffs(uuid),
  doctor_name TEXT NOT NULL,
  speciality TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone_number TEXT DEFAULT NULL,
  joined_at TIMESTAMP default current_timestamp NOT NULL
);

-- PATIENT TABLE 
CREATE TABLE public.patients (
    uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    patient_name TEXT NOT NULL,
    patient_email TEXT UNIQUE NOT NULL,
    patient_phone TEXT NOT NULL
);

-- SCHEDULE TABLE
CREATE TABLE public.schedules (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_uuid UUID NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_start TEXT NOT NULL,
  appointment_end TEXT NOT NULL,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,

  CONSTRAINT fk_doctor FOREIGN KEY (doctor_uuid) REFERENCES public.doctors (uuid) ON DELETE CASCADE
);

-- APPOINTMENTS TABLE
CREATE TABLE public.appointments (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  patient_uuid UUID NOT NULL,
  schedule_uuid UUID NOT NULL,

  CONSTRAINT fk_patient FOREIGN KEY (patient_uuid) REFERENCES public.patients (uuid) ON DELETE CASCADE,

  CONSTRAINT fk_schedule FOREIGN KEY (schedule_uuid) REFERENCES public.schedules (uuid) ON DELETE CASCADE
);

CREATE TABLE public.descriptions (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  diagnosis TEXT NOT NULL,
  notes TEXT
);

CREATE TABLE public.medications (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  appointment_uuid UUID NOT NULL,
  medicine TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  description_uuid UUID NOT NULL,

  CONSTRAINT fk_appointment FOREIGN KEY (appointment_uuid) REFERENCES public.appointments (uuid) ON DELETE CASCADE,
  CONSTRAINT fk_description FOREIGN KEY (description_uuid) REFERENCES public.descriptions (uuid) ON DELETE CASCADE
);


-- CREATE AUDIT LOG TABLE TO TRACK CHANGES
CREATE TABLE public.audit_log (
    id SERIAL PRIMARY KEY,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    action TEXT,
    table_name TEXT,
    record_uuid UUID,
    old_data JSONB,
    new_data JSONB
);