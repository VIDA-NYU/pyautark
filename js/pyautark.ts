// anywidget imports
import type { RenderProps } from "@anywidget/types";

// autk imports
import { SpatialDb } from 'utkdb';
import { UtkMap, LayerType } from 'utkmap';

// types
import { OSMLayerData } from "./interfaces";
import { FeatureCollection } from 'geojson';
import { MapViewer } from "./map/MapViewer";
import { MapFactory } from "./map/MapFactory";
import { LayerManager } from "./map/LayerManager";

// Importing CSS styles for the widget Example
// import "./pyautark.css";

/* Specifies attributes defined with traitlets in ../src/ipyutk/__init__.py */
interface WidgetModel {
    osmLayerTraitletInstance: any;
}

// class GeojsonVis {

    // protected map!: UtkMap;
    // protected db!: SpatialDb;

    // public async run(geojson: FeatureCollection, canvas: HTMLCanvasElement): Promise<void> {

    //     this.db = new SpatialDb();
    //     await this.db.init();

    //     await this.db.loadCustomLayer({
    //         geojsonObject: geojson,
    //         outputTableName: 'neighborhoods',
    //         coordinateFormat: 'EPSG:3395'
    //     });

    //     const boundingBox = await this.db.getBoundingBoxFromLayer('neighborhoods');

    //     if (canvas) {

    //         canvas.width = canvas.height = canvas.parentElement?.clientHeight || 800;
    //         this.map = new UtkMap(canvas);

    //         await this.map.init(boundingBox);
    //         await this.loadLayers();

    //         this.map.draw();
    //     }
    // }

    // protected async loadLayers(): Promise<void> {

    //     const data: any = [];
    //     for (const layerData of this.db.tables) {

    //         if (layerData.source === 'csv') {
    //             continue;
    //         }

    //         const geojson = await this.db.getLayer(layerData.name);
    //         data.push({ props: layerData, data: geojson });
    //     }

    //     for (const json of data) {
    //         console.log(`Loading layer: ${json.props.name} of type ${json.props.type}`);
    //         this.map.loadGeoJsonLayer(json.props.name, json.props.type as LayerType, json.data);
    //     }
    // }
// }


function render({ model, el }: RenderProps<WidgetModel>) {

	// setting the element's width to the size of the cell	
	el.style.width = "100%";

	// Creating canvas element where the map will be drawn
	const canvas: HTMLCanvasElement = document.createElement("canvas");
	el.appendChild(canvas);

    const osmLayers: OSMLayerData = model.get("osmLayerTraitletInstance");

	// Use requestAnimationFrame to ensure the element is fully laid out
	requestAnimationFrame(() => {
				
		// Update canvas dimensions based on actual cell size
		canvas.width = el.clientWidth;
		canvas.height = Math.min(el.clientWidth, 600);

        MapFactory.create(canvas).then( ( mapViewer: MapViewer ) => {
            LayerManager.load_osm_layers( mapViewer, osmLayers ).then(async () => {

                await mapViewer.init();
                mapViewer.draw();

            });
        });
	});
    
}

export default { render };
