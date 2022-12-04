import React from 'react';
import io from 'socket.io-client';

export let socket = (checkState() === "development" ? io("http://localhost:9800") : io("https://api.zephmakes.tech"));
export function checkState() {
    if ('_self' in React.createElement('div')) return "development";
    else return "production";
}