import React from 'react';

export class Player extends React.Component {
    render() {
        return (
            <div id="container">
                <div id="player">
                    <p>{this.props.d.title}</p>
                    <p>{this.props.d.position}/{this.props.d.duration}</p>
                </div>
            </div>
        )
    }
}