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
        parsePreparedRate: true,
        parseRequestedRate: true,
        parseRecievedTotalRate: true,
        parseRecievedFailedRate: true,
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
            const streams = Object.keys(data.counters); 
            if (this.isLoading === true) {
                runInAction(() => {
                    streams.forEach(stream => {
                        this.chartData[stream] = {data: [], lastTimestamp: 0};
                        this.chartData[stream].data.push(
                            {processingTime: 0,
                            fetchedRate: 0,
                            fetchedBytesRate: 0,
                            fetchedBatchesRate: 0,
                            parsePreparedRate: 0,
                            parseRequestedRate: 0,
                            parseReceivedTotalRate: 0,
                            parseReceivedFailedRate: 0,
                            filterTotalRate: 0,
                            filterDiscardedRate: 0,
                            filterAcceptedRate: 0});
                    })
                    this.isLoading = false;
                })
            } else {
                streams.forEach(stream => { 
                    if (this.chartData[stream].lastTimestamp !== data.startTime) {
                        if (this.chartData[stream].data.length > 10) {
                            runInAction(() => {
                                this.chartData[stream].data.shift();
                            })
                        }
                        runInAction(() => {
                                this.chartData[stream].data.push(
                                    {
                                        processingTime: data.processingTime / 1000,
                                        fetchedRate: data.counters[stream].fetched / (data.processingTime / 1000),
                                        fetchedBytesRate: data.counters[stream].fetchedBytes / (data.processingTime / 1000),
                                        fetchedBatchesRate: data.counters[stream].fetchedBatches / (data.processingTime / 1000),
                                        parsePreparedRate: data.counters[stream].parsePrepared / (data.processingTime / 1000),
                                        parseRequestedRate: data.counters[stream].parseRequested / (data.processingTime / 1000),
                                        parseReceivedTotalRate: data.counters[stream].parseReceivedTotal / (data.processingTime / 1000),
                                        parseReceivedFailedRate: data.counters[stream].parseReceivedFailed / (data.processingTime / 1000),
                                        filterTotalRate: data.counters[stream].filterTotal / (data.processingTime / 1000),
                                        filterDiscardedRate: data.counters[stream].filterDiscarded / (data.processingTime / 1000),
                                        filterAcceptedRate: data.counters[stream].filterAccepted / (data.processingTime / 1000)
                                    }
                                )
                                this.chartData[stream].lastTimestamp = data.processingTime;
                            }
                        )
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