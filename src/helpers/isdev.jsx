import React from 'react';
export function checkState() {
    if ('_self' in React.createElement('div')) return "development";
    else return "production";
}