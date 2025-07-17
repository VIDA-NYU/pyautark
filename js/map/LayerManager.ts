import { FeatureCollection } from "geojson";
import { OSMLayerData } from "../interfaces";
import { MapViewer } from "./MapViewer";

export class LayerManager {

    public static async load_osm_layers( mapViewer: MapViewer, osmLayers: any[] ): Promise<void> {

        const promises: Promise<void>[] = osmLayers.map(async (osmLayer: OSMLayerData) => {

            if (!osmLayer.boundingBox || !osmLayer.layers || osmLayer.layers.length === 0) {
                console.warn(`Skipping OSM layer ${osmLayer.name} due to missing bounding box or layers.`);
                return;
            }

            const boundingBox = {
                minLon: osmLayer.boundingBox[0],
                minLat: osmLayer.boundingBox[1],
                maxLon: osmLayer.boundingBox[2],
                maxLat: osmLayer.boundingBox[3]
            }

            // adding layer to mapViewer
            mapViewer.addOSMLayer(osmLayer);

            return mapViewer.getDatabase().loadOsmFromOverpassApi({
                boundingBox: boundingBox,
                outputTableName: `table_osm_${osmLayer.name}`,
                autoLoadLayers: {
                    coordinateFormat: 'EPSG:3395',
                    layers: osmLayer.layers as Array<'surface' | 'coastline' | 'parks' | 'water' | 'roads' | 'buildings'>,
                    dropOsmTable: true,
                },
            });

        });

        await Promise.all(promises);
        return;

    }
    public static async load_custom_layers( mapViewer: MapViewer, customLayers: any[] ): Promise<any> {
     
        const promises: Promise<any>[] = customLayers.map(async (customLayer: any) => {

            // adding custom layer to mapViewer
            mapViewer.addCustomLayer(customLayer);

            return mapViewer.getDatabase().loadCustomLayer({
                geojsonObject: customLayer.features,
                outputTableName: customLayer.name,
                coordinateFormat: 'EPSG:3395',
                type: 'lines'
            })
        })

        await Promise.all(promises);
        return;

    }
}