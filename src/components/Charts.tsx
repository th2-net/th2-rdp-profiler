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
import React from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import Chart from './Chart';
import FetchedBytesChart from './FetchedBytesChart';
import Checkboxes from "./Checkboxes";

function Charts() {
    const store = useEventsStore();
    const streams = Object.keys(store.chartData);        
    if (store.isLoading === true) {
        return(
            <div></div>
        )
    } else {
        return(
            <div>
                <Checkboxes />
                {streams.map((stream) => <FetchedBytesChart stream={stream}/>)}
                {streams.map((stream) => <Chart stream={stream}/>)} 
            </div>
        )
    }
}

export default observer(Charts);