var modaln = document.getElementById('modalNoti');

fetch("http://localhost:8098/v1/pause/queue")
.then (async function(response) {
    if(response.status != 204) {
        var dj = await response.json();
        console.log("[queue] Queue API contains items, listing..")
    
        // divs
        const artistName = document.getElementById("upNextArtist");
        const songName = document.getElementById("upNextName");
    
        artistName.innerText = `${dj.items[0].artistName}`;
        songName.innerText = `${dj.items[0].songName}`;
    } else if (d.status == 204) document.getElementById("upNext").innerHTML = `Up next: No songs are queued! <a onclick="openQueueModal()" href="#">Queue a song!</a>`;
})

async function qASong() {
    const uri = document.getElementById("uri").value;
    if (!uri) {
        displayMessage("<p>Please enter a song link</p>", modaln);
        return;
    } else if(!uri.includes("open.spotify.com/track")) {
        displayMessage("<p>Please provide a valid Spotify song URL.",modaln)
        return;
    }

    fetch(`http://localhost:8098/v1/pause/queue?uri=${uri}`, {
        method: 'post'
    })
    .then(async function(response) {
        const data = await response.json();
        if(response.status == 200) {
            console.log('[queue] Received valid response from Queue API. Response: "' + data.message + '"')
            return displayMessage("<p>Added song to queue!</p>",modaln);
        } else {
            console.log(`Queue POST request failed with status code ` + response.status)
            displayMessage(data.message,modaln);
        } 
    })
}