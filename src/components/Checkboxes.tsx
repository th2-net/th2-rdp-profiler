/** *****************************************************************************
 * Copyright 2020-2020 Exactpro (Exactpro Systems Limited)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************** */

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