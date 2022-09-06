import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <h1>Pause!</h1>
                <p style={{ fontSize: "15px"}}><a href="https://github.com/zevhr/pause" target="_blank">Source Code on Github</a><br />
                    {/*<a href="/queue">Queue</a>*/} </p>
                <p style={{ fontSize: "30px" }} id="msg">Ever wanted to mess with someones music? Well, that's what this is for.<br />
                    <span style={{fontSize: "15px"}}>This site uses cookies to prevent spamming of my client :d</span></p>
                <hr width="50%" />
            </div>
        )
    }
}