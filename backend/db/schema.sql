CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.doctors;
DROP TABLE IF EXISTS public.patients;
DROP TABLE IF EXISTS public.schedules;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.appointments;


-- DOCTORS TABLE
CREATE TABLE public.doctors (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_name TEXT NOT NULL,
  speciality TEXT NOT NULL,
  contact_info BIGINT DEFAULT 0,
  joined_at TIMESTAMP default current_timestamp NOT NULL
);

-- PATIENT TABLE 
CREATE TABLE public.patients (
    uuid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    patient_name TEXT(255) NOT NULL,
    patient_email TEXT(255) UNIQUE NOT NULL,
    patient_phone TEXT(15) NOT NULL
);

-- SCHEDULE TABLE
CREATE TABLE public.schedules (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_uuid UUID NOT NULL,
  appoinment_date DATE NOT NULL,
  appointment_time_start TIME NOT NULL,
  appointment_time_end TIME NOT NULL,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,

  CONSTRAINT fk_doctor FOREIGN KEY (doctor_uuid) REFERENCES public.doctors (uuid) ON DELETE CASCADE
);

-- APPOINTMENTS TABLE
CREATE TABLE public.appointments (
  appointment_uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_uuid UUID NOT NULL,
  schedule_uuid UUID NOT NULL,

  CONSTRAINT fk_user FOREIGN KEY (user_uuid) REFERENCES public.users (uuid) ON DELETE CASCADE,

  CONSTRAINT fk_schedule FOREIGN KEY (schedule_uuid) REFERENCES public.schedules (uuid) ON DELETE CASCADE
);