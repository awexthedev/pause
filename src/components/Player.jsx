import React from 'react';
let base_url = "https://api.zephmakes.tech/v1/pause/"

export class Player extends React.Component {
    render() {
        return (
            <div id="container">
                <div className={"player"}>
                    <span className={"player songinfo"}>
                        { this.props.d ? <img alt={"bad"} width={"150vw"} src={this.props.d.artist.cover} /> : <p>bad</p>}
                        { this.props.d ? <React.Fragment><p>{this.props.d.artist.title}</p><p>{this.props.d.position} \\ {this.props.d.artist.duration}</p></React.Fragment> : <p>Uh oh! Something went wrong.</p>}
                    </span>
                </div>
            </div>
        )
    }
}

export class PlayerControls extends React.Component {
    state = {
        "shuffle": this.props.d.shuffle,
        "repeat": this.props.d.repeat,
        "volume": this.props.d.volume,
        "playState": this.props.d.state
    }

    handleClicks(i) {
        let actions = {
            "play": {
                "path": "player?action=play",
                "method": "post"
            },
            "pause": {
                "path": "player?action=pause",
                "method": "post"
            },
            "skipForward": {
                "path": "player?action=skipForward",
                "method": "post"
            },
            "skipBackward": {
                "path": "player?action=skipBackward",
                "method": "post"
            },
            "volume": {
                "path": "player?action=volume",
                "method": "post",
                "expectedQueryValue": "volume_percent"
            },
            "repeat": {
                "path": "player?action=repeat",
                "method": "post"
            },
            "shuffle": {
                "path": "player?action=shuffle",
                "method": "post"
            }
        }

        if (this.props.d) {
            console.log(`[Controller] Received '${i}' event, executing`)

            fetch(base_url + actions[i].path, {
                method: actions[i].method
            })
                .then(function(response) {
                    if (response.ok) console.log("[Controller] Event succeeded!")
                    else console.log("[Controller] Received status code " + response.status + " when querying backend, unsure if request succeeded?")
                })
                .catch(function(err) {
                    console.log("[Controller] Something went terribly wrong. Status code " + err.status + " returned from backend.")
                })
        } else console.log(`[Controller] No socket event is stored, aborting click event`)
    }

    render() {
        return (
            <div id="container">
                <div style={{ paddingLeft: '10px' }} id="controls">
                    {/* indicators */}
                    <i id="repeat-icon"
                       className="fa fa-repeat"
                       style={ this.props.d && parseInt(this.props.d.artist.repeat) !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
                       onClick={() => this.handleClicks("repeat")}
                       aria-hidden="true"
                    >
                    </i>
                    <i id="shuffle-icon"
                       className="fa fa-random"
                       style={ this.props.d && parseInt(this.props.d.artist.shuffle) !== 0 ? this.style = { color: 'green', paddingRight: '5px' } : this.style = { color: 'white', paddingRight: '5px' } }
                       aria-hidden="true"
                       onClick={() => this.handleClicks("shuffle")}
                    >
                    </i>
                </div>
            </div>
        )
    }
}