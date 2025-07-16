## model
from .model.OSMLayer import OSMLayer
from .pyautark import PyAutark

## types
from geojson import FeatureCollection


class Map():

    def __init__(self):

        ## layers
        self.osmlayers: list[OSMLayer] = []
        self.customLayers: list[FeatureCollection] = []

    def load_osm_layer(self, name: str, boundingBox: list[float], layer: str):

        osmLayer: OSMLayer = OSMLayer(name=name, boundingBox=boundingBox, layer=layer)
        self.osmlayers.append(osmLayer)

    def load_custom_layer(self, featureCollection: FeatureCollection):

        self.customLayers.append(featureCollection)

    def load_layer_data(self):
        pass

    def render(self):

        pyautark = PyAutark()

        ## passing OSM layers to PyAutark
        osmLayerList: list[dict] = [layer.to_dict() for layer in self.osmlayers]
        pyautark.osmLayerListTraitletInstance = osmLayerList

        return pyautark