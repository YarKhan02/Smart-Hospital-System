-- Create the trigger function for logging changes
CREATE OR REPLACE FUNCTION log_table_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- Log insert actions
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.audit_log (action, table_name, record_uuid, new_data)
        VALUES ('INSERT', TG_TABLE_NAME, NEW.uuid, row_to_json(NEW));
        RETURN NEW;
    END IF;

    -- Log update actions
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO public.audit_log (action, table_name, record_uuid, old_data, new_data)
        VALUES ('UPDATE', TG_TABLE_NAME, NEW.uuid, row_to_json(OLD), row_to_json(NEW));
        RETURN NEW;
    END IF;

    -- Log delete actions
    IF TG_OP = 'DELETE' THEN
        INSERT INTO public.audit_log (action, table_name, record_uuid, old_data)
        VALUES ('DELETE', TG_TABLE_NAME, OLD.uuid, row_to_json(OLD));
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;