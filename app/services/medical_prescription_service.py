import uuid

# from config import db
# from models.medical_prescription import MedicalPrescription
# from models.prescription import Prescription
# from models.medicine import Medicine


# class MedicalPrescriptionService:
#     @staticmethod
#     def get_all_medical_prescriptions():
#         return MedicalPrescription.query.all()
    
#     @staticmethod
#     def get_medical_prescription_by_id(medical_prescription_id):
#         # Check UUID
#         try:
#             medical_prescription_uuid = uuid.UUID(medical_prescription_id)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid UUID'  # Error message if the UUID is in the wrong or invalid format

#         medical_prescription = MedicalPrescription.query.filter_by(id=medical_prescription_uuid).first()
#         if not medical_prescription:
#             return None, 'Medical Prescription not found'  # Error message if patient not found

#         return medical_prescription, None  # # Return medical prescription and none (NO ERROR)
    
#     @staticmethod
#     def delete_medical_prescription_by_id(medical_prescription_id):
#         # Check UUID
#         try:
#             medical_prescription_uuid = uuid.UUID(medical_prescription_id)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid uuid'

#         # Find the medical prescription with that specific UUID
#         medical_prescription = MedicalPrescription.query.filter_by(id=medical_prescription_uuid).first()

#         if not medical_prescription:
#             return False, 'Medical Prescription not found'

#         try:
#             db.session.delete(medical_prescription)
#             db.session.commit()
#             return True, 'Medical Prescription deleted'
#         except ValueError:
#             db.session.rollback()
#             return False, 'Delete Mmdical prescription failed'
        
#     @staticmethod
#     def create_medical_prescription(id_prescription, id_medicine, qta):
#         # Check UUID
#         try:
#             prescription_uuid = uuid.UUID(id_prescription)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid uuid'

#         prescription = Prescription.query.get(prescription_uuid)
#         if not prescription:
#             return False, 'Prescription not found'
        
#         # Check UUID
#         try:
#             medicine_uuid = uuid.UUID(id_medicine)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid uuid'

#         medicine = Medicine.query.get(medicine_uuid)
#         if not medicine:
#             return False, 'Medicine not found'

#         try:
#             new_medical_prescription = MedicalPrescription(id_prescription=id_prescription, id_medicine=id_medicine, qta=qta)
#             db.session.add(new_medical_prescription)
#             db.session.commit()
#             return new_medical_prescription, 'Medical Prescription created'  # Return new medical prescription and none (NO ERROR)
            
#         except ValueError:
#             db.session.rollback()
#             return False, 'Create prescription failed'

#     @staticmethod
#     def update_medical_prescription_by_id(medical_prescription_id, id_prescription, id_medicine, qta):
#         # Check UUID
#         try:
#             medical_prescription_uuid = uuid.UUID(medical_prescription_id)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid uuid'

#         medical_prescription = MedicalPrescription.query.get(medical_prescription_uuid)
#         if not medical_prescription:
#             return False, 'Medical Prescription not found'
        
#         # Check UUID
#         try:
#             prescription_uuid = uuid.UUID(id_prescription)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid uuid'

#         prescription = Prescription.query.get(prescription_uuid)
#         if not prescription:
#             return False, 'Prescription not found'
        
#         # Check UUID
#         try:
#             medicine_uuid = uuid.UUID(id_medicine)  # Converts the UUID string to a UUID object
#         except ValueError:
#             return False, 'Invalid uuid'

#         medicine = Medicine.query.get(medicine_uuid)
#         if not medicine:
#             return False, 'Medicine not found'

#         try:
#             if qta:
#                 medical_prescription.qta = qta
                
#             db.session.commit()
#             return prescription, 'Medical Prescription updated'
            
#         except ValueError:
#             db.session.rollback()
#             return False, 'Update medical prescription failed'