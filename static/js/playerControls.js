var base_url = "https://api.thatalex.dev/v1/pause/"
// var base_url = "http://localhost:8098/v1/pause/"

var actions = {
    "state": {
        "path": "player/state",
        "method": "get"
    },
    "play": {
        "path": "player?action=play",
        "method": "post"
    },
    "pause": {
        "path": "player?action=pause",
        "method": "post"
    },
    "skipForward": {
        "path": "player?action=skipForward",
        "method": "post"
    },
    "skipBackward": {
        "path": "player?action=skipBackward",
        "method": "post"
    },
    "volume": {
        "path": "player?action=volume",
        "method": "post",
        "expectedQueryValue": "volume_percent"
    },
    "repeat": {
        "path": "player?action=repeat",
        "method": "post",
        "expectedQueryValue": "state"
    },
    "shuffle": {
        "path": "player?action=shuffle",
        "method": "post",
        "expectedQueryValue": "state"
    }
}

var divs = {
    "playPause": document.getElementById("playPause"),
    "volume": document.getElementById("volumeContent"),
    "skipForward": document.getElementById("forward"),
    "skipBackward": document.getElementById("backward"),
    "repeat": document.getElementById("repeat-icon"),
    "shuffle": document.getElementById("shuffle-icon"),
    "notification": document.getElementById("notification"),
    "message": document.getElementById("messageContent")
}

fetch(base_url + actions["state"].path)
.then(async function(response) {
    const data = await response.json();
    if (response.status == 200) {
        console.log('[Events] API responded to player state request!')
        var playPause = document.getElementById("playPause");

        if (data.playing) playPause.className = "fa fa-pause"
        else playPause.className = "fa fa-play";

        if (data.data.shuffle) divs.shuffle.style.color = "green";
        if (data.data.repeat != "off") divs.repeat.style.color = "green";
    
        playPause.addEventListener('click', (e) => {
            if (e.target.className == "fa fa-pause") {
                playerControls('pause', null, document.getElementById("playPause"));
                playPause.className = 'fa fa-play';
            }
            else if (e.target.className == "fa fa-play") {
                playerControls('play', null, document.getElementById("playPause"));
                playPause.className = 'fa fa-pause'
            }
        })

        divs.repeat.addEventListener("click", (e) => {
            console.log("[Events] Detected click on repeat element, attempting to update state..")
            if (divs.repeat.style.color == "green") {
                divs.repeat.style.color = "white";
                playerControls("repeat", "off", divs.repeat);
            } else if (divs.repeat.style.color == "white" || divs.repeat.style.color == "") {
                divs.repeat.style.color = "green";
                playerControls("repeat", "track", divs.repeat);
            } 
        })

        divs.shuffle.addEventListener("click", (e) => {
            console.log("[Events] Detected click on shuffle element, attempting to update state..")
            if (divs.shuffle.style.color == "green") {
                divs.shuffle.style.color = "white";
                playerControls("shuffle", "false", divs.shuffle);
            } else if (divs.shuffle.style.color == "white" || divs.shuffle.style.color == "") {
                divs.shuffle.style.color = "green";
                playerControls("shuffle", "true", divs.shuffle);
            } 
        })
    } else {
        console.log(`[Events] that can't be good. Backend has returned a ${response.status} to the onload-state check, is the API online & authenticated?`)
        Object.values(divs).forEach(function(k) {
            k.style.color = "red"
            k.onclick = null;
            document.getElementById("notification").innerText = "Received an unexpected error from the backend! Let the developer know this is happening."
        })
    }
});

async function playerControls(controller, value, element) {
    if (controller) {
        if (!actions[controller]) return console.log("[Controller] That controller doesn't exist on the API.")
        else {
            if (actions[controller].expectedQueryValue) queryString = "&" + actions[controller].expectedQueryValue + "=" + value
            else queryString = ""

            if (controller == "volume") {
                if (value > 100 || value < 1) {
                    displayMessage("You provided a number that was too large or too small.", divs.notification);
                    return;
                }
            } 

            fetch(base_url + actions[controller].path + queryString, {
                method: actions[controller].method
            })
            .then(function (response) {
                if (response.status == 200 || response.status == 204) {
                    console.log(`[Controller] Successfully executed ${controller} function`)
                    if (controller != "repeat" && controller != "shuffle") {
                        tempChangeColor("green", element);
                    }

                    if (divs.message.value) {
                        console.log('[ws] Message detected, emitting to backend')
                        socket.emit("message sent", {
                            message: divs.message.value,
                            action: controller
                        });

                        divs.message.value = "";
                    } else console.log("[ws] No message provided, ignoring socket emit")
                } 
            })
        }
    } else console.log(`[Controller] Unsure how, but the controller variable was nullified?`)
} 