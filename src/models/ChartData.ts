export type Data = {
    timeSinceStartProcessing: number;
    fetchedRate: number;
    fetchedBytesRate: number;
    fetchedBatchesRate: number;
    parseRequestedRate: number;
    parseReceivedRate: number;
    filterTotalRate: number;
    filterDiscardedRate: number;
    filterAcceptedRate: number;
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