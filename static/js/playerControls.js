// Skipping x Reversing
async function skipSong() {
    const message = document.getElementById("messageContent").value;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    if (message) await sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    const data = await fetch(`https://api.thatalex.dev/v0/web/spotify/player?action=skipForward`).then(response => response.json());
    if(data.status == 200) { return document.getElementById("noti").innerHTML = `<p>Skipped song!</p>` }
    else return document.getElementById("noti").innerHTML = `<p>${data.message}</p>`;
}

async function skipToPrev() {
    const message = document.getElementById("messageContent").value;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    if (message) await sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    const data = await fetch(`https://api.thatalex.dev/v0/web/spotify/player?action=skipBackward`).then(response => response.json());
    if(data.status == 200) {  return document.getElementById("noti").innerHTML = `<p>Skipped song!</p>` }
    else return document.getElementById("noti").innerHTML = `<p>${data.message}</p>`;
}

// Play x Pause

async function pauseSong() {
    const message = document.getElementById("messageContent").value;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    if (message) await sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    fetch("https://api.thatalex.dev/v0/web/spotify/player?action=pause", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async function(resp) {
        if(resp.status == 204) {
            const icon = document.getElementById("playPause")
            icon.className = `fa fa-play`; 
            icon.onclick = playSong
            return document.getElementById("noti").innerHTML = `<p>Successfully paused player</p>`;
        } else {
            const d = await resp.json();
            document.getElementById("noti").innerHTML = `<p>${d.message}</p>`
        }
    });
}

async function playSong() {
    const message = document.getElementById("messageContent").value;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    if (message) await sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    fetch("https://api.thatalex.dev/v0/web/spotify/player?action=play", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async function(resp) {
        if(resp.status == 204) {
            const icon = document.getElementById("playPause")
            icon.className = `fa fa-pause`; 
            icon.onclick = pauseSong
            return document.getElementById("noti").innerHTML = `<p>Successfully started player</p>`;
        } else {
            const d = await resp.json();
            document.getElementById("noti").innerHTML = `<p>${d.message}</p>`
        }
    });
}

// Changing volume
async function changeVolume() {
    const volume = document.getElementById("volumeContent").value;
    const volumeP = document.getElementById("volume");
    fetch("https://api.thatalex.dev/v0/web/spotify/player?action=volume&value=" + volume)
    console.log(`Set volume to ${volume}`)
    volumeP.innerText = `Playing at ${volume}% volume`
}