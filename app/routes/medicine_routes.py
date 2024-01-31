from flask import Blueprint

from controllers.medicine_controller import MedicineController

medicine_bp = Blueprint('medicine', __name__, url_prefix='/medicine')


@medicine_bp.route('/get-all', methods=['GET'])
def get_all_medicines():
    return MedicineController.get_all_medicines()


@medicine_bp.route('/<string:medicine_id>', methods=['GET'])
def get_medicine_by_id(medicine_id):
    return MedicineController.get_medicine_by_id(medicine_id)


@medicine_bp.route('/<string:medicine_id>', methods=['DELETE'])
def delete_medicine_by_id(medicine_id):
    return MedicineController.delete_medicine_by_id(medicine_id)


@medicine_bp.route('', methods=['POST'])
def create_or_update_medicine():
    return MedicineController.create_or_update_medicine()
