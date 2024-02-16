from flask import Blueprint, render_template, send_from_directory, redirect

from routes.medicine_routes import medicine_bp
from routes.patient_routes import patient_bp
from routes.prescription_routes import prescription_bp

routes_bp = Blueprint('routes', __name__, url_prefix='/', template_folder='templates', static_folder='static')

routes_bp.register_blueprint(medicine_bp)
routes_bp.register_blueprint(patient_bp)
routes_bp.register_blueprint(prescription_bp)

@routes_bp.route('/')
def root():
    return redirect('/api')

@routes_bp.route('/api')
def index():
    return render_template('index.html')

@routes_bp.route('/static/<path:filename>')
def custom_static(filename):
    return send_from_directory(routes_bp.static_folder, filename)

@routes_bp.route('/<path:dummy>')
def fallback(dummy):
    # Redirect when the path is incorrect 
    return redirect('/api')