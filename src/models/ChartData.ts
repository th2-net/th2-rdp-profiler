export type Data = {
    timeSinceStartProcessing: number;
    fetchedDiff: number;
    fetchedBytesDiff: number;
    fetchedBatchesDiff: number;
    parseRequestedDiff: number;
    parseRecievedDiff: number;
    filterTotalDiff: number;
    filterDiscardedDiff: number;
    filterAcceptedDiff: number;
}

export default interface ChartData {
    [stream: string]: Data[];
}

export type Merger = {
    id: number;
    merger: number;
} 