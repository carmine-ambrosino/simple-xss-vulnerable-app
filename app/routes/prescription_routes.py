from flask import Blueprint, render_template, request

from controllers.prescription_controller import PrescriptionController

prescription_bp = Blueprint('prescription', __name__, url_prefix='/api/prescription')


@prescription_bp.route('/get-all', methods=['GET'])
def get_all_prescriptions():
    return PrescriptionController.get_all_prescriptions()

@prescription_bp.route('/<string:prescription_id>', methods=['GET'])
def get_prescription_by_id(prescription_id):
    return PrescriptionController.get_prescription_by_id(prescription_id)

@prescription_bp.route('/<string:prescription_id>', methods=['DELETE'])
def delete_prescription_by_id(prescription_id):
    return PrescriptionController.delete_prescription_by_id(prescription_id)

@prescription_bp.route('', methods=['GET', 'POST'])
def create_or_update_prescription():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        return PrescriptionController.create_or_update_prescription()