## types
from geojson import FeatureCollection

class CustomLayer:

    def __init__(self, name: str, features: FeatureCollection, featureType: str):
        self.name: str = name
        self.features: FeatureCollection = features
        self.featureType: str = featureType

    def to_dict(self) -> dict:
        """
        Convert the CustomLayer object to dictionary format for traitlet usage.
        
        Returns:
            dict: Dictionary containing name and features
        """
        return {
            'name': self.name,
            'features': self.features
        }