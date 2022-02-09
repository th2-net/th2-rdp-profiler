export default interface ShowLines {
    fetchedRate: boolean;
    fetchedBytesRate: boolean;
    fetchedBatchesRate: boolean;
    parsePreparedRate: boolean;
    parseRequestedRate: boolean;
    parseRecievedTotalRate: boolean;
    parseRecievedFailedRate: boolean;
    filterTotalRate: boolean;
    filterDiscardedRate: boolean;
    filterAcceptedRate: boolean;
    [attr: string]: boolean;
}