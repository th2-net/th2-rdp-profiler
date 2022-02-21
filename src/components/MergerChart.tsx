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
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {createUseStyles} from "react-jss";

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

function MergerChart() {
    const store = useEventsStore();
    const classes = useStyles();

    return(
        <div className={classes.chart}>
            <br/>
            <div className={classes.name}>Merger:</div>
            <br/>
            <ResponsiveContainer width="95%" height={400}>
                <LineChart 
                    width={500}
                    height={300}
                    data={store.merger.slice()}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone"
                        dataKey="merger"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
            
        </div>
    )
}

export default observer(MergerChart);