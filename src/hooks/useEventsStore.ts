import React from "react";
import EventsStore from "../stores/EventsStore";

export const EventsContext = React.createContext<EventsStore | null>(null);

const useEventsStore = () => {
    const store = React.useContext(EventsContext);

    if (!store) throw new Error("Error events fetching");

    return store;
}

export default useEventsStore;