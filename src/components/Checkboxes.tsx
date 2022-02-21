import React from 'react';
import {observer} from 'mobx-react-lite'; 
import useEventsStore from '../hooks/useEventsStore';
import {createUseStyles} from "react-jss";
import { toJS } from 'mobx';

const useStyles = createUseStyles({
    checkboxes: {
        marginTop: "15px",
        marginLeft: "30px"
    }
})

function Checkboxes() {
    const store = useEventsStore();
    const classes = useStyles();
    const checkboxes = Object.keys(store.checkboxes);

    function ClickCheckbox(str: string) {
        const checkbox: HTMLInputElement | null = document.querySelector(`#${str}`);
        if (checkbox?.checked !== undefined) {
            store.showLine(str, checkbox.checked);
        }
    }

    // function PrintCheckbox(str: string) {
    //     return(
    //         <span>
    //             <input type="checkbox" name={str} id={str} defaultChecked={true} onClick={() => ClickCheckbox(str)}/> {str}
    //         </span>
    //     )
    // }
 
    return(
        <div className={classes.checkboxes}>
            Choose to show:
            <br/>
            {checkboxes.map((checkbox, ind) => 
                {
                    if (ind % 2 === 0) {
                        return(
                            <span>
                                <input type="checkbox" name={checkbox} id={checkbox} defaultChecked={true} onClick={() => ClickCheckbox(checkbox)}/> {checkbox}
                            </span>    
                        )
                    } else {
                        return(
                            <span>
                                <input type="checkbox" name={checkbox} id={checkbox} defaultChecked={true} onClick={() => ClickCheckbox(checkbox)}/> {checkbox}
                                <br />
                            </span>
                        )
                    }
                }
            )}
        </div>
    )
}

export default observer(Checkboxes);