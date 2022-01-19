import { NumberLiteralType } from "typescript";

// export default interface KeepAlive {
//     timestamp: number;
//     scanCounter: number;
//     different?: number;
//     id?: string;
// }

export type Stream = {
    startTime: number;
    timeSinceStartProcessing: number;
    counters: {
        fetched: number;
        fetchedBytes: number;
        fetchedBatches: number;
        parseRequested: number;
        parseRecieved: number;
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

