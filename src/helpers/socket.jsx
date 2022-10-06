import io from 'socket.io-client';
import {checkState} from "./isdev";

export let socket = io ("https://api.zephmakes.tech");

// if (checkState() === "development") socket = io("http://localhost:9800")
// else socket = io ("https://api.zephmakes.tech");