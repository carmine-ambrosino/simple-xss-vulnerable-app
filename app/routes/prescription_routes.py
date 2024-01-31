from flask import Blueprint

from controllers.prescription_controller import PrescriptionController

prescription_bp = Blueprint('prescription', __name__, url_prefix='/prescription')


@prescription_bp.route('/get-all', methods=['GET'])
def get_all_prescriptions():
    return PrescriptionController.get_all_prescriptions()

@prescription_bp.route('/<string:prescription_id>', methods=['GET'])
def get_prescription_by_id(prescription_id):
    return PrescriptionController.get_prescription_by_id(prescription_id)

@prescription_bp.route('/<string:prescription_id>', methods=['DELETE'])
def delete_prescription_by_id(prescription_id):
    return PrescriptionController.delete_prescription_by_id(prescription_id)

@prescription_bp.route('', methods=['POST'])
def create_or_update_prescription():
    return PrescriptionController.create_or_update_prescription()