import ChartData from "../models/ChartData";
import PipelineStatus from "../models/Event";
import ShowLines from "../models/ShowLines";
import { Merger } from "../models/ChartData";
import fetchEvents from "../api/fetchEvents";
import { runInAction, action, computed, makeObservable, observable } from "mobx";
import { strictEqual } from "assert";
import { store } from "..";

class EventsStore {
    isLoading = true;
    chartData: ChartData = {
        "test": [],
    };
    checkboxes: ShowLines = {
        fetchedRate: false,
        fetchedBytesRate: false,
        fetchedBatchesRate: false,
        parseRequestedRate: false,
        parseRecievedRate: false,
        filterTotalRate: false,
        filterDiscardedRate: false,
        filterAcceptedRate: false
    }
    merger: Merger[] = [];
    lastMerger: number = 0;
    pipelineStatuses: PipelineStatus[] = [];

    constructor() {
        makeObservable(this, {
            pipelineStatuses: observable,
            chartData: observable,
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
                            fetchedRate: 0,
                            fetchedBytesRate: 0,
                            fetchedBatchesRate: 0,
                            parseRequestedRate: 0,
                            parseReceivedRate: 0,
                            filterTotalRate: 0,
                            filterDiscardedRate: 0,
                            filterAcceptedRate: 0});
                    })
                    this.isLoading = false;
                })
            } else {
                streams.forEach(stream => { 
                    runInAction(() => {
                            this.chartData[stream].push(
                                {
                                    timeSinceStartProcessing: data.streams[stream].timeSinceStartProcessing / 1000,
                                    fetchedRate: data.streams[stream].counters.fetched / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    fetchedBytesRate: data.streams[stream].counters.fetchedBytes / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    fetchedBatchesRate: data.streams[stream].counters.fetchedBatches / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    parseRequestedRate: data.streams[stream].counters.parseRequested / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    parseReceivedRate: data.streams[stream].counters.parseReceived / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    filterTotalRate: data.streams[stream].counters.filterTotal / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    filterDiscardedRate: data.streams[stream].counters.filterDiscarded / (data.streams[stream].timeSinceStartProcessing / 1000),
                                    filterAcceptedRate: data.streams[stream].counters.filterAccepted / (data.streams[stream].timeSinceStartProcessing / 1000)
                                }
                            )
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
    showLine(str: string, fl: boolean) {
        runInAction(() => {
            this.checkboxes[str] = fl;
            
        })
        console.log(this.checkboxes[str]);
    }
}

export default EventsStore;