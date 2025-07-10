import { FeatureCollection } from 'geojson';
import { SpatialDb } from 'autk-db';
import { AutkMap, LayerType } from 'autk-map'

export class MapViewer {

    private map!: AutkMap;
    private db!: SpatialDb;

    public constructor( db: SpatialDb, map: AutkMap ) {

        this.db = db;
        this.map = map;
    
    }

    private async loadLayers(): Promise<void> {

        const data: any = [];
        for (const layerData of this.db.tables) {

            if (layerData.source === 'csv') {
                continue;
            }

            const geojson = await this.db.getLayer(layerData.name);
            data.push({ props: layerData, data: geojson });
        }

        for (const json of data) {
            console.log(`Loading layer: ${json.props.name} of type ${json.props.type}`);
            this.map.loadGeoJsonLayer(json.props.name, json.props.type as LayerType, json.data);
        }

    }


    public async init(): Promise<void> {

        // Initialize the map with the canvas and bounding box
        await this.map.init(this.db.getOsmBoundingBox());
        await this.loadLayers();

    }

    /**
     * Get the database instance
     */
    public getDatabase(): SpatialDb {
        return this.db;
    }

    /**
     * Get the map instance
     */
    public getMap(): AutkMap {
        return this.map;
    }

    /**
     * Render the map
     */
    public draw(): void {
        this.map.draw();
    }

}