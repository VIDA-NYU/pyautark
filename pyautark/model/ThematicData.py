from ..utils.readers.CSVReader import CSVReader

class ThematicData:

    def __init__(self, name: str, path: str):
        
        self.name = name
        self.path = path

        self.content = CSVReader.read(path)

    def to_dict(self) -> dict:

        return {
            "name": self.name,
            "path": self.path,
            "content": self.content
        }