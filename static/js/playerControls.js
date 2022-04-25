// Skipping x Reversing
async function skipSong() {
    const message = document.getElementById("messageContent").value;
    if(!message) return document.getElementById("noti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    await sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    const data = await fetch(`https://api.thatalex.dev/v0/web/spotify/skip?where=forward`).then(response => response.json());
    if(data.status == 200) { return document.getElementById("noti").innerHTML = `<p>Skipped song!</p>` }
    else return document.getElementById("noti").innerHTML = `<p>${data.message}</p>`;
}

async function skipToPrev() {
    const message = document.getElementById("messageContent").value;
    if(!message) return document.getElementById("noti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    const data = await fetch(`https://api.thatalex.dev/v0/web/spotify/skip?where=backward`).then(response => response.json());
    if(data.status == 200) {  return document.getElementById("noti").innerHTML = `<p>Skipped song!</p>` }
    else return document.getElementById("noti").innerHTML = `<p>${data.message}</p>`;
}

// Play x Pause

async function pauseSong() {
    const message = document.getElementById("messageContent").value;
    if(!message) return document.getElementById("noti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    fetch("https://api.thatalex.dev/v0/web/spotify/pause", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async function(resp) {
        const response = await resp.json();
        document.getElementById("noti").innerHTML = `<p>${response.message}</p>`;
        
        const icon = document.getElementById("playPause")
        icon.className = `fa fa-play`; 
        icon.onclick = playSong
    });
}

async function playSong() {
    const message = document.getElementById("messageContent").value;
    if(!message) return document.getElementById("noti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    sendElectronMessage("skip");
    if(document.getElementById("volumeContent").value) changeVolume();

    fetch("https://api.thatalex.dev/v0/web/spotify/resume", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async function(resp) {
        const response = await resp.json();
        const icon = document.getElementById("playPause")
        icon.className = `fa fa-pause`; 
        icon.onclick = pauseSong
        document.getElementById("noti").innerHTML = `<p>${response.message}</p>`;
    });

    // 
}

// Changing volume
async function changeVolume() {
    const volume = document.getElementById("volumeContent").value;
    console.log(volume)
    
    const d = await fetch("https://api.thatalex.dev/v0/web/spotify/volume?to=" + volume).then(response => response.json());
    console.log(d)
}