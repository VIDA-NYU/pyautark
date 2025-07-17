export interface OSMLayerData {
    name: string;
    boundingBox: number[];
    layers: string[];
}

export interface CustomLayerData {
    name: string;
    features: GeoJSON.FeatureCollection;
}

export interface ThematicData {
    name: string;
    path: string;
    content: unknown[][];
}

export interface BoundingBox {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
}