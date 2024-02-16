import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from config import db
from dtos.medical_prescription_dto import MedicalPrescriptionDTO


class MedicalPrescription(db.Model):
    __tablename__ = 'medical_prescription'
    __table_args__ = {'schema': 'healthcare_management'}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    qta = db.Column(db.Integer)
    id_prescription = db.Column(UUID(as_uuid=True), db.ForeignKey('healthcare_management.prescription.id'), nullable=False)
    id_medicine = db.Column(UUID(as_uuid=True), db.ForeignKey('healthcare_management.medicine.id'), nullable=False)

    def to_dto(self):
        return MedicalPrescriptionDTO(id_prescription=self.prescription.id, id_medicine=self.medicine.id, qta=self.qta)