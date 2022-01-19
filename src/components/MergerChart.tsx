import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function MergerChart() {
    const store = useEventsStore();
    return(
        <div>
            Merger:
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
        </div>
    )
}

export default observer(MergerChart);