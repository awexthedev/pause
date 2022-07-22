async function displayMessage(error, div) {
    div.innerHTML = error;
    div.style.display = "block";
    setTimeout(() => {
        console.log('[msgTools] Hiding requested message')
        div.style.display = "none";
    }, 5000)
}

async function tempChangeColor(color, div) {
    div.style.color = color;
    setTimeout(() => {
        console.log('[msgTools] Reverted to white');
        div.style.color = 'white';
    }, 2000)
}