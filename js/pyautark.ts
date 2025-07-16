// anywidget imports
import type { RenderProps } from "@anywidget/types";

// autk imports
import { AutkMap, LayerType } from 'autk-map';
import { SpatialDb } from 'autk-db';

// types
import { OSMLayerData } from "./interfaces";
import { MapViewer } from "./map/MapViewer";
import { MapFactory } from "./map/MapFactory";
import { LayerManager } from "./map/LayerManager";

// Importing CSS styles for the widget Example
// import "./pyautark.css";

/* Specifies attributes defined with traitlets in ../src/ipyutk/__init__.py */
interface WidgetModel {
    osmLayerListTraitletInstance: any[];
	customLayerListTraitletInstance?: any[];
}

function render({ model, el }: RenderProps<WidgetModel>) {

	// setting the element's width to the size of the cell	
	el.style.width = "100%";

	// Creating canvas element where the map will be drawn
	const canvas: HTMLCanvasElement = document.createElement("canvas");
	el.appendChild(canvas);

	// getting the layers to be rendered
    const osmLayers: any = model.get("osmLayerListTraitletInstance") || [];
	// const customLayers: any = model.get("osmCustomLayers") || [];

	// Use requestAnimationFrame to ensure the element is fully laid out
	requestAnimationFrame(() => {
				
		// Update canvas dimensions based on actual cell size
		canvas.width = el.clientWidth;
		canvas.height = Math.min(el.clientWidth, 600);

        MapFactory.create(canvas).then( async ( mapViewer: MapViewer ) => {

			// loading layers to DB
			await LayerManager.load_osm_layers( mapViewer, osmLayers );
			
			await mapViewer.init();
			mapViewer.draw();

        });
	});
    
}

export default { render };
