import uuid
from sqlalchemy.dialects.postgresql import UUID

from config import db
from dtos.patient_dto import PatientDTO


class Patient(db.Model):
    __tablename__ = 'patient'
    __table_args__ = {'schema': 'healthcare_management'}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(50))
    surname = db.Column(db.String(50))
    dt_birth = db.Column(db.Date)
    fiscal_code = db.Column(db.String(16))
    phone = db.Column(db.String(10))


    def to_dto(self):
        return PatientDTO(name=self.name, surname=self.surname, dt_birth=self.dt_birth, fiscal_code=self.fiscal_code, phone=self.phone)