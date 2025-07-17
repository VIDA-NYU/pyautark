## model
from .model.OSMLayer import OSMLayer
from .model.CustomLayer import CustomLayer
from .model.ThematicData import ThematicData

## widget
from .pyautark import PyAutark

## types
from geojson import FeatureCollection


class Map():

    def __init__(self):

        ## layers
        self.osmlayers: list[OSMLayer] = []
        self.customLayers: list[FeatureCollection] = []

        ## data
        self. thematicData: list[ThematicData] = []

    def load_osm_layer(self, name: str, boundingBox: list[float], layer: str):

        osmLayer: OSMLayer = OSMLayer(name=name, boundingBox=boundingBox, layer=layer)
        self.osmlayers.append(osmLayer)

    def load_custom_layer(self, name: str, features: FeatureCollection, featureType: str):

        customLayer: CustomLayer = CustomLayer(name=name, features=features, featureType=featureType)
        self.customLayers.append(customLayer)

    def load_thematic_data(self, name: str, path: str):

        thematicData: ThematicData = ThematicData(name=name, path=path)
        self.thematicData.append(thematicData)

    def render(self):

        pyautark = PyAutark()

        ## passing OSM layers to PyAutark
        osmLayerList: list[dict] = [layer.to_dict() for layer in self.osmlayers]
        pyautark.osmLayerListTraitletInstance = osmLayerList

        ## passing custom layers to PyAutark
        customLayerList: list[dict] = [layer.to_dict() for layer in self.customLayers]
        pyautark.customLayerListTraitletInstance = customLayerList

        ## saving thematic data')
        thematicDataList: list[dict] = [data.to_dict() for data in self.thematicData]
        pyautark.thematicDataTraitletInstance = thematicDataList

        ## binding data to a layer

        return pyautark