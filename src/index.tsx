import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';
import EventsStore from './stores/EventsStore';
import {EventsContext} from './hooks/useEventsStore';

export const store = new EventsStore();

ReactDOM.render(
  <React.StrictMode>
    <EventsContext.Provider value={store}>
      <App />
    </EventsContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

