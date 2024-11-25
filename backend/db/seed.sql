-- Insert test data into the staffs table
INSERT INTO public.staffs (uuid, email, password) VALUES
('1e4f1d7c-ffb4-4b57-bbd9-a1d11dff6c1a', 'john.smith@gmail.com', 'password123'),
('2c9f51a2-9a3d-4748-a83d-55b73a1e23a8', 'emily.johnson@gmail.com', 'password456'),
('3b2d7f9d-d3d9-47d6-93a5-984fcb2b55d9', 'michael.brown@gmail.com', 'password789'),
('4e4a7b9c-d9f3-437d-b41a-77d6c01a48c1', 'sarah.davis@gmail.com', 'password101'),
('5d1f8a3b-d7e2-4a27-882d-f50b7d8f98e3', 'david.wilson@gmail.com', 'password202'),
('6f2b7e9f-c9f1-4f9e-a2d4-5a9c0b1f84e7', 'jessica.martinez@gmail.com', 'password303'),
('7a3d8f1c-b3d2-423b-852d-1e0f3a2c78f5', 'thomas.anderson@gmail.com', 'password404'),
('8b4e9a7f-fd3a-423d-b8e1-d2b7e9f91c84', 'karen.taylor@gmail.com', 'password505'),
('9c5f1e3a-b7f2-49a1-93e4-5d1f8a2b93e7', 'kevin.white@gmail.com', 'password606'),
('af3d2e7b-c8a1-41d9-92b3-7e9f1a4d5c02', 'angela.harris@gmail.com', 'password707');


-- Insert test data into the doctors table
INSERT INTO public.doctors (uuid, doctor_name, speciality, email, phone_number) VALUES
('1e4f1d7c-ffb4-4b57-bbd9-a1d11dff6c1a', 'Dr. John Smith', 'Cardiologist', 'john.smith@gmail.com', '1234567890'),
('2c9f51a2-9a3d-4748-a83d-55b73a1e23a8', 'Dr. Emily Johnson', 'Neurologist', 'emily.johnson@gmail.com', '2345678901'),
('3b2d7f9d-d3d9-47d6-93a5-984fcb2b55d9', 'Dr. Michael Brown', 'Orthopedic', 'michael.brown@gmail.com', '3456789012'),
('4e4a7b9c-d9f3-437d-b41a-77d6c01a48c1', 'Dr. Sarah Davis', 'Pediatrician', 'sarah.davis@gmail.com', '4567890123'),
('5d1f8a3b-d7e2-4a27-882d-f50b7d8f98e3', 'Dr. David Wilson', 'Dermatologist', 'david.wilson@gmail.com', '5678901234'),
('6f2b7e9f-c9f1-4f9e-a2d4-5a9c0b1f84e7', 'Dr. Jessica Martinez', 'Psychiatrist', 'jessica.martinez@gmail.com', '6789012345'),
('7a3d8f1c-b3d2-423b-852d-1e0f3a2c78f5', 'Dr. Thomas Anderson', 'Gastroenterologist', 'thomas.anderson@gmail.com', '7890123456'),
('8b4e9a7f-fd3a-423d-b8e1-d2b7e9f91c84', 'Dr. Karen Taylor', 'Radiologist', 'karen.taylor@gmail.com', '8901234567'),
('9c5f1e3a-b7f2-49a1-93e4-5d1f8a2b93e7', 'Dr. Kevin White', 'Anesthesiologist', 'kevin.white@gmail.com', '9012345678'),
('af3d2e7b-c8a1-41d9-92b3-7e9f1a4d5c02', 'Dr. Angela Harris', 'Ophthalmologist', 'angela.harris@gmail.com', '1023456789');


-- Insert initial data into patients table
INSERT INTO public.patients (patient_name, patient_email, patient_phone) VALUES
('John Doe', 'johndoe@gmail.com', '1234567890'),
('Jane Smith', 'janedoe@gmail.com', '0987654321');


-- Insert test data into the schedule table
INSERT INTO public.schedules (doctor_uuid, appointment_date, appointment_start, appointment_end)
VALUES 
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. John Smith'), '2024-09-01', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'), '2024-09-01', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Michael Brown'), '2024-09-01', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Sarah Davis'), '2024-09-02', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'), '2024-09-02', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-09-02', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-09-03', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Karen Taylor'), '2024-09-03', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Kevin White'), '2024-09-03', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Angela Harris'), '2024-09-04', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. John Smith'), '2024-09-04', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'), '2024-09-04', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Michael Brown'), '2024-09-05', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Sarah Davis'), '2024-09-05', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'), '2024-09-05', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-09-06', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-09-06', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Karen Taylor'), '2024-09-06', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Kevin White'), '2024-09-07', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Angela Harris'), '2024-09-07', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. John Smith'), '2024-09-07', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Emily Johnson'), '2024-09-08', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Michael Brown'), '2024-09-08', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Sarah Davis'), '2024-09-08', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. David Wilson'), '2024-09-09', '09:00:00', '09:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-09-09', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-10-26', '11:00:00', '11:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Jessica Martinez'), '2024-10-27', '10:00:00', '10:30:00'),
((SELECT uuid FROM public.doctors WHERE doctor_name = 'Dr. Thomas Anderson'), '2024-10-28', '11:00:00', '11:30:00');