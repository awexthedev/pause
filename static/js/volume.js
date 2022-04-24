async function changeVolume() {
    const volume = document.getElementById("volumeContent").value;
    console.log(volume)
    
    const d = await fetch("http://localhost:8098/v0/web/spotify/volume?to=" + volume).then(response => response.json());
    console.log(d)
}