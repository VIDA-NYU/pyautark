import { OSMLayerData } from "../interfaces";
import { MapViewer } from "./MapViewer";

export class LayerManager {

    public static async load_osm_layers( mapViewer: MapViewer, osmLayers: OSMLayerData ): Promise<void> {

        await mapViewer.getDatabase().loadOsmFromOverpassApi({
            boundingBox: {
                minLon: -43.149375,
                minLat: -22.920271,
                maxLon: -43.070836,
                maxLat: -22.856426,
            }, outputTableName: 'table_osm',
            autoLoadLayers: {
                coordinateFormat: 'EPSG:3395',
                layers: [
                    'coastline',
                    // 'parks',
                    // 'water',
                    'roads'
                ] as Array<'surface' | 'coastline' | 'parks' | 'water' | 'roads' | 'buildings'>,
                dropOsmTable: true,
            },
        });


    }




}