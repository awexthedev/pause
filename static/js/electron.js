async function sendElectronMessage(type) {
    console.log(type)
    if(type == "q") {
        const message = document.getElementById("qMessage").value;
        if(!message) return;

        const data = await fetch(`https://api.thatalex.dev/v0/web/electron/message?content=${message}`, {
            "method": "POST"
        }).then(response => response.json());
        console.log(`Response received from Electron:${JSON.stringify(data)}`)

        return true;
    } else if (type == "skip") {
        const message = document.getElementById("messageContent").value;
        if(!message) return;

        const data = await fetch(`https://api.thatalex.dev/v0/web/electron/message?content=${message}`, {
            "method": "POST"
        }).then(response => response.json());
        console.log(`Response received from Electron:${JSON.stringify(data)}`)

        return true;
    }

    return false;
}