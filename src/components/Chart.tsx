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

function Chart({stream}: Props) {
    const store = useEventsStore();
    const classes = useStyles();


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
    
    if (stream !== "test") {
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
                        {PrintRateLine("fetchedRate", "#8884d8")}
                        {PrintRateLine("fetchedBytesRate", "#ff9900")}
                        {PrintRateLine("fetchedBatchesRate", "#ff00cc")}
                        {PrintRateLine("parsePreparedRate", "#008b8b")}
                        {PrintRateLine("parseRequestedRate", "#f44336")}
                        {PrintRateLine("parseRecievedTotalRate", "#2986cc")}
                        {PrintRateLine("parseRecievedFailedRate", "#ffa07a")}
                        {PrintRateLine("filterTotalRate", "#6aa84f")}
                        {PrintRateLine("filterDiscardedRate", "#b45f06")}
                        {PrintRateLine("filterAcceptedRate", "#5b5b5b")}
                    </LineChart>
                </ResponsiveContainer>
                
            </div>
        )
    } else {
        return(<div></div>)
    }
}

export default observer(Chart);