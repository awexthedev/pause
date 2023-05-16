import React, {useState,useEffect} from 'react';
import ReactDom from 'react-dom/client';

// styling
import './main.css'

function App() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center text-neutral-500">
                <h3 className="text-6xl block">pause</h3>
                <p className="mt-4 font-bold text-4xl pb-4">control my music with the click of a button, just because</p>
                <hr />
                <Player />
                <Footer />
            </div>
        </div>
    )
}

function Footer() {
    return (
        <div className="align-bottom text-center">
            <p>I use <a className="underline" href="https://music.apple.com" target="_blank" rel="noreferrer">Apple Music</a>, all content used here is licensed to them.</p>
            <p>Made by <a className="underline" href="https://thatalex.dev">Alex</a></p>
            <div className="socials py-4">
                <span className="px-2">
                    <a href="https://twitter.com/zstreamss" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-twitter" size="large"></ion-icon>
                    </a>
                </span>
                <span className="px-2">
                    <a href="mailto:hello@thatalex.dev" target="_blank" rel="noreferrer">
                        <ion-icon name="mail" size="large"></ion-icon>
                    </a>
                </span>
                <span className="px-2">
                    <a href="https://github.com/azpha/pause" target="_blank" rel="noreferrer">
                        <ion-icon name="logo-github" size="large"></ion-icon>
                    </a>
                </span>
            </div>
        </div>
    )
}

function Player() {
    const [lastResponse, setLastResponse] = useState(null);
    const [playPause, setPlayPause] = useState(false);

    useEffect(() => {
        fetch("https://api.thatalex.dev/v3/music/playing")
        .then(async (response) => {
            if (response.ok) {
                let json = await response.json()
                setLastResponse(json.data)

                // set playPause state
                setPlayPause(json.data.playbackStatus);
            }
        })
    }, []);

    const performAction = (action) => {
        fetch("https://api.thatalex.dev/v3/music/" + action, {
            method: 'post'
        }).then((response) => {
            if (response.ok) {
                if (action === "togglePlayback") setPlayPause(!playPause)
                else {
                    // need to timeout so the API has time to update
                    setTimeout(() => {
                        fetch("https://api.thatalex.dev/v3/music/playing")
                        .then(async (response) => {
                            if (response.ok) {
                                let json = await response.json()
                                setLastResponse(json.data)
                                if (json.data.playbackStatus !== playPause) setPlayPause(json.data.playbackStatus)
                            }
                        })
                    }, 1000)
                }
            }
        })
    }

    return (
        <div className="container">
            <div className="py-4 flex items-center justify-center">
                <div id="player" className="bg-white rounded-lg">
                    <div className="flex items-center">
                        <div className="text-center p-10 pb-5">
                            <h1 className="font-bold">{lastResponse ? lastResponse.title : "No title available"}</h1>
                            <p>{lastResponse ? lastResponse.author : "No artist available"}</p>
                        </div>
                    </div>
                    <div className="actionIcons">
                        <ion-icon name="play-back-outline" size="large" onClick={() => performAction('previous')}></ion-icon>
                        <ion-icon name={playPause ? "pause-outline" : "play-outline"} size="large" onClick={() => performAction('togglePlayback')}></ion-icon>
                        <ion-icon name="play-forward-outline" size="large" onClick={() => performAction('next')}></ion-icon>
                    </div>
                </div>
            </div>
        </div>
    )
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);