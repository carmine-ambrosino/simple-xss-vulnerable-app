from flask import jsonify, request

from dtos.patient_dto import PatientDTO
from services.patient_service import PatientService
from dtos.patient_complete_info_dto import PatientCompleteInfoDTO

patient_service = PatientService()


class PatientController:
    @staticmethod
    def get_all_patients():
        patients = patient_service.get_all_patients()
        patients_dto = [PatientDTO.to_dict(patient) for patient in patients]
        return jsonify(patients_dto), 200

    @staticmethod
    def get_patient_by_id(patient_id):
        patient, error_message = patient_service.get_patient_by_id(patient_id)

        if error_message:
            return jsonify({'error': error_message}), 400

        # DTO instance with name, surname, date of birth, fiscal code and phone number
        patient_dto = PatientDTO(id=patient.id, name=patient.name, surname=patient.surname, dt_birth=patient.dt_birth, fiscal_code=patient.fiscal_code, phone=patient.phone)

        return jsonify(patient_dto.to_dict())  # Return name, surname, date of birth, fiscal code and phone number as JSON

    @staticmethod
    def get_patient_by_fiscal_code(fiscal_code):
        patients = patient_service.get_patients_instance()

        patients_complete_info_dto = []
        
        for patient_instance in patients:
            if (patient_instance.get('fiscal_code') == fiscal_code):
                prescriptions_list = patient_service.get_prescriptions_instance(patient_instance.get('id'))
                patient_info = PatientCompleteInfoDTO(patient_instance, prescriptions_list)
                patient_dto = patient_info.to_dict()
                patients_complete_info_dto.append(patient_dto)
            
                return jsonify(patients_complete_info_dto), 200

    @staticmethod
    def delete_patient_by_id(patient_id):
        success, error_message = patient_service.delete_patient_by_id(patient_id)

        if success:
            return jsonify({'message': 'Patient deleted successfully'}), 200
        else:
            return jsonify({'error': error_message}), 404

    @staticmethod
    def create_or_update_patient():
        data = request.json  # Request data

        # Get request parameters
        patient_id = data.get('id')
        name = data.get('name')
        surname = data.get('surname')
        dt_birth = data.get('dt_birth')
        fiscal_code = data.get('fiscal_code')
        phone = data.get('phone')

        if patient_id and (name or surname or fiscal_code):
            success, message = patient_service.update_patient_by_id(patient_id, name, surname, dt_birth, fiscal_code, phone)
            status_code = 200 if success else 404
        elif not patient_id and (name or surname or fiscal_code):
            success, message = patient_service.create_patient(name, surname, dt_birth, fiscal_code, phone)
            status_code = 201 if success else 400
        else:
            return jsonify({'error': 'Invalid request'}), 400

        return jsonify({'message': message}) if success else jsonify({'error': message}), status_code
    
    @staticmethod
    def get_patient_complete_info():
        patients = patient_service.get_patients_instance()

        patients_complete_info_dto = []
        
        for patient_instance in patients:
            prescriptions_list = patient_service.get_prescriptions_instance(patient_instance.get('id'))
            patient_info = PatientCompleteInfoDTO(patient_instance, prescriptions_list)
            patient_dto = patient_info.to_dict()
            patients_complete_info_dto.append(patient_dto)

        return jsonify(patients_complete_info_dto), 200
