export type Stream = {
    [counter: string]: number;
}

export default interface PipelineStatus {
    startTime: number;
    processingTime: number;
    returned: number;
    counters: {
        [name: string]: Stream;
    } 
}

