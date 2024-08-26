-- Insert test data into the 'doctors' table
INSERT INTO public.doctors (display_name, speciality, contact_info, joined_at)
VALUES
  ('Dr. Emily Smith', 'Psychiatrist', 1234567890, '2024-01-15 09:00:00'),
  ('Dr. Michael Johnson', 'Dentist', 1987654321, '2023-11-01 10:30:00'),
  ('Dr. Sarah Brown', 'Pediatrician', 1122334455, '2024-02-20 08:45:00');

-- Insert test data into the 'schedule' table
INSERT INTO public.schedule (doctor_uuid, appointment_start, appointment_end, created_at)
VALUES
  ((SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Emily Smith'),
   '2024-08-26 10:00:00', '2024-08-26 11:00:00', '2024-08-01 12:00:00'),
  ((SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Michael Johnson'),
   '2024-08-26 14:00:00', '2024-08-26 15:00:00', '2024-08-01 13:00:00'),
  ((SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Sarah Brown'),
   '2024-08-26 16:00:00', '2024-08-26 17:00:00', '2024-08-01 14:00:00');
