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
