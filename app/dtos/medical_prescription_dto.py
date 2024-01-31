class MedicalPrescriptionDTO:
    def __init__(self, id_prescription, id_medicine, qta):
        self.id_prescription = id_prescription
        self.id_medicine = id_medicine
        self.qta = qta

    def to_dict(self):
        return {
            'id_prescription': self.id_prescription,
            'id_medicine': self.id_medicine,
            'qta': self.qta,
        }