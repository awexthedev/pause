import React from 'react';
import ReactDom from 'react-dom';

// components
import { Header } from './components/Header'
import { Player, PlayerControls } from './components/Player'
import { Footer } from './components/Footer'

// services
import { socket } from './services/socket'

// styling
import './main.css'

function App() {
    const [response, setResponse] = React.useState("")

    React.useEffect(() => {
        socket.on('connect', () => {
            socket.emit("spotify_status", "listen");
            socket.on("api_update", async (message) => {
                await setResponse(message)
            })
        })
    })

    return (
        <div>
            <Header />
            <Player d={response} />
            <PlayerControls d={response} active={ response ? "true" : "false" } />
            <hr width={"50%"} />
            <Footer />
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("root"))