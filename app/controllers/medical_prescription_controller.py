from flask import jsonify, request

# from dtos.medical_prescription_dto import MedicalPrescriptionDTO
# from services.medical_prescription_service import MedicalPrescriptionService

# medical_prescription_service = MedicalPrescriptionService()


# class MedicalPrescriptionController:
#     @staticmethod
#     def get_all_medical_prescriptions():
#         medical_prescriptions = medical_prescription_service.get_all_medical_prescriptions()
#         medical_prescriptions_dto = [MedicalPrescriptionDTO.to_dict(medical_prescription) for medical_prescription in medical_prescriptions]
#         return jsonify(medical_prescriptions_dto), 200
    
#     @staticmethod
#     def get_medical_prescription_by_id(medical_prescription_id):
#         medical_prescription, error_message = medical_prescription_service.get_medical_prescription_by_id(medical_prescription_id)

#         if error_message:
#             return jsonify({'error': error_message}), 400

#         # DTO instance with patient id, date and description 
#         medical_prescription_dto = MedicalPrescriptionDTO(id_prescription=medical_prescription.id_prescription, id_medicine=medical_prescription.id_medicine, qta=medical_prescription.qta)

#         return jsonify(medical_prescription_dto.to_dict())  # Return patient id, date and description as JSON
    
#     @staticmethod
#     def delete_medical_prescription_by_id(medical_prescription_id):
#         success, error_message = medical_prescription_service.delete_medical_prescription_by_id(medical_prescription_id)

#         if success:
#             return jsonify({'message': 'Medical Prescription deleted successfully'}), 200
#         else:
#             return jsonify({'error': error_message}), 404
        
#     @staticmethod
#     def create_or_update_medical_prescription():
#         data = request.json  # Request data

#         # Get request parameters
#         medical_prescription_id = data.get('id')
#         qta = data.get('qta')
#         id_prescription = data.get('id_prescription')
#         id_medicine = data.get('id_medicine')

#         if medical_prescription_id:
#             success, message = medical_prescription_service.update_medical_prescription_by_id(medical_prescription_id, id_prescription, id_medicine, qta)
#             status_code = 200 if success else 404
#         elif not medical_prescription_id:
#             success, message = medical_prescription_service.create_medical_prescription(id_prescription, id_medicine, qta)
#             status_code = 201 if success else 400
#         else:
#             return jsonify({'error': 'Invalid request'}), 400

#         return jsonify({'message': message}) if success else jsonify({'error': message}), status_code