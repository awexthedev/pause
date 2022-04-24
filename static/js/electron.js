async function sendElectronMessage(type) {
    console.log(type)
    if(type == "q") {
        const message = document.getElementById("qMessage").value;
        if(!message) return document.getElementById("modalNoti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

        const data = await fetch(`https://api.thatalex.dev/v0/web/electron/message?content=${message}`, {
            "method": "POST"
        }).then(response => response.json());
        console.log("Triggered API to send Electron event");

        return true;
    } else if (type == "skip") {
        const message = document.getElementById("messageContent").value;
        if(!message) return document.getElementById("noti").innerHTML = `<p>At least send me a message before you rick roll me :(</p>`;

        const data = await fetch(`https://api.thatalex.dev/v0/web/electron/message?content=${message}`, {
            "method": "POST"
        }).then(response => response.json());
        console.log("Triggered API to send Electron event");

        return true;
    }

    return false;
}