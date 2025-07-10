// utk
import { SpatialDb } from 'autk-db';
import { AutkMap } from 'autk-map';

// ipyutk
import { MapViewer } from './MapViewer';

export class MapFactory {

    public static async create(
        canvas: HTMLCanvasElement
    ): Promise<MapViewer> {
        
        // Initialize the spatial database
        const db = new SpatialDb();
        await db.init();

        // Initialize the map with the canvas and bounding box
        const map = new AutkMap(canvas);

        // Create and return the MapViewer instance
        return new MapViewer(db, map);
        
    }

}
