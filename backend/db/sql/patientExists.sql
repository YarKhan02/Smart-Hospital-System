SELECT 
    patients.uuid
FROM public.patients WHERE patients.patient_email = $1