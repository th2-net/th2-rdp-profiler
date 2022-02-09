export type Stream = {
    fetched: number;
    fetchedBytes: number;
    fetchedBatches: number;
    parsePrepared: number;
    parseRequested: number;
    parseReceivedTotal: number;
    parseReceivedFailed: number;
    filterTotal: number;
    filterDiscarded: number;
    filterAccepted: number;
}

export default interface PipelineStatus {
    startTime: number;
    processingTime: number;
    returned: number;
    counters: {
        [name: string]: Stream;
    } 
}

