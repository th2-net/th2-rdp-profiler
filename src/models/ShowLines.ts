export default interface ShowLines {
    fetchedDiff: boolean;
    fetchedBytesDiff: boolean;
    fetchedBatchesDiff: boolean;
    parseRequestedDiff: boolean;
    parseRecievedDiff: boolean;
    filterTotalDiff: boolean;
    filterDiscardedDiff: boolean;
    filterAcceptedDiff: boolean;
    [attr: string]: boolean;
}