import React from 'react';

export class Footer extends React.Component {
    render() {
        return (
            <div id={"footer"}>
                <p>Pause! by <a href={"https://github.com/zevhr/pause"} target={"_blank"} rel={"noreferrer"}>Alex</a></p>
                <div className={"footeritems"}>
                    <a href={"https://twitter.com/zstreamss"} target={"_blank"} rel={"noreferrer"}>
                        <i className="fa fa-twitter-square" aria-hidden="true"></i>
                    </a>
                    <a href={"https://github.com/zevhr"} target={"_blank"} rel={"noreferrer"}>
                        <i className="fa fa-github-square" aria-hidden="true"></i>
                    </a>
                    <a href={"mailto:hi@thatalex.dev"} target={"_blank"} rel={"noreferrer"}>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        )
    }
}