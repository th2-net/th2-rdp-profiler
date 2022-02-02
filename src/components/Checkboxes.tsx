import React from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    checkboxes: {
        marginTop: "15px",
        marginLeft: "30px"
    }
})

function Checkboxes() {
    const store = useEventsStore();
    const classes = useStyles();
        
    function ClickCheckbox(str: string) {
        const checkbox: HTMLInputElement | null = document.querySelector(`#${str}`);
        if (checkbox?.checked !== undefined) {
            store.showLine(str, checkbox.checked);
        }
    }

    return(
        <div className={classes.checkboxes}>
            Choose to show:
            <br/>
            <input type="checkbox" name="fetchedRate" id="fetchedRate" defaultChecked={true} onClick={() => ClickCheckbox("fetchedRate")}/> fetchedRate
            <input type="checkbox" name="fetchedBytesRate" id="fetchedBytesRate" defaultChecked={true} onClick={() => ClickCheckbox("fetchedBytesRate")} /> fetchedBytesRate
            <input type="checkbox" name="fetchedBatchesRate" id="fetchedBatchesRate" defaultChecked={true} onClick={() => ClickCheckbox("fetchedBatchesRate")} /> fetchedBatchesRate
            <input type="checkbox" name="parseRequestedRate" id="parseRequestedRate" defaultChecked={true} onClick={() => ClickCheckbox("parseRequestedRate")} /> parseRequestedRate
            <br/>
            <input type="checkbox" name="parseRecievedRate" id="parseRecievedRate" defaultChecked={true} onClick={() => ClickCheckbox("parseRecievedRate")} /> parseRecievedRate
            <input type="checkbox" name="filterTotalRate" id="filterTotalRate" defaultChecked={true} onClick={() => ClickCheckbox("filterTotalRate")} /> filterTotalRate
            <input type="checkbox" name="filterDiscardedRate" id="filterDiscardedRate" defaultChecked={true} onClick={() => ClickCheckbox("filterDiscardedRate")} /> filterDiscardedRate
            <input type="checkbox" name="filterAcceptedRate" id="filterAcceptedRate" defaultChecked={true} onClick={() => ClickCheckbox("filterAcceptedRate")} /> filterAcceptedRate
        </div>
    )
}

export default observer(Checkboxes);