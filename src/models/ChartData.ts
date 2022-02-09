export type Data = {
    startTime: number;
    fetchedRate: number;
    fetchedBytesRate: number;
    fetchedBatchesRate: number;
    parsePreparedRate: number;
    parseRequestedRate: number;
    parseReceivedTotalRate: number;
    parseReceivedFailedRate: number;
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