export type Data = {
    [rate: string]: number;
}

export default interface ChartData {
    [stream: string]: {
        data: Data[];
        lastTimestamp?: number;
    }
}

export type Merger = {
    id: number;
    merger: number;
} 