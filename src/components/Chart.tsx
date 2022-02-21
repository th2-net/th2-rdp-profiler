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

const colors : string[] = ["#8884d8", "#ff9900", "#ff00cc", "#008b8b", "#f44336", "#2986cc", "#ffa07a",  "#6aa84f", "#b45f06", "#5b5b5b", "#ff83cc", "#5f5f5f", "#fff434", "#6bf42c", "#f42c65", "#9e5f4c", "#31406e", "#1f0f5e", "#00755a", "#677520", "#054016", "#572731", "#ad7a2d", "#85cc39", "#0095ff", "#50249c", "#008761", "#55236e", "#5c2200", "#5c6647", "#2f7039", "#3c7e8c", "#1c005e", "#407363", "#7a38ff", "#183823", "#5f5199"];

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

function Chart({stream}: Props) {
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
    return(
        <div>
                <br/>
                <div className={classes.name}>{stream}:</div>
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
                        {counters.map((counter, index) => {
                            if (store.checkboxes[counter] === true) {
                                return(
                                    <Line 
                                    type="monotone"
                                    dataKey={counter}
                                    stroke={colors[index]}
                                    activeDot={{ r: 8 }}
                                    isAnimationActive={false}
                                    />
                                )
                            }
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </div>
    )
}

export default observer(Chart);