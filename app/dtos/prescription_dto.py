class PrescriptionDTO:
    def __init__(self, id_patient, dt, description):
        self.id_patient = id_patient
        self.dt = dt
        self.description = description

    def to_dict(self):
        return {
            'id_patient': self.id_patient,
            'dt': self.dt,
            'description': self.description,
        }