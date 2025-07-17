// anywidget imports
import type { RenderProps } from "@anywidget/types";

// types
import { CustomLayerData, OSMLayerData, ThematicData } from "./interfaces";
import { MapViewer } from "./map/MapViewer";
import { MapFactory } from "./map/MapFactory";
import { LayerManager } from "./map/LayerManager";
import { DataManager } from "./map/DataManager";
import { CalendarWidget } from "./widgets/CalendarWidget";

// Importing CSS styles for the widget Example
// import "./pyautark.css";

/* Specifies attributes defined with traitlets in ../src/ipyutk/__init__.py */
interface WidgetModel {
    osmLayerListTraitletInstance: OSMLayerData[];
	customLayerListTraitletInstance: CustomLayerData[];
	thematicDataTraitletInstance: ThematicData[]
}

function render({ model, el }: RenderProps<WidgetModel>) {

	// setting the element's width to the size of the cell	
	el.style.width = "100%";

	const containerDiv: HTMLDivElement = document.createElement("div");
	containerDiv.style.width = "100%";
	containerDiv.style.height = "100%";
	containerDiv.style.position = "relative";
	el.appendChild(containerDiv);

	// widget div
	const widgetDiv: HTMLDivElement = document.createElement("div");
	widgetDiv.style.position = "absolute";
	widgetDiv.style.top = "20px";
	widgetDiv.style.left = "20px";
	widgetDiv.style.width = "700px";
	widgetDiv.style.height = "200px";
	containerDiv.appendChild(widgetDiv);



	// Creating canvas element where the map will be drawn
	const canvas: HTMLCanvasElement = document.createElement("canvas");
	containerDiv.appendChild(canvas);

	// getting the layers to be rendered
    const osmLayers: any = model.get("osmLayerListTraitletInstance") || [];
	const customLayers: any = model.get("customLayerListTraitletInstance") || [];

	// getting the thematic data to be rendered
	const thematicData: ThematicData[] = model.get("thematicDataTraitletInstance") || [];

	// Use requestAnimationFrame to ensure the element is fully laid out
	requestAnimationFrame(() => {
				
		// Update canvas dimensions based on actual cell size
		canvas.width = containerDiv.clientWidth;
		canvas.height = Math.min(containerDiv.clientWidth, 600);

        MapFactory.create(canvas).then( async ( mapViewer: MapViewer ) => {

			// loading layers to DB
			await LayerManager.load_osm_layers( mapViewer, osmLayers );
			await LayerManager.load_custom_layers( mapViewer, customLayers );

			// loading thematic data
			await DataManager.load_thematic_data( mapViewer, thematicData );

			await mapViewer.init();
			mapViewer.draw();

			// loading widgets
			// const calendarWidget = new CalendarWidget();


        });
	});
    
}

export default { render };
