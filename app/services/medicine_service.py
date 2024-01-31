import uuid

from config import db
from models.medicine import Medicine
from models.medical_prescription import MedicalPrescription

class MedicineService:
    @staticmethod
    def get_all_medicines():
        return Medicine.query.all()

    @staticmethod
    def get_medicine_by_id(medicine_id):
        # Check UUID
        try:
            medicine_uuid = uuid.UUID(medicine_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid UUID'  # Error message if the UUID is in the wrong or invalid format

        medicine = Medicine.query.filter_by(id=medicine_uuid).first()
        if not medicine:
            return None, 'Medicine not found'  # Error message if medicine not found

        return medicine, None  # Return medicine e none (NO ERROR)

    @staticmethod
    def delete_medicine_by_id(medicine_id):
        # Check UUID
        try:
            medicine_uuid = uuid.UUID(medicine_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid uuid'

        # Find the medicine with that specific UUID
        medicine = Medicine.query.filter_by(id=medicine_uuid).first()

        if not medicine:
            return False, 'Medicine not found'

        medical_prescriptions = MedicalPrescription.query.filter_by(id_medicine=medicine.id).all()

        # Delete prescriptions related to the medicine 
        for prescription in medical_prescriptions:
            db.session.delete(prescription)

        try:
            db.session.delete(medicine)
            db.session.commit()
            return True, 'Medicine deleted'
        except ValueError:
            db.session.rollback()
            return False, 'Delete medicine failed'

    @staticmethod
    def create_medicine(name, description):
        try:
            if name and description:
                new_medicine = Medicine(name=name, description=description)
                db.session.add(new_medicine)
                db.session.commit()
                return new_medicine, 'Medicine created'  # Return new medicine e none (NO ERROR)
            elif not name or not description:
                return False, 'Make sure that all fields are filled in'
        except ValueError:
            db.session.rollback()
            return False, 'Create medicine failed'

    @staticmethod
    def update_medicine_by_id(medicine_id, name, description):
        # Check UUID
        try:
            medicine_uuid = uuid.UUID(medicine_id)  # Converts the UUID string to a UUID object
        except ValueError:
            return False, 'Invalid uuid'

        medicine = Medicine.query.get(medicine_uuid)
        if not medicine:
            return False, 'Medicine not found'

        try:
            if name and description:
                medicine.name = name
                medicine.description = description
                db.session.commit()
                return medicine, 'Medicine updated'
            else:
                return False, 'Make sure that all fields are filled in'
        except ValueError:
            db.session.rollback()
            return False, 'Update medicine failed'
