import React from 'react';
import {checkState} from '../helpers/isdev';
import {socket} from '../helpers/socket';

let base_url=""
if (checkState() === "development") base_url="http://localhost:8098/v2/pause/"
else base_url = "https://api.zephmakes.tech/v2/pause/"

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
        return (
            <div id="container">
                <div id="player" className={"player"}>
                    <span className={"songinfo"}>
                        { this.state.d ? <img alt={"bad"} width={"150vw"} src={this.state.d.COVER} /> : <p>bad</p>}
                        { this.state.d ? <React.Fragment><p>{this.state.d.TITLE}<br />{this.state.d.ARTIST}</p><p>{this.state.d.POSITION} \\ {this.state.d.DURATION}</p></React.Fragment> : <p>Uh oh! Something went wrong.</p>}
                    </span>
                </div>
                <div style={{ paddingLeft: '30px' }} id="controls">
                    {/* indicators */}
                    <i id="repeat-icon"
                       className="fa fa-repeat"
                       style={ this.state.d && parseInt(this.state.d.REPEAT) !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
                       onClick={() => this.handleClicks("REPEAT")}
                       aria-hidden="true"
                    >
                    </i>
                    <i id="shuffle-icon"
                       className="fa fa-random"
                       style={ this.state.d && this.state.d.SHUFFLE !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
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
                       className={this.state.d && this.state.d.STATE === 1 ? "fa fa-pause" : "fa fa-play"}
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
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={this.state.d ? this.state.d.VOLUME : this.state.userSetVolume}
                        onChange={event => {
                            this.setState({ userSetVolume: event.target.valueAsNumber })
                            socket.emit("spotify", {"event":"event","value":"SETVOLUME","num":event.target.valueAsNumber})
                        }}
                    />
                    <input
                        type={"text"}
                        id={"textbox"}
                        required
                        placeholder={"your message here.."}
                        style={{ color:"black", paddingTop:"10px", width:"10vw", height:"3vh"}}
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