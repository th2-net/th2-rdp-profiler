import ChartData from "../models/ChartData";
import PipelineStatus from "../models/Event";
import ShowLines from "../models/ShowLines";
import { Merger } from "../models/ChartData";
import { runInAction, makeObservable, observable } from "mobx";

class EventsStore {
    isLoading = true;
    chartData: ChartData = {
        "test": {
            data: [],
        }
    };
    checkboxes: ShowLines = {
        fetchedRate: true,
        fetchedBytesRate: true,
        fetchedBatchesRate: true,
        parseRequestedRate: true,
        parseRecievedRate: true,
        filterTotalRate: true,
        filterDiscardedRate: true,
        filterAcceptedRate: true
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
        const button = document.querySelector('button');
        runInAction(() => {
            this.isLoading = true;
            const streams = Object.keys(this.chartData);
            streams.forEach(stream => {
                delete this.chartData[stream];
            })
            this.merger = [];
            this.lastMerger = 0;
        })
        const eventSource = new EventSource(link);
    
        const input = document.querySelector('input');
        let style = document.createElement('style');
        style.innerHTML = '.error { background-color: #fa8072; }';
        input?.appendChild(style);

        eventSource.onerror = () => {            
            input?.classList.add('error');
        }

        eventSource.addEventListener("pipeline_status", event => {
            input?.classList.remove('error');
            const messageEvent = (event as MessageEvent);
            const data: PipelineStatus = JSON.parse(messageEvent.data);
            const streams = Object.keys(data.streams); 
            if (this.isLoading === true) {
                runInAction(() => {
                    streams.forEach(stream => {
                        this.chartData[stream] = {data: [], lastTimestamp: 0};
                        this.chartData[stream].data.push(
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
                    if (this.chartData[stream].lastTimestamp !== data.streams[stream].timeSinceStartProcessing) {
                        if (this.chartData[stream].data.length > 10) {
                            runInAction(() => {
                                this.chartData[stream].data.shift();
                            })
                        }
                        runInAction(() => {
                                this.chartData[stream].data.push(
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
                                this.chartData[stream].lastTimestamp = data.streams[stream].timeSinceStartProcessing;
                            }
                        )
                    }
                })
                runInAction(() => {
                    this.merger.push({id: +messageEvent.lastEventId, merger: data.merger - this.lastMerger});
                    this.lastMerger = data.merger;
                    if (this.merger.length > 10) {
                        this.merger.shift();
                    }
                })
            }
        })
        eventSource.addEventListener("close", event => {
            eventSource.close();
        })
        if (button?.onclick) {
            button.onclick = function () {
                eventSource.close();
            }
        }
    }
    showLine(str: string, fl: boolean) {
        runInAction(() => {
            this.checkboxes[str] = fl;
        })
    }
}

export default EventsStore;