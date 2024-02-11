from flask import Blueprint, render_template, request

from controllers.patient_controller import PatientController

patient_bp = Blueprint('patient', __name__, url_prefix='/api/patient')


@patient_bp.route('/get-all', methods=['GET'])
def get_all_patients():
    return PatientController.get_all_patients()

@patient_bp.route('/<string:patient_id>', methods=['GET'])
def get_patient_by_id(patient_id):
    return PatientController.get_patient_by_id(patient_id)

@patient_bp.route('/<string:patient_id>', methods=['DELETE'])
def delete_patient_by_id(patient_id):
    return PatientController.delete_patient_by_id(patient_id)

@patient_bp.route('', methods=['GET', 'POST'])
def create_or_update_patient():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        return PatientController.create_or_update_patient()

@patient_bp.route('/get-all-info', methods=['GET'])
def get_patient_complete_info():
    return PatientController.get_patient_complete_info()