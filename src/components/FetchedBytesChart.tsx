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
/* eslint-disable no-template-curly-in-string */

import React from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {createUseStyles} from "react-jss";

type Props = {
    stream: string;
}

const useStyles = createUseStyles({
    chart: {
        marginTop: "5px"
    },
    name: {
        marginTop: "20px",
        textAlign: "center",
        fontWeight: "bold"
    }
})



function FetchedBytesChart({stream}: Props) {
    const store = useEventsStore();
    const classes = useStyles();
    const counters = Object.keys(store.checkboxes);

    function PrintRateLine(rate: string, color: string) {
        if (store.checkboxes[rate] === true) {
            return(
                <Line 
                type="monotone"
                dataKey={rate}
                stroke={color}
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }
    if (store.checkboxes["fetchedBytes"] === true) {
        return(
            <div>
                    <br/>
                    <div className={classes.name}>Fetched Bytes {stream}:</div>
                    <br/>
                    <ResponsiveContainer width="95%" height={400}>
                        <LineChart 
                            data={store.chartData[stream].data.slice()}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="processingTime" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                                type="monotone"
                                dataKey="fetchedBytes"
                                stroke="#ff0000"
                                activeDot={{ r: 8 }}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
        )
    } else {
        return(
            <div></div>
        )
    }
    
}

export default observer(FetchedBytesChart);