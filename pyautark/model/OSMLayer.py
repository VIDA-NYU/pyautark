from typing import TypedDict, List

class OSMLayer(TypedDict):
    name: str
    polygon: List[List[float]]
    layers: List[str]