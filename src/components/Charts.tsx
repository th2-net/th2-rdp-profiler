import React from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import Chart from './Chart';
import MergerChart from './MergerChart';
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
                {streams.map((stream) => <Chart stream={stream}/>)}
                {/* <MergerChart/> */}
            </div>
        )
    }
}

export default observer(Charts);