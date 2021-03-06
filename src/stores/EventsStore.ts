/** *****************************************************************************
 * Copyright 2020-2020 Exactpro (Exactpro Systems Limited)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************** */

import ChartData from "../models/ChartData";
import PipelineStatus from "../models/Event";
import ShowLines from "../models/ShowLines";
import Data from "../models/Data";
import { runInAction, makeObservable, observable } from "mobx";

class EventsStore {
    isLoading = true;
    chartData: ChartData = {};
    checkboxes: ShowLines = {};
    pipelineStatuses: PipelineStatus[] = [];
    streams: string[] = [];
    counters: string[] = [];

    constructor() {
        makeObservable(this, {
            pipelineStatuses: observable,
            chartData: observable,
            checkboxes: observable,
            isLoading: observable,
            streams: observable,
            counters: observable
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
            if (this.isLoading === true) {
                runInAction(() => {
                    this.streams = Object.keys(data.counters);
                    const streamExample = this.streams.pop();
                    if (streamExample) {
                        this.counters = Object.keys(data.counters[streamExample])
                        this.streams.push(streamExample);
                    }
                })
            }
            if (this.isLoading === true) {
                runInAction(() => {
                    this.streams.forEach(stream => {
                        this.chartData[stream] = {data: [], lastTimestamp: 0};
                        let cntrs : Data = {};
                        this.counters.forEach(counter => {
                            cntrs[counter] = 0;
                            this.checkboxes[counter] = true;
                        })
                        this.chartData[stream].data.push(cntrs);
                    })
                    this.isLoading = false;
                })
            } else {
                this.streams.forEach(stream => { 
                    if ((this.chartData[stream].lastTimestamp !== data.startTime) && (data.counters !== undefined)) {
                        if (this.chartData[stream].data.length > 10) {
                            runInAction(() => {
                                this.chartData[stream].data.shift();
                            })
                        }
                        runInAction(() => {
                                let cntrs: Data = {};
                                cntrs['processingTime'] = data.processingTime / 1000;
                                this.counters.forEach(counter => {
                                    cntrs[counter] = data.counters[stream][counter] / (data.processingTime / 1000)
                                })
                                this.chartData[stream].data.push(cntrs);
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