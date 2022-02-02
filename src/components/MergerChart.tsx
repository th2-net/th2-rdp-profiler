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