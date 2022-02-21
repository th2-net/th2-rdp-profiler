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
import Form from "./components/Form";
import Charts from "./components/Charts"; 
import {observer} from "mobx-react-lite";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  '@global': {
    boxSizing: "border-box",
    body: {
      fontFamily: "sans-serif",
      margin: "0px",
      padding: "0px"
    }
  }
})
function App() { 
  const classes = useStyles(); 
  return (
    <div>
      <Form />
      <Charts />
    </div>
  );
}

export default observer(App);
