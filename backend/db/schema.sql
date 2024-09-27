CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS public.doctors;
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

-- SCHEDULE TABLE
CREATE TABLE public.schedules (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doctor_uuid UUID NOT NULL,
  appointment_start TIMESTAMP NOT NULL,
  appointment_end TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,

  CONSTRAINT fk_doctor FOREIGN KEY (doctor_uuid) REFERENCES public.doctors (uuid) ON DELETE CASCADE
);

-- USRERS TABLE
CREATE TABLE public.users (
  uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_name TEXT NOT NULL,
  nic TEXT NOT NULL,
  phone_number BIGINT
);

-- APPOINTMENTS TABLE
CREATE TABLE public.appointments (
  appointment_uuid UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_uuid UUID NOT NULL,
  schedule_uuid UUID NOT NULL,

  CONSTRAINT fk_user
    FOREIGN KEY (user_uuid)
    REFERENCES public.users (uuid)
    ON DELETE CASCADE,

  CONSTRAINT fk_schedule
    FOREIGN KEY (schedule_uuid)
    REFERENCES public.schedules (uuid)
    ON DELETE CASCADE
);