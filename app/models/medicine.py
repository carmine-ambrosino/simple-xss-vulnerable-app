import uuid
from sqlalchemy.dialects.postgresql import UUID

from config import db
from dtos.medicine_dto import MedicineDTO


class Medicine(db.Model):
    __tablename__ = 'medicine'
    __table_args__ = {'schema': 'healthcare_management'}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String(50))
    description = db.Column(db.String)

    def to_dto(self):
        return MedicineDTO(name=self.name, description=self.description)
