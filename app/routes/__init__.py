from flask import Blueprint, render_template

from routes.medicine_routes import medicine_bp
from routes.patient_routes import patient_bp
from routes.prescription_routes import prescription_bp
# from routes.medical_prescription_routes import medical_prescription_bp

# General blueprint for routes
routes_bp = Blueprint('routes', __name__, url_prefix='/api', template_folder='templates', static_folder='static')

routes_bp.register_blueprint(medicine_bp)
routes_bp.register_blueprint(patient_bp)
routes_bp.register_blueprint(prescription_bp)
# routes_bp.register_blueprint(medical_prescription_bp)

# Add other routes
@routes_bp.route('/')
def index():
    return render_template('index.html')