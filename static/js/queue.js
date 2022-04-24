async function qASong() {
    const uri = document.getElementById("uri").value;
    if(!uri) return document.getElementById("modalNoti").innerHTML = `<p>Please enter a valid song link</p>`;

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