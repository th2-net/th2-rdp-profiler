import { arrayExtensions } from "mobx/dist/internal";
import PipelineStatus from "../models/Event";
import useEventsStore from "../hooks/useEventsStore";


const fetchEvents = {
    getPipelineStatuses: async(link: string): Promise<PipelineStatus[]> => {
        // const store = useEventsStore();
        const eventSource = new EventSource(link);
        eventSource.addEventListener("keep_alive", event => {
            const messageEvent = (event as MessageEvent);
            const data = JSON.parse(messageEvent.data);
            console.log(data);
        })
        return [];
    }
}

export default fetchEvents;

// getEvents: async(link: string): Promise<Uint8Array[]> => {
//     const response = await fetch(link);
//     const reader = response.body?.getReader();
//     let array: Uint8Array[] = [];
//     if (reader) {
//         while (true) {
//             const {done, value} = await reader.read();
//             if (done) {
//                 break;
//             }
//             console.log(value);
//             if (value) {
//                 array.push(value);
//             }
//             if (done) {
//                 break;
//             }
//         }
//     }
//     return array;
// }

// getEvents: async(link: string): Promise<Event[]> => {
    //     const response = await fetch(link);
    //     if (response.ok) {
    //         return await response.json();
    //     } else {
    //         throw new Error("Server error");
    //     }    
    // },

// const reader = response.body?.getReader();
        // if (reader !== undefined) {
        //     while (true) {
        //         const {done, value} = await reader.read();
        //         if (done) {
        //             break;
        //         }
        //         console.log(value);
        //     }  
        // }

// const fetchEvents = {
//     getEvents: setInterval(async(link: string): Promise<Event[]> => {
//         const response = await fetch(link);
//         const json = await response.json();
//         console.log(json);
//         return json;
//     }, 3000)
// }

//
// const fetch = require("node-fetch");
// let i = 0, times = 5;
// const interval = setInterval(async () => {
//     if (++i < times) clearInterval(interval);
//     const response = await fetch("https://api.binance.com/api/v3/avgPricesymbol=ETHBTC");
//     const json = await response.json();
//     console.log(json);
// },3000);


// fetch(url)
//     .then(response => response.body)
//     .then(res => res.on('readable', () => {
//     let chunk;
//     while (null !== (chunk = res.read())) {
//         console.log(chunk.toString());
//     }
// }))
// .catch(err => console.log(err));