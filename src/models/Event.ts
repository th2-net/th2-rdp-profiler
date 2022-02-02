export type Stream = {
    startTime: number;
    timeSinceStartProcessing: number;
    counters: {
        fetched: number;
        fetchedBytes: number;
        fetchedBatches: number;
        parseRequested: number;
        parseReceived: number;
        filterTotal: number;
        filterDiscarded: number;
        filterAccepted: number;
    }
}

export default interface PipelineStatus {
    streams: {
        [name: string]: Stream;
    }
    merger: number;
}

