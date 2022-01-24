/* eslint-disable no-template-curly-in-string */
import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
        marginLeft: "200px",
        fontWeight: "bold"
    }
})

function Chart({stream}: Props) {
    const store = useEventsStore();
    const classes = useStyles();

    function PrintFetchedRateLine() {
        if (store.checkboxes["fetchedRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="fetchedRate"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }

    function PrintFetchedBytesRateLine() {
        if (store.checkboxes["fetchedBytesRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="fetchedBytesRate"
                stroke="#ff9900"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }

    function PrintFetchedBatchesRateLine() {
        if (store.checkboxes["fetchedBatchesRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="fetchedBatchesRate"
                stroke="#ff00cc"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }

    function PrintParseRequestedRateLine() {
        if (store.checkboxes["parseRequestedRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="parseRequestedRate"
                stroke="#f44336"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }

    function PrintParseRecievedRateLine() {
        if (store.checkboxes["parseRecievedRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="parseRecievedRate"
                stroke="#2986cc"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }
    
    function PrintFilterTotalRateLine() {
        if (store.checkboxes["filterTotalRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="filterTotalRate"
                stroke="#6aa84f"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }

    function PrintFilterDiscardedRateLine() {
        if (store.checkboxes["filterDiscardedRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="filterDiscardedRate"
                stroke="#b45f06"
                activeDot={{ r: 8 }}
                isAnimationActive={false}
                />
            )
        }
    }

    function PrintFilterAcceptedRateLine() {
        if (store.checkboxes["filterAcceptedRate"] === false) {
            return(
                <Line 
                type="monotone"
                dataKey="filterAcceptedRate"
                stroke="#5b5b5b"
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
                <span className={classes.name}>{stream}:</span>
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
                    {PrintFetchedRateLine()}
                    {PrintFetchedBytesRateLine()}
                    {PrintFetchedBatchesRateLine()}
                    {PrintParseRequestedRateLine()}
                    {PrintParseRecievedRateLine()}
                    {PrintFilterTotalRateLine()}
                    {PrintFilterDiscardedRateLine()}
                    {PrintFilterAcceptedRateLine()}   
                </LineChart>
            </div>
        )
    } else {
        return(<div></div>)
    }
}

export default observer(Chart);