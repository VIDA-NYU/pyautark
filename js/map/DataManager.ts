import { ThematicData } from "../interfaces";
import { MapViewer } from "./MapViewer";

export class DataManager {

    public static async load_thematic_data( mapViewer: MapViewer, thematicData: ThematicData[] ): Promise<void> {

        const promises: Promise<void>[] = thematicData.map(async (data: ThematicData) => {

            // adding thematic data to mapViewer
            mapViewer.addThematicData(data);

            console.log(data.content);

            await mapViewer.getDatabase().loadCsv({
                csvObject: data.content,
                outputTableName: 'taxi',
                geometryColumns: {
                    latColumnName: 'pickup_latitude',
                    longColumnName: 'pickup_longitude',
                    coordinateFormat: 'EPSG:3395',
                },
            });

        });

        await Promise.all(promises);
        return;

    }
            
}