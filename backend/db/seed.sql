-- Insert test data into the doctors table
INSERT INTO public.doctors (display_name, speciality, contact_info)
VALUES 
('Dr. John Doe', 'Cardiologist', 1234567890),
('Dr. Jane Smith', 'Dermatologist', 9876543210),
('Dr. Sam Brown', 'Neurologist', 1231231234);

-- Insert test data into the schedule table
INSERT INTO public.schedule (doctor_uuid, appointment_start, appointment_end)
VALUES 
((SELECT uuid FROM public.doctors WHERE display_name = 'Dr. John Doe'), '2024-09-01 09:00:00', '2024-09-01 09:30:00'),
((SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Jane Smith'), '2024-09-01 10:00:00', '2024-09-01 10:30:00'),
((SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Sam Brown'), '2024-09-01 11:00:00', '2024-09-01 11:30:00');

-- Insert test data into the users table
INSERT INTO public.users (user_name, nic, phone_number)
VALUES 
('Alice Johnson', 'NIC123456', 5551234567),
('Bob Williams', 'NIC987654', 5559876543),
('Charlie Davis', 'NIC456789', 5554567890);

-- Insert test data into the appointments table
INSERT INTO public.appointments (user_uuid, schedule_uuid)
VALUES 
((SELECT uuid FROM public.users WHERE user_name = 'Alice Johnson'), (SELECT uuid FROM public.schedule WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE display_name = 'Dr. John Doe'))),
((SELECT uuid FROM public.users WHERE user_name = 'Bob Williams'), (SELECT uuid FROM public.schedule WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Jane Smith'))),
((SELECT uuid FROM public.users WHERE user_name = 'Bob Williams'), (SELECT uuid FROM public.schedule WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Jane Smith'))),
((SELECT uuid FROM public.users WHERE user_name = 'Charlie Davis'), (SELECT uuid FROM public.schedule WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE display_name = 'Dr. Sam Brown')));
