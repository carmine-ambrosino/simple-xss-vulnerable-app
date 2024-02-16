class MedicineDTO:
    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description

    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'name': self.name
        }
