CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.doctors;
DROP TABLE IF EXISTS public.schedule;

CREATE TABLE public.doctors (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  display_name text NOT NULL,
  speciality text NOT NULL,
  contact_info integer DEFAULT 0,
  joined_at TIMESTAMP default current_timestamp NOT NULL
);

CREATE TABLE public.schedule (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_uuid UUID NOT NULL,
  appointment_start TIMESTAMP NOT NULL,
  appointment_end TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,

  CONSTRAINT fk_doctor
    FOREIGN KEY (doctor_uuid)
    REFERENCES public.doctors (uuid)
    ON DELETE CASCADE
);