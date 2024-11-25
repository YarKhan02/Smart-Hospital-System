-- Insert test data into the doctors table
INSERT INTO public.doctors (doctor_name, speciality, email, phone_number) VALUES
('Dr. John Smith', 'Cardiologist', 'john.smith@gmail.com', '1234567890'),
('Dr. Emily Johnson', 'Neurologist', 'emily.johnson@gmail.com', '2345678901'),
('Dr. Michael Brown', 'Orthopedic', 'michael.brown@gmail.com', '3456789012'),
('Dr. Sarah Davis', 'Pediatrician', 'sarah.davis@gmail.com', '4567890123'),
('Dr. David Wilson', 'Dermatologist', 'david.wilson@gmail.com', '5678901234'),
('Dr. Jessica Martinez', 'Psychiatrist', 'jessica.martinez@gmail.com', '6789012345'),
('Dr. Thomas Anderson', 'Gastroenterologist', 'thomas.anderson@gmail.com', '7890123456'),
('Dr. Karen Taylor', 'Radiologist', 'karen.taylor@gmail.com', '8901234567'),
('Dr. Kevin White', 'Anesthesiologist', 'kevin.white@gmail.com', '9012345678'),
('Dr. Angela Harris', 'Ophthalmologist', 'angela.harris@gmail.com', '1023456789');


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