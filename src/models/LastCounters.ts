export default interface LastCounters {
    [stream: string]: {
        fetchedLast: number;
        fetchedBytesLast: number;
        fetchedBatchesLast: number;
        parseRequestedLast: number;
        parseRecievedLast: number;
        filterTotalLast: number;
        filterDiscardedLast: number;
        filterAcceptedLast: number;
    }
}