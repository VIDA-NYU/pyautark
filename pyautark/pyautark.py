import pathlib
import anywidget
import traitlets

## types
from .model.OSMLayer import OSMLayer

class PyAutark(anywidget.AnyWidget):

    _esm = pathlib.Path(__file__).parents[1] / "js" / "dist" / "pyautark.js"
    # _css = pathlib.Path(__file__).parents[1] / "js" / "dist" / "pyautark.css"

    ## render parameters
    osmLayerTraitletInstance = traitlets.Dict(default_value={
        'name': '',
        'polygon': [],
        'layers': []
    }).tag(sync=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

def render( osmLayers: OSMLayer ):

    pyautark = PyAutark()

    ## Setting traitlets - create and bind the OSMLayerTraitlet instance
    pyautark.osmLayerTraitletInstance = osmLayers

    return pyautark