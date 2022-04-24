async function skipSong() {
    const message = document.getElementById("messageContent").value;
    if(!message) return document.getElementById("noti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

    if (!document.cookie) document.cookie = `lastRan=${new Date().getTime()}`;
    else if (!await checkCookie()) {
        return document.getElementById('noti').innerHTML = '<p>You have already used a player action in the last 5 minutes. Please give me time to regain my sanity :)</p>';
    }

    await sendElectronMessage("skip");

    const data = await fetch(`https://api.thatalex.dev/v0/web/spotify/skip?where=forward`).then(response => response.json());
    if(data.status == 200) return document.getElementById("noti").innerHTML = `<p>Skipped song!</p>`;
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

    const data = await fetch(`https://api.thatalex.dev/v0/web/spotify/skip?where=backward`).then(response => response.json());
    if(data.status == 200) return document.getElementById("noti").innerHTML = `<p>Skipped song!</p>`;
    else return document.getElementById("noti").innerHTML = `<p>${data.message}</p>`;
}