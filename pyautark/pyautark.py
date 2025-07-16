import pathlib
import anywidget
import traitlets

## Traitlets
from pyautark.traitlets.OSMLayerTraitlet import OSMLayerTraitlet
from pyautark.traitlets.OSMLayerListTraitlet import OSMLayerListTraitlet

## types
from .model.OSMLayer import OSMLayer

class PyAutark(anywidget.AnyWidget):

    _esm = pathlib.Path(__file__).parents[1] / "js" / "dist" / "pyautark.js"
    # _css = pathlib.Path(__file__).parents[1] / "js" / "dist" / "pyautark.css"

    ## render parameters
    osmLayerListTraitletInstance = traitlets.List( trait=traitlets.Dict(), default_value=[] ).tag(sync=True)
    customLayerListTraitletInstance = traitlets.List( trait=traitlets.Dict(), default_value=[] ).tag(sync=True)

    # osmLayerTraitletInstance = OSMLayerTraitlet().tag(sync=True)
    # osmCustomLayers = traitlets.List(default_value=[]).tag(sync=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

