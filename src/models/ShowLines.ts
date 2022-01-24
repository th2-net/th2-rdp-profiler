export default interface ShowLines {
    fetchedRate: boolean;
    fetchedBytesRate: boolean;
    fetchedBatchesRate: boolean;
    parseRequestedRate: boolean;
    parseRecievedRate: boolean;
    filterTotalRate: boolean;
    filterDiscardedRate: boolean;
    filterAcceptedRate: boolean;
    [attr: string]: boolean;
}