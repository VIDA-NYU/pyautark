import traitlets
from typing import Dict, List, Any
from pyautark.model import OSMLayer

class OSMLayerTraitlet(traitlets.TraitType):
    """Custom traitlet for OSM Layer data"""
    
    info_text = 'an OSM layer with name, polygon, and layers'
    
    def validate(self, obj, value):
        """Validate OSM layer structure"""
        if not isinstance(value, dict):
            self.error(obj, value)
        
        # Check required fields
        required_fields = {'name', 'boundingBox', 'layers'}
        if not all(field in value for field in required_fields):
            missing = required_fields - set(value.keys())
            raise traitlets.TraitError(f"Missing required fields: {missing}")
        
        # Validate field types
        if not isinstance(value.get('name'), str):
            raise traitlets.TraitError("'name' must be a string")
        
        if not isinstance(value.get('boundingBox'), list):
            raise traitlets.TraitError("'polygon' must be a list")
        
        if not isinstance(value.get('layers'), list):
            raise traitlets.TraitError("'layers' must be a list")
        
        return value
    
    def default_value(self):
        """Default OSM layer structure"""
        return {
            'name': '',
            'boundingBox': [],
            'layers': []
        }