from typing import TypedDict, List

class OSMLayer:

    def __init__(self, name: str, boundingBox: list[float], layer: list[str] ):
        self.name = name
        self.boundingBox = boundingBox
        self.layer = layer

    def to_dict(self) -> dict:
        """
        Convert the OSMLayer object to dictionary format for traitlet usage.
        
        Returns:
            dict: Dictionary containing name, boundingBox, and layers
        """
        return {
            'name': self.name,
            'boundingBox': self.boundingBox,
            'layers': self.layer
        }