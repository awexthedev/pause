import React from 'react';
import {checkState} from '../helpers/isdev';

let base_url=""
if (checkState() === "development") base_url="http://localhost:8098/v2/pause/"
else base_url = "https://api.zephmakes.tech/v2/pause/"

export class Player extends React.Component {
    render() {
        return (
            <div id="container">
                <div className={"player"}>
                    <span className={"songinfo"}>
                        { this.props.d ? <img alt={"bad"} width={"150vw"} src={this.props.d.COVER} /> : <p>bad</p>}
                        { this.props.d ? <React.Fragment><p>{this.props.d.TITLE}<br />{this.props.d.ARTIST}</p><p>{this.props.d.POSITION} \\ {this.props.d.DURATION}</p></React.Fragment> : <p>Uh oh! Something went wrong.</p>}
                    </span>
                </div>
            </div>
        )
    }
}

export class PlayerControls extends React.Component {
    state = {
        "shuffle": this.props.d.SHUFFLE,
        "repeat": this.props.d.REPEAT,
        "volume": this.props.d.VOLUME,
        "playState": this.props.d.STATE
    }

    handleClicks(i) {
        if (this.props.d) {
            console.log(`[Controller] Received '${i}' event, executing`)

            fetch(base_url + "player?action=" + i, {
                method: "post"
            })
                .then(function(response) {
                    if (response.ok) console.log("[Controller] Event succeeded!")
                    else console.log("[Controller] Received status code " + response.status + " when querying backend, unsure if request succeeded?")
                })
                .catch(function(err) {
                    console.log("[Controller] Something went terribly wrong. Status code " + err.status + " returned from backend.")
                })

            if (i === "PLAYPAUSE") {
                if (this.props.d.STATE === 1) this.props.d.STATE = 2
                else this.props.d.STATE = 1
            }
        } else console.log(`[Controller] No socket event is stored, aborting click event`)
    }

    render() {
        return (
            <div id="container">
                <div style={{ paddingLeft: '10px' }} id="controls">
                    {/* indicators */}
                    <i id="repeat-icon"
                       className="fa fa-repeat"
                       style={ this.props.d && parseInt(this.props.d.REPEAT) !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
                       onClick={() => this.handleClicks("REPEAT")}
                       aria-hidden="true"
                    >
                    </i>
                    <i id="shuffle-icon"
                       className="fa fa-random"
                       style={ this.props.d && this.props.d.SHUFFLE !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
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
                       className={this.props.d && this.props.d.STATE === 1 ? "fa fa-pause" : "fa fa-play"}
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
                </div>
            </div>
        )
    }
}