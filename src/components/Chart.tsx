import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

type Props = {
    stream: string;
}
function Chart({stream}: Props) {
    const store = useEventsStore();

    function PrintLines() {
        return(
            <Line 
                type="monotone"
                dataKey="filterAcceptedDiff"
                stroke="#5b5b5b"
                activeDot={{ r: 8 }}
            />
        )
    }
    if (stream !== "test") {
        return(
            <div>
                <br/>
                {stream}:
                <br/>
                <LineChart 
                    width={500}
                    height={300}
                    data={store.chartData[stream].slice()}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timeSinceStartProcessing" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone"
                        dataKey="fetchedRate"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="fetchedBytesRate"
                        stroke="#ff9900"
                        activeDot={{ r: 8 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="fetchedBatchesRate"
                        stroke="#ff00cc"
                        activeDot={{ r: 8 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="parseRequestedRate"
                        stroke="#f44336"
                        activeDot={{ r: 8 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="parseRecievedRate"
                        stroke="#2986cc"
                        activeDot={{ r: 8 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="filterTotalRate"
                        stroke="#6aa84f"
                        activeDot={{ r: 8 }}
                    />
                    <Line 
                        type="monotone"
                        dataKey="filterDiscardedRate"
                        stroke="#b45f06"
                        activeDot={{ r: 8 }}
                    />
                    {PrintLines()}   
                </LineChart>
            </div>
        )
    } else {
        return(<div></div>)
    }
}

export default observer(Chart);