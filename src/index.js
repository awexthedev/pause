import React from 'react';
import ReactDom from 'react-dom/client';

// components
import {Header,Player,Footer} from './Components'

// styling
import './main.css'

function App() {
    return (
        <div>
            <Header />
            <Player />
            <hr width={"50%"} />
            <Footer />
        </div>
    )
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);