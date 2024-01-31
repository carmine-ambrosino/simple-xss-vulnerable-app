
class PatientCompleteInfoDTO:
    
    def __init__(self, patient_instance, prescriptions=None):
        self.id = patient_instance.get('id')
        self.name = patient_instance.get('name')
        self.surname = patient_instance.get('surname')
        self.dt_birth = patient_instance.get('dt_birth')
        self.fiscal_code = patient_instance.get('fiscal_code')
        self.phone = patient_instance.get('phone')
        self.prescriptions = []

        if prescriptions:
            for prescription in prescriptions:
                prescription_info = {
                    'id': prescription.get('id'),
                    'dt': prescription.get('dt'),
                    'medicines': [
                        {
                            'id': medicine.get('id'),
                            'name': medicine.get('name'),
                            'description': medicine.get('description')
                        } for medicine in prescription.get('medicines')
                    ],
                    'description': prescription.get('description')
                }
                self.prescriptions.append(prescription_info)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'dt_birth': self.dt_birth,
            'fiscal_code': self.fiscal_code,
            'phone': self.phone,
            'prescriptions': self.prescriptions
        }