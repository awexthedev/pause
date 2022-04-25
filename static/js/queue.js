async function qASong() {
    const uri = document.getElementById("uri").value;
    if(!uri) return document.getElementById("modalNoti").innerHTML = `<p>Please enter a valid song link</p>`;

    if(!uri.includes("open.spotify.com/track")) return document.getElementById("modalNoti").innerHTML = `<p>Please provide a valid Spotify song URL</p>`;

    const pog = await sendElectronMessage("q");

    if(pog == true) {
        fetch(`https://api.thatalex.dev/v0/web/spotify/change?uri=${uri}`)
        .then(async function(response) {
            console.log("Added song URI " + uri + " to the queue.")
            const data = await response.json();
            if(response.status == 200) return document.getElementById("modalNoti").innerHTML = `<p>Added song to queue!</p>`
            else return document.getElementById("modalNoti").innerHTML = `<p>${data.message}</p>`;
        })
    }
}

async function fetchQueue() {
    const d = await fetch("https://api.thatalex.dev/v0/web/spotify/queue")
    if(d.status != 204) {
        dj = await d.json();

        // divs
        const artistName = document.getElementById("upNextArtist");
        const songName = document.getElementById("upNextName");

        artistName.innerText = `${dj.items[0].artistName}`;
        songName.innerText = `${dj.items[0].songName}`;
    } else if (d.status == 204) document.getElementById("upNext").innerHTML = `Up next: No songs are queued! <a onclick="openQueueModal()" href="#">Queue a song!</a>`;
}