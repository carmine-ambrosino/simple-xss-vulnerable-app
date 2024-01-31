from flask import jsonify, request

from dtos.medicine_dto import MedicineDTO
from services.medicine_service import MedicineService

medicine_service = MedicineService()


class MedicineController:
    @staticmethod
    def get_all_medicines():
        medicines = medicine_service.get_all_medicines()
        medicines_dto = [MedicineDTO.to_dict(medicine) for medicine in medicines]
        return jsonify(medicines_dto), 200

    @staticmethod
    def get_medicine_by_id(medicine_id):
        medicine, error_message = medicine_service.get_medicine_by_id(medicine_id)

        if error_message:
            return jsonify({'error': error_message}), 400

        # DTO instance with name, description
        medicine_dto = MedicineDTO(id=medicine.id, name=medicine.name, description=medicine.description)

        return jsonify(medicine_dto.to_dict())  # Return name, description as JSON

    @staticmethod
    def delete_medicine_by_id(medicine_id):
        success, error_message = medicine_service.delete_medicine_by_id(medicine_id)

        if success:
            return jsonify({'message': 'Medicine deleted successfully'}), 200
        else:
            return jsonify({'error': error_message}), 404

    @staticmethod
    def create_or_update_medicine():
        data = request.json  # Request data

        # Get request parameters
        medicine_id = data.get('id')
        name = data.get('name')
        description = data.get('description')

        if medicine_id and (name or description):
            success, message = medicine_service.update_medicine_by_id(medicine_id, name, description)
            status_code = 200 if success else 404
        elif not medicine_id and (name or description):
            success, message = medicine_service.create_medicine(name, description)
            status_code = 201 if success else 400
        else:
            return jsonify({'error': 'Invalid request'}), 400

        return jsonify({'message': message}) if success else jsonify({'error': message}), status_code
