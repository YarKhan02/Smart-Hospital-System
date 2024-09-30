-- Insert test data into the doctors table
INSERT INTO public.doctors (doctor_name, speciality, contact_info) VALUES
('Dr. John Smith', 'Cardiologist', 1234567890),
('Dr. Emily Johnson', 'Neurologist', 2345678901),
('Dr. Michael Brown', 'Orthopedic', 3456789012),
('Dr. Sarah Davis', 'Pediatrician', 4567890123),
('Dr. David Wilson', 'Dermatologist', 5678901234),
('Dr. Jessica Martinez', 'Psychiatrist', 6789012345),
('Dr. Thomas Anderson', 'Gastroenterologist', 7890123456),
('Dr. Karen Taylor', 'Radiologist', 8901234567),
('Dr. Kevin White', 'Anesthesiologist', 9012345678),
('Dr. Angela Harris', 'Ophthalmologist', 1023456789);

-- Insert initial data into patients table
INSERT INTO public.patients (patient_name, patient_email, patient_phone) VALUES
('John Doe', 'johndoe@gmail.com', '1234567890'),
('Jane Doe', 'janedoe@gmail.com', '0987654321');


-- Insert test data into the schedule table
INSERT INTO public.schedules (doctor_uuid, appointment_start, appointment_end)
VALUES 
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. John Smith'), '2024-09-01 09:00:00', '2024-09-01 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'), '2024-09-01 10:00:00', '2024-09-01 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Michael Brown'), '2024-09-01 11:00:00', '2024-09-01 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Sarah Davis'), '2024-09-02 09:00:00', '2024-09-02 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'), '2024-09-02 10:00:00', '2024-09-02 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-09-02 11:00:00', '2024-09-02 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-09-03 09:00:00', '2024-09-03 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Karen Taylor'), '2024-09-03 10:00:00', '2024-09-03 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Kevin White'), '2024-09-03 11:00:00', '2024-09-03 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Angela Harris'), '2024-09-04 09:00:00', '2024-09-04 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. John Smith'), '2024-09-04 10:00:00', '2024-09-04 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'), '2024-09-04 11:00:00', '2024-09-04 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Michael Brown'), '2024-09-05 09:00:00', '2024-09-05 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Sarah Davis'), '2024-09-05 10:00:00', '2024-09-05 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'), '2024-09-05 11:00:00', '2024-09-05 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-09-06 09:00:00', '2024-09-06 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-09-06 10:00:00', '2024-09-06 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Karen Taylor'), '2024-09-06 11:00:00', '2024-09-06 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Kevin White'), '2024-09-07 09:00:00', '2024-09-07 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Angela Harris'), '2024-09-07 10:00:00', '2024-09-07 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. John Smith'), '2024-09-07 11:00:00', '2024-09-07 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'), '2024-09-08 09:00:00', '2024-09-08 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Michael Brown'), '2024-09-08 10:00:00', '2024-09-08 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Sarah Davis'), '2024-09-08 11:00:00', '2024-09-08 11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'), '2024-09-09 09:00:00', '2024-09-09 09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-09-09 10:00:00', '2024-09-09 10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-09-09 11:00:00', '2024-09-09 11:30:00');


-- Insert test data into the users table
INSERT INTO public.users (user_name, nic, phone_number) VALUES 
('Alice Johnson', 'NIC123456', 5551234567),
('Bob Williams', 'NIC987654', 5559876543),
('Charlie Davis', 'NIC456789', 5554567890);

-- Insert test data into the appointments table
INSERT INTO public.appointments (user_uuid, schedule_uuid) VALUES 
((SELECT uuid FROM public.users WHERE user_name = 'Alice Johnson'), (SELECT uuid FROM public.schedules WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'))),
((SELECT uuid FROM public.users WHERE user_name = 'Bob Williams'), (SELECT uuid FROM public.schedules WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'))),
((SELECT uuid FROM public.users WHERE user_name = 'Bob Williams'), (SELECT uuid FROM public.schedules WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'))),
((SELECT uuid FROM public.users WHERE user_name = 'Charlie Davis'), (SELECT uuid FROM public.schedules WHERE doctor_uuid = (SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Angela Harris')));
