import React from 'react';
import {socket} from "./Helpers";

export class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <h1>Pause!</h1>
                <p style={{ fontSize: "15px"}}><a href="https://github.com/azpha/pause" target="_blank" rel={"noreferrer"}>Source Code on Github</a></p>
                <p style={{ fontSize: "30px" }} id="msg">Ever wanted to mess with someones music? Well, that's what this is for.</p>
                <hr width="50%" />
            </div>
        )
    }
}

export class Footer extends React.Component {
    render() {
        return (
            <div id={"footer"}>
                <p>Pause! by <a href={"https://github.com/azpha/pause"} target={"_blank"} rel={"noreferrer"}>Alex</a></p>
                <div className={"footeritems"}>
                    <a href={"https://twitter.com/zstreamss"} target={"_blank"} rel={"noreferrer"}>
                        <i className="fa-brands fa-square-twitter" aria-hidden="true"></i>
                    </a>
                    <a href={"https://github.com/azpha"} target={"_blank"} rel={"noreferrer"}>
                        <i className="fa-brands fa-square-github" aria-hidden="true"></i>
                    </a>
                    <a href={"mailto:hi@thatalex.dev"} target={"_blank"} rel={"noreferrer"}>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        )
    }
}

export class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            d: null,
            userSetVolume: null
        }

        socket.emit("spotify", {"event":"listen"});
        socket.on("api_update", async (message) => {
            if (message) await this.setState({ d: message })
        })
    }

    async handleClicks(i) {
        if (this.state.d) {
            console.log(`[Controller] Received '${i}' event, executing`)
            socket.emit("spotify", {"event":"event","value":i});
        } else console.log(`[Controller] No socket event is stored, aborting click event`)
    }

    render() {
        if (!this.state.d) return (
            <div id={"container"}>
                <span className={"songinfo"}>
                    <p>No cover</p>
                    <p>No song was returned -- Spotify is likely inactive.</p>
                </span>
            </div>
        )

        return (
            <div id="container">
                {/* actual player */}
                <div id="player" className={"player"}>
                    <span className={"songinfo"}>
                        <img alt={"bad"} width={"150vw"} src={this.state.d.COVER} />
                        <p>
                            <a
                                href={`https://open.spotify.com/track/${this.state.d.TRACK_URI.split(":")[2]}`}
                                rel={"noreferrer"}
                                target={"_blank"}
                            >
                                {this.state.d.TITLE}
                            </a>
                            <br />
                            <a
                                href={`https://open.spotify.com/artist/${this.state.d.ARTIST_URI.split(":")[2]}`}
                                rel={"noreferrer"}
                                target={"_blank"}
                            >
                                {this.state.d.ARTIST}
                            </a>
                        </p><p>{this.state.d.POSITION} \\ {this.state.d.DURATION}</p>
                        <p>Volume; {this.state.d.VOLUME}%</p>
                    </span>
                </div>
                <div id="controls">
                    {/* indicators */}
                    <i id="repeat-icon"
                       className="fa-solid fa-repeat"
                       style={ this.state.d && parseInt(this.state.d.REPEAT) !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
                       onClick={() => this.handleClicks("REPEAT")}
                       aria-hidden="true"
                    >
                    </i>
                    <i id="shuffle-icon"
                       className="fa fa-random"
                       style={ this.state.d.SHUFFLE !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
                       aria-hidden="true"
                       onClick={() => this.handleClicks("SHUFFLE")}
                    >
                    </i>
                    <br />
                    <i id="skip-backwards"
                       className={"fa fa-step-backward"}
                       style={{ color: "white", paddingRight: '10px' }}
                       aria-hidden={"true"}
                       onClick={() => this.handleClicks("PREVIOUS")}
                    >
                    </i>
                    <i id="play-pause"
                       className={this.state.d.STATE === 1 ? "fa fa-pause" : "fa fa-play"}
                       style={{ color: "white", paddingRight: '10px' }}
                       aria-hidden={"true"}
                       onClick={() => {this.handleClicks("PLAYPAUSE")}}
                    >
                    </i>
                    <i id="skip-forwards"
                       className={"fa fa-step-forward"}
                       style={{ color: "white", paddingRight: '5px' }}
                       aria-hidden={"true"}
                       onClick={() => this.handleClicks("NEXT")}
                    >
                    </i>

                    <input
                        id={"volume-slider"}
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={this.state.d.VOLUME ? this.state.d.VOLUME : this.state.userSetVolume}
                        onChange={event => {
                            this.setState({ userSetVolume: event.target.valueAsNumber })
                            socket.emit("spotify", {"event":"event","value":"SETVOLUME","num":event.target.valueAsNumber})
                        }}
                    />
                    <br />
                    <input
                        type={"text"}
                        id={"textbox"}
                        required
                        placeholder={"your message here.."}
                        style={{ paddingTop:"10px", height:"3vh"}}
                    />
                    <br />
                    <button
                        type={"button"}
                        onClick={() => {
                            if (document.getElementById("textbox").value) socket.emit("spotify", {"event":"event","value":"NOTIFICATION","notification":document.getElementById("textbox").value})
                        }}
                    >Submit</button>
                </div>
            </div>
        )
    }
}