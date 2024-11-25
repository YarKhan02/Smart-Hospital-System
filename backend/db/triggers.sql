-- Create Trigger for STAFFS Table
CREATE TRIGGER staff_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.staffs
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();

-- Create Trigger for DOCTORS Table
CREATE TRIGGER doctor_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.doctors
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();

-- Create Trigger for PATIENTS Table
CREATE TRIGGER patient_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.patients
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();

-- Create Trigger for SCHEDULES Table
CREATE TRIGGER schedule_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.schedules
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();

-- Create Trigger for APPOINTMENTS Table
CREATE TRIGGER appointment_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();

-- Create Trigger for DESCRIPTIONS Table
CREATE TRIGGER description_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.descriptions
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();

-- Create Trigger for MEDICATIONS Table
CREATE TRIGGER medication_changes_trigger
AFTER INSERT OR UPDATE OR DELETE
ON public.medications
FOR EACH ROW
EXECUTE FUNCTION log_table_changes();