import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from config import db
from dtos.prescription_dto import PrescriptionDTO


class Prescription(db.Model):
    __tablename__ = 'prescription'
    __table_args__ = {'schema': 'healthcare_management'}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    dt = db.Column(db.Date)
    description = db.Column(db.String)
    id_patient = db.Column(UUID(as_uuid=True), db.ForeignKey('healthcare_management.patient.id'), nullable=False)

    patient = relationship("Patient", backref="prescriptions") 
    medicines = db.relationship('Medicine', secondary='healthcare_management.medical_prescription', backref='prescriptions', lazy='dynamic')

    def to_dto(self):
        return PrescriptionDTO(id_patient=self.patient.id, dt=self.dt, description=self.description)