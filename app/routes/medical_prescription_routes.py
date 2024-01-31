from flask import Blueprint

# from controllers.medical_prescription_controller import MedicalPrescriptionController

# medical_prescription_bp = Blueprint('medical_prescription', __name__, url_prefix='/medical_prescription')


# @medical_prescription_bp.route('/get-all', methods=['GET'])
# def get_all_medical_prescriptions():
#     return MedicalPrescriptionController.get_all_medical_prescriptions()

# @medical_prescription_bp.route('/<string:medical_prescription_id>', methods=['GET'])
# def get_medical_prescription_by_id(medical_prescription_id):
#     return MedicalPrescriptionController.get_medical_prescription_by_id(medical_prescription_id)


# @medical_prescription_bp.route('/<string:medical_prescription_id>', methods=['DELETE'])
# def delete_medical_prescription_by_id(medical_prescription_id):
#     return MedicalPrescriptionController.delete_medical_prescription_by_id(medical_prescription_id)

# @medical_prescription_bp.route('', methods=['POST'])
# def create_or_update_medical_prescription():
#     return MedicalPrescriptionController.create_or_update_medical_prescription()