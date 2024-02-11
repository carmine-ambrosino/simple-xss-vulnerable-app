import uuid

from config import db
from models.prescription import Prescription
from models.patient import Patient
from models.medicine import Medicine
from models.medical_prescription import MedicalPrescription

class PrescriptionService:
    @staticmethod
    def get_all_prescriptions():
        return Prescription.query.all()
    
    @staticmethod
    def get_prescription_by_id(prescription_id):
        # Check UUID
        try:
            prescription_uuid = uuid.UUID(prescription_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid UUID'  # Error message if the UUID is in the wrong or invalid format

        prescription = Prescription.query.filter_by(id=prescription_uuid).first()
        if not prescription:
            return None, 'Prescription not found'  # Error message if patient not found

        return prescription, None  # # Return prescription and none (NO ERROR)
    
    @staticmethod
    def delete_prescription_by_id(prescription_id):
        # Check UUID
        try:
            prescription_uuid = uuid.UUID(prescription_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid uuid'

        # Find the prescription with that specific UUID
        prescription = Prescription.query.filter_by(id=prescription_uuid).first()

        if not prescription:
            return False, 'Prescription not found'
        
        MedicalPrescription.query.filter_by(id_prescription=prescription.id).delete()

        try:
            db.session.delete(prescription)
            db.session.commit()
            return True, 'Prescription deleted'
        except ValueError:
            db.session.rollback()
            return False, 'Delete prescription failed'
        
    @staticmethod
    def create_prescription(id_patient, dt, description, medicines_data):
        # Check UUID
        try:
            patient_uuid = uuid.UUID(id_patient)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid uuid'

        patient = Patient.query.get(patient_uuid)
        if not patient:
            return False, 'Patient not found'

        try:
            new_prescription = Prescription(id_patient=id_patient, dt=dt, description=description)

            for med_data in medicines_data:
                medicine = Medicine.query.filter_by(name=med_data['name']).first()
                if not medicine:
                    medicine = Medicine(name=med_data['name'], description=med_data.get('description'))
                    db.session.add(medicine)
                    db.session.flush()  # Per ottenere l'id del farmaco appena creato

                if medicines_data:
                    new_prescription.medicines.append(medicine)

            db.session.add(new_prescription)
            db.session.commit()
            return new_prescription, 'Prescription created'  # Return new prescription and none (NO ERROR)
            
        except ValueError:
            db.session.rollback()
            return False, 'Create prescription failed'

    @staticmethod
    def update_prescription_by_id(prescription_id, id_patient, dt, description, medicines_data):
        try:
            prescription_uuid = uuid.UUID(prescription_id)
        except ValueError:
            return False, 'Invalid uuid'

        prescription = Prescription.query.get(prescription_uuid)
        if not prescription:
            return False, 'Prescription not found'

        try:
            patient_uuid = uuid.UUID(id_patient)
        except ValueError:
            return False, 'Invalid uuid'

        patient = Patient.query.get(patient_uuid)
        if not patient:
            return False, 'Patient not found'

        try:
            if dt:
                prescription.dt = dt
            if description:
                prescription.description = description
            if id_patient:
                prescription.id_patient = id_patient

            # Clear existing medicines associated with the prescription
            existing_medicines = set(prescription.medicines)
            new_medicines = []

            for med_data in medicines_data:
                medicine = Medicine.query.filter_by(name=med_data['name']).first()
                if not medicine:
                    medicine = Medicine(name=med_data['name'], description=med_data.get('description'))

                new_medicines.append(medicine)

            # Remove medicines that are not present in the new data
            for med in existing_medicines:
                if med not in new_medicines:
                    prescription.medicines.remove(med)

            prescription.medicines = new_medicines

            db.session.commit()
            return prescription, 'Prescription updated'

        except Exception as e:
            db.session.rollback()
            return False, f'Update prescription failed: {str(e)}'

