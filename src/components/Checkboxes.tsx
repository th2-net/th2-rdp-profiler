import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';

function Checkboxes() {
    const store = useEventsStore();
    // fetched: number;
    //     fetchedBytes: number;
    //     fetchedBatches: number;
    //     parseRequested: number;
    //     parseRecieved: number;
    //     filterTotal: number;
    //     filterDiscarded: number;
    //     filterAccepted: number;
    function ClickCheckbox(str: string) {
        console.log(str);
        const checkbox: HTMLInputElement | null = document.querySelector(`#${str}`);
        // if (checkbox?.checked === true) {
        //     store.
        // } else {

        // }
    }

    return(
        <div>
            <input type="checkbox" name="fetchedDiff" id="fetchedDiff" onClick={() => ClickCheckbox("fetchedDiff")}/> fetchedDiff
            <input type="checkbox" name="fetchedBytesDiff" id="fetchedBytesDiff" onClick={() => ClickCheckbox("fetchedBytesDiff")} /> fetchedBytesDiff
            <input type="checkbox" name="fetchedBatchesDiff" id="fetchedBatchesDiff" onClick={() => ClickCheckbox("fetchedBatchesDiff")} /> fetchedBatchesDiff
            <input type="checkbox" name="parseRequestedDiff" id="parseRequestedDiff" onClick={() => ClickCheckbox("parseRequestedDiff")} /> parseRequestedDiff
            <br/>
            <input type="checkbox" name="parseRecievedDiff" id="parseRecievedDiff" onClick={() => ClickCheckbox("parseRecievedDiff")} /> parseRecievedDiff
            <input type="checkbox" name="filterTotalDiff" id="filterTotalDiff" onClick={() => ClickCheckbox("filterTotalDiff")} /> filterTotalDiff
            <input type="checkbox" name="filterDiscardedDiff" id="filterDiscardedDiff" onClick={() => ClickCheckbox("filterDiscardedDiff")} /> filterDiscardedDiff
            <input type="checkbox" name="filterAcceptedDiff" id="filterAcceptedDiff" onClick={() => ClickCheckbox("filterAcceptedDiff")} /> filterAcceptedDiff
        </div>
    )
}

export default observer(Checkboxes);