from flask import jsonify, request

from dtos.prescription_dto import PrescriptionDTO
from services.prescription_service import PrescriptionService

prescription_service = PrescriptionService()


class PrescriptionController:
    @staticmethod
    def get_all_prescriptions():
        prescriptions = prescription_service.get_all_prescriptions()
        prescriptions_dto = [PrescriptionDTO.to_dict(prescription) for prescription in prescriptions]
        return jsonify(prescriptions_dto), 200
    
    @staticmethod
    def get_prescription_by_id(prescription_id):
        prescription, error_message = prescription_service.get_prescription_by_id(prescription_id)

        if error_message:
            return jsonify({'error': error_message}), 400

        # DTO instance with patient id, date and description 
        prescription_dto = PrescriptionDTO(id_patient=prescription.id_patient, dt=prescription.dt, description=prescription.description)

        return jsonify(prescription_dto.to_dict())  # Return patient id, date and description as JSON
    
    @staticmethod
    def delete_prescription_by_id(prescription_id):
        success, error_message = prescription_service.delete_prescription_by_id(prescription_id)

        if success:
            return jsonify({'message': 'Prescription deleted successfully'}), 200
        else:
            return jsonify({'error': error_message}), 404
        
    @staticmethod
    def create_or_update_prescription():
        data = request.json  # Request data

        # Get request parameters
        prescription_id = data.get('id')
        dt = data.get('dt')
        description = data.get('description')
        id_patient = data.get('id_patient')
        medicines_data = data.get('medicines')

        if prescription_id and description:
            success, message = prescription_service.update_prescription_by_id(prescription_id, id_patient, dt, description, medicines_data)
            status_code = 200 if success else 404
        elif not prescription_id and description:
            success, message = prescription_service.create_prescription(id_patient, dt, description, medicines_data)
            status_code = 201 if success else 400
        else:
            return jsonify({'error': 'Invalid request'}), 400

        return jsonify({'message': message}) if success else jsonify({'error': message}), status_code