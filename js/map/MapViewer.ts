
import { SpatialDb } from 'autk-db';
import { AutkMap, LayerType, ThematicAggregationLevel } from 'autk-map'
import { BoundingBox, CustomLayerData, OSMLayerData, ThematicData } from '../interfaces';
import { GeoJsonProperties } from 'geojson';

export class MapViewer {

    private map!: AutkMap;
    private db!: SpatialDb;

    // layers
    private osmLayers: OSMLayerData[] = [];
    private customLayers: CustomLayerData[] = [];

    private thematicData: ThematicData[] = [];

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

        let boundingBox: BoundingBox | null = null;
        if( this.osmLayers.length > 0) {
            boundingBox = this.db.getOsmBoundingBox();
        }
        else {
            boundingBox = await this.db.getBoundingBoxFromLayer(this.customLayers[0].name);
        }

        // Initialize the map with the canvas and bounding box
        await this.map.init(boundingBox);
        await this.loadLayers();

    }

    // TODO: It is unclear why the DB returns a promise when it gets the bounding box from the CustomLayer and a BoundingBox type 
    // when it get the bounding box from the OSM layers.
    public get_boundingBox(): BoundingBox | Promise<BoundingBox> {

        if( this.osmLayers.length > 0 ) {
            return this.db.getOsmBoundingBox();
        }
        return this.db.getBoundingBoxFromLayer(this.customLayers[0].name)

    }

    public addOSMLayer(osmLayer: OSMLayerData): void {
        this.osmLayers.push(osmLayer);
    }

    public addCustomLayer(customLayer: CustomLayerData): void {
        this.customLayers.push(customLayer);
    }

    public addThematicData(thematicData: ThematicData): void {
        this.thematicData.push(thematicData);
    }

    public async loadLayerData(): Promise<void> {

        // // Filtering thematic data
        // const test = await this.db.rawQuery({
        //     query: `SELECT * from taxi WHERE pickup_datetime >= '2012-01-26 00:00:00'`, 
        //     output: {
        //         type: 'RETURN_OBJECT',
        //     },
        // });

        // Spatial joining with the desired layer
        await this.db.spatialJoin({
            tableRootName: 'manhattan_roads',
            tableJoinName: 'taxi',
            spatialPredicate: 'NEAR',
            nearDistance: 20,
            output: {
                type: 'MODIFY_ROOT',
            },
            joinType: 'LEFT',
            groupBy: {
                selectColumns: [
                {
                    tableName: 'taxi',
                    column: 'pickup_datetime',
                    aggregateFn: 'count',
                },
                ],
            },
        });

        const thematicData: any[] = [];

        const geojson = await this.db.getLayer('manhattan_roads');

        if (geojson) {
            for (const feature of geojson.features) {
                const properties = feature.properties as GeoJsonProperties;

                if (!properties) {
                    continue;
                }

                const val = properties.sjoin.count['taxi'] || 0;

                thematicData.push({
                    level: ThematicAggregationLevel.AGGREGATION_COMPONENT,
                    values: [val],
                });
            }

            const valMin = Math.min(...thematicData.map((d) => d.values[0]));
            const valMax = Math.max(...thematicData.map((d) => d.values[0]));

            for (let i = 0; i < thematicData.length; i++) {
                const val = thematicData[i].values[0];
                thematicData[i].values = [(val - valMin) / (valMax - valMin)];
            }

        }

        this.map.updateLayerThematic('manhattan_roads', thematicData);
        
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