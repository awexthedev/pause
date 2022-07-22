var box = document.getElementById("notification");
var base_url = "https://api.thatalex.dev/v1/pause/"
// var base_url = "http://localhost:8098/v1/pause/"
var actions = {
    "state": "player/state",
    "play": "player?action=play",
    "pause": "player?action=pause",
    "skipForward": "player?action=skipForward",
    "skipBackward": "player?action=skipBackward",
    "volume": "player?action=volume&value="
}

fetch(base_url + "player/state")
.then(async function(response) {
    const data = await response.json();
    var cover = document.querySelector(".cover");
    var author = document.querySelector(".author");
    var playPause = document.getElementById("playPause");

    if (response.status == 401) location.reload();
    else if (response.status == 400) {
        author.innerHTML = "<h3>No active devices here right now..</h3><p>Check back in a few.</p>"
    } else if (response.status == 200) {
        console.log(`[HTTP] State API data received, formatting`);

        if (data.playing) playPause.className = "fa fa-pause"
        else playPause.className = "fa fa-play";

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

        if (data.type == "published") {
            cover.src = data.data.songData.album.images[0].url
            author.innerHTML = `<h3><a href="${data.data.songData.url}" target="_blank">${data.data.songData.songName} by ${data.data.songData.artists[0].name}</a></h3>`
        } else {
            cover.src = "https://thatalex.dev/static/spotify.png";
            author.innerHTML = `<h3><a href="https://youtube.com/results?search_query=${data.data.songData.songName} by ${data.data.songData.artists[0].name}" target="_blank">${data.data.songData.songName} by ${data.data.songData.artists[0].name}</a></h3>`
        }
    }
});

async function playerControls(controller, value, element) {
    if (controller) {
        if (!actions[controller]) return console.log(`[Controller] That option isn't in the controller object.`)
        else {
            if (controller == "volume") {
                if (value > 100 || value < 1) {
                    displayMessage("Sorry, your volume value must be more than 1 or less than 100.",box);
                    return;
                } 
                actions.volume += value
            }

            fetch(base_url + actions[controller])
            .then(async function (response) {
                if (response.status == 200 || response.status == 204) {
                    tempChangeColor("green", element)
                    console.log('[Controller] Successfully performed action');
                } else {
                    tempChangeColor("red", element);
                    displayMessage("Sorry, something went wrong when contacting the API. Refresh the page and try again.", box);
                    console.log('[Controller] Something went wrong when performing a ' + controller + ' action.');
                }
            })

            actions.volume = "player?action=volume&value="
        }
    } else console.log(`[Controller] Not sure how, but controller was nullified.`)
} 