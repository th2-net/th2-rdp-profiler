import React from "react";
import { observer } from "mobx-react-lite"; 
import useEventsStore from "../hooks/useEventsStore";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    form: {
        marginTop: "30px",
        marginLeft: "30px"
    }
})

function Form() {
    const store = useEventsStore();
    const classes = useStyles();
    const pushBottom = () => {
        const input = document.querySelector('input');
        if (input?.value) { 
            store.getPipelineStatuses(input.value);
        } else {
            console.log('empty string');
        }
    }
    return(
        <div className={classes.form}>
            <input type="text" placeholder="enter link"/>
            <button onClick={() => pushBottom()}>Get</button>
        </div>
    )
}

export default observer(Form);