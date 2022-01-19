// import KeepAlive from "../models/Event";
import ChartData from "../models/ChartData";
import PipelineStatus from "../models/Event";
import ShowLines from "../models/ShowLines";
import { Merger } from "../models/ChartData";
import LastCounters from "../models/LastCounters";
import fetchEvents from "../api/fetchEvents";
import { runInAction, action, computed, makeObservable, observable } from "mobx";
import { strictEqual } from "assert";
import { store } from "..";

class EventsStore {
    isLoading = true;
    chartData: ChartData = {
        "test": [],
    };
    lastCounters: LastCounters = {
        "test": {
            fetchedLast: 0,
            fetchedBytesLast: 0,
            fetchedBatchesLast: 0,
            parseRequestedLast: 0,
            parseRecievedLast: 0,
            filterTotalLast: 0,
            filterDiscardedLast: 0,
            filterAcceptedLast: 0,
        }
    }
    checkboxes: ShowLines = {
        fetchedDiff: true,
        fetchedBytesDiff: true,
        fetchedBatchesDiff: true,
        parseRequestedDiff: true,
        parseRecievedDiff: true,
        filterTotalDiff: true,
        filterDiscardedDiff: true,
        filterAcceptedDiff: true
    }
    merger: Merger[] = [];
    lastMerger: number = 0;
    pipelineStatuses: PipelineStatus[] = [];

    constructor() {
        makeObservable(this, {
            // keepAlives: observable,
            pipelineStatuses: observable,
            chartData: observable,
            lastCounters: observable,
            checkboxes: observable,
            merger: observable,
            lastMerger: observable,
            isLoading: observable,
        });
    }
    
    getPipelineStatuses = (link: string) => { 
        const eventSource = new EventSource(link);
        eventSource.addEventListener("pipeline_status", event => {
            const messageEvent = (event as MessageEvent);
            const data: PipelineStatus = JSON.parse(messageEvent.data);
            const streams = Object.keys(data.streams); 
            if (this.isLoading === true) {
                runInAction(() => {
                    streams.forEach(stream => {
                        this.chartData[stream] = [];
                        this.chartData[stream].push(
                            {timeSinceStartProcessing: 0,
                            fetchedDiff: 0,
                            fetchedBytesDiff: 0,
                            fetchedBatchesDiff: 0,
                            parseRequestedDiff: 0,
                            parseRecievedDiff: 0,
                            filterTotalDiff: 0,
                            filterDiscardedDiff: 0,
                            filterAcceptedDiff: 0});
                        this.lastCounters[stream] = {
                            fetchedLast: 0,
                            fetchedBytesLast: 0,
                            fetchedBatchesLast: 0,
                            parseRequestedLast: 0,
                            parseRecievedLast: 0,
                            filterTotalLast: 0,
                            filterDiscardedLast: 0,
                            filterAcceptedLast: 0,
                        }
                    })
                    this.isLoading = false;
                })
            } else {
                streams.forEach(stream => { 
                    runInAction(() => {
                            this.chartData[stream].push(
                                {
                                    timeSinceStartProcessing: data.streams[stream].timeSinceStartProcessing / 1000,
                                    fetchedDiff: data.streams[stream].counters.fetched - this.lastCounters[stream].fetchedLast,
                                    fetchedBytesDiff: data.streams[stream].counters.fetchedBytes - this.lastCounters[stream].fetchedBytesLast,
                                    fetchedBatchesDiff: data.streams[stream].counters.fetchedBatches - this.lastCounters[stream].fetchedBatchesLast,
                                    parseRequestedDiff: data.streams[stream].counters.parseRequested - this.lastCounters[stream].parseRequestedLast,
                                    parseRecievedDiff: data.streams[stream].counters.parseRecieved - this.lastCounters[stream].parseRecievedLast,
                                    filterTotalDiff: data.streams[stream].counters.filterTotal - this.lastCounters[stream].filterTotalLast,
                                    filterDiscardedDiff: data.streams[stream].counters.filterDiscarded - this.lastCounters[stream].filterDiscardedLast,
                                    filterAcceptedDiff: data.streams[stream].counters.filterAccepted - this.lastCounters[stream].filterAcceptedLast
                                }
                            )
                            this.lastCounters[stream] = {
                                fetchedLast: data.streams[stream].counters.fetched,
                                fetchedBytesLast: data.streams[stream].counters.fetchedBytes,
                                fetchedBatchesLast: data.streams[stream].counters.fetchedBatches,
                                parseRequestedLast: data.streams[stream].counters.parseRequested,
                                parseRecievedLast: data.streams[stream].counters.parseRecieved,
                                filterTotalLast: data.streams[stream].counters.filterTotal,
                                filterDiscardedLast: data.streams[stream].counters.filterDiscarded,
                                filterAcceptedLast: data.streams[stream].counters.filterAccepted,
                            }
                        }
                    )
                })
                runInAction(() => {
                    this.merger.push({id: +messageEvent.lastEventId, merger: data.merger - this.lastMerger});
                    this.lastMerger = data.merger;
                })
            }
        })
        eventSource.addEventListener("close", event => {
            eventSource.close();
        })
    }
    // showLine(str: string, fl: boolean) 
    //     if (fl) {
            
    //         runInAction(() => {
    //             this.checkboxes[] = true;
    //         })
    //     }
    // }
}

export default EventsStore;