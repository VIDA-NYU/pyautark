import traitlets
from typing import Dict, List, Any

from pyautark.model.OSMLayer import OSMLayer
from .OSMLayerTraitlet import OSMLayerTraitlet

class OSMLayerListTraitlet(traitlets.TraitType):
    """Custom traitlet for a list of OSM Layer data"""
    
    info_text = 'a list of OSM layers'
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self._layer_traitlet = OSMLayerTraitlet()
    
    def validate(self, obj, value):
        """Validate list of OSM layers"""
        if not isinstance(value, list):
            self.error(obj, value)
        
        # Validate each layer in the list
        validated_layers = []
        for i, layer in enumerate(value):
            try:
                validated_layer = self._layer_traitlet.validate(obj, layer)
                validated_layers.append(validated_layer)
            except traitlets.TraitError as e:
                raise traitlets.TraitError(f"Layer {i}: {e}")
        
        return validated_layers
    
    def default_value(self):
        """Default empty list"""
        return []