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
            <input type="text" placeholder="enter link" id="link_input"/>
            <button onClick={() => pushBottom()}>Get</button>
        </div>
    )
}

export default observer(Form);