import uuid

from config import db
from models.patient import Patient
from models.prescription import Prescription
from models.medicine import Medicine
from models.medical_prescription import MedicalPrescription

class PatientService:
    @staticmethod
    def get_all_patients():
        return Patient.query.all()

    @staticmethod
    def get_patient_by_id(patient_id):
        # Check UUID
        try:
            patient_uuid = uuid.UUID(patient_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid UUID'  # Error message if the UUID is in the wrong or invalid format

        patient = Patient.query.filter_by(id=patient_uuid).first()
        if not patient:
            return None, 'Patient not found'  # Error message if patient not found

        return patient, None  # # Return patient and none (NO ERROR)
    
    @staticmethod
    def get_patient_by_fiscal_code(fiscal_code):

        patient = Patient.query.filter_by(fiscal_code=fiscal_code).first()
        if not patient:
            return None, 'Patient not found'  # Error message if patient not found

        return patient, None  # # Return patient and none (NO ERROR)

    @staticmethod
    def delete_patient_by_id(patient_id):
        # Check UUID
        try:
            patient_uuid = uuid.UUID(patient_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid uuid'

        # Find the patient with that specific UUID
        patient = Patient.query.filter_by(id=patient_uuid).first()
        
        if not patient:
            return False, 'Patient not found'

        # Find all the patient's prescriptions 
        patient_prescriptions = Prescription.query.filter_by(id_patient=patient.id).all()

        # Delete records related to the medical_prescription table
        for prescription in patient_prescriptions:
            MedicalPrescription.query.filter_by(id_prescription=prescription.id).delete()

        # Delete patient's prescriptions
        Prescription.query.filter_by(id_patient=patient.id).delete()

        try:
            db.session.delete(patient)
            db.session.commit()
            return True, 'Patient deleted'
        except ValueError:
            db.session.rollback()
            return False, 'Delete patient failed'

    @staticmethod
    def create_patient(name, surname, dt_birth, fiscal_code, phone):
        try:
            if len(fiscal_code)==16 and len(phone)==10 and name and surname:
                new_patient = Patient(name=name, surname=surname, dt_birth=dt_birth, fiscal_code=fiscal_code, phone=phone)
                db.session.add(new_patient)
                db.session.commit()
                return new_patient, 'Patient created'  # Return new patient and none (NO ERROR)
            elif len(fiscal_code)!=16:
                return False, 'Insert a valid fiscal code'
            elif len(phone)!=10:
                return False, 'Insert a valid phone number'
            elif not name or not surname:
                return False, 'Make sure that all fields are filled in'
        except ValueError:
            db.session.rollback()
            return False, 'Create patient failed'

    @staticmethod
    def update_patient_by_id(patient_id, name, surname, dt_birth, fiscal_code, phone):
        # Check UUID
        try:
            patient_uuid = uuid.UUID(patient_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid uuid'

        patient = Patient.query.get(patient_uuid)
        if not patient:
            return False, 'Patient not found'

        try:
            if len(fiscal_code)==16 and len(phone)==10:
                if name:
                    patient.name = name
                if surname:
                    patient.surname = surname
                if dt_birth:
                    patient.dt_birth = dt_birth
                if fiscal_code:
                    patient.fiscal_code = fiscal_code
                if phone:
                    patient.phone = phone
                db.session.commit()
                return patient, 'Patient updated'
            elif len(fiscal_code)!=16:
                return False, 'Insert a valid fiscal code'
            elif len(phone)!=10:
                return False, 'Insert a valid phone number'
        except ValueError:
            db.session.rollback()
            return False, 'Update patient failed'
        
    @staticmethod
    def get_patients_instance():
        patients = Patient.query.all()

        patients_info = []

        for patient in patients:
            patient_info = {
                'id': patient.id,
                'name': patient.name,
                'surname': patient.surname,
                'dt_birth': patient.dt_birth,
                'fiscal_code': patient.fiscal_code,
                'phone': patient.phone,
                'prescriptions': []
            }

            patients_info.append(patient_info)

        return patients_info

    @staticmethod
    def get_prescriptions_instance(id_patient):

        prescriptions_info = []

        prescriptions = Prescription.query.filter_by(id_patient=id_patient).all()

        for prescription in prescriptions:
            medicines = Medicine.query.join(MedicalPrescription).filter_by(id_prescription=prescription.id).all()
            prescription_info = {
                'id': prescription.id,
                'dt': prescription.dt,
                'medicines': [{'id': med.id, 'name': med.name, 'description': med.description} for med in medicines],
                'description': prescription.description
            }

            prescriptions_info.append(prescription_info)
        
        return prescriptions_info
                