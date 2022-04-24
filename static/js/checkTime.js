async function checkTime(epoch) {
    console.log(`Running time-since-last-run check..`)
    var cookie = new Date(epoch * 1);
    const currentTime = new Date().getTime();
    var newDateObj = new Date(cookie.getTime() + 5*60000);

    console.log(`Last ran: ${cookie.toLocaleString()}\nExpected end: ${newDateObj.toLocaleString()}`)

    if(newDateObj.getTime() <= currentTime) {
        console.log("Has been longer than the specified time, generating new timestamp..")
        document.cookie = `lastRan=${currentTime}`;        
        return true;
    } else return false;
}