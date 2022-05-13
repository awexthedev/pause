async function qASong() {
    const uri = document.getElementById("uri").value;
    if(!uri) return document.getElementById("modalNoti").innerHTML = `<p>Please enter a valid song link</p>`;
    if(!uri.includes("open.spotify.com/track")) return document.getElementById("modalNoti").innerHTML = `<p>Please provide a valid Spotify song URL</p>`;

    // if(pog == true) {
        fetch(`https://api.thatalex.dev/v0/web/spotify/queue?uri=${uri}`, {
            method: 'post'
        })
        .then(async function(response) {
            const data = await response.json();
            if(response.status == 200) {
                console.log('Received valid response from Queue API. Response: "' + data.message + '"')
                return document.getElementById("modalNoti").innerHTML = `<p>Added song to queue!</p>`
            } else {
                console.log(`Queue POST request failed with status code ` + response.status )
                return document.getElementById("modalNoti").innerHTML = `<p>${data.message}</p>`;
            } 
        })
    // }
}

async function fetchQueue() {
    const d = await fetch("https://api.thatalex.dev/v0/web/spotify/queue")
    if(d.status != 204) {
        dj = await d.json();
        console.log("Queue API contains items, listing..")

        // divs
        const artistName = document.getElementById("upNextArtist");
        const songName = document.getElementById("upNextName");

        artistName.innerText = `${dj.items[0].artistName}`;
        songName.innerText = `${dj.items[0].songName}`;
    } else if (d.status == 204) document.getElementById("upNext").innerHTML = `Up next: No songs are queued! <a onclick="openQueueModal()" href="#">Queue a song!</a>`;
}