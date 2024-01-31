class PatientDTO:
    def __init__(self, id, name, surname, dt_birth, fiscal_code, phone):
        self.id = id
        self.name = name
        self.surname = surname
        self.dt_birth = dt_birth
        self.fiscal_code = fiscal_code
        self.phone = phone

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'surname': self.surname,
            'dt_birth': self.dt_birth,
            'fiscal_code': self.fiscal_code,
            'phone': self.phone
        }