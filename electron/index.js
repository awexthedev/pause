const { app, BrowserWindow } = require('electron')
const { io } = require('socket.io-client');
const notifier = require('node-notifier');
const fs = require('fs');

const socket = io("http://localhost:9800")

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

socket.on("connect", () => {
  console.log("[ws] socket successfully connected")
  socket.emit("message listener");
  socket.on("message received", (data) => {
    notifier.notify({
      title: "Pause! - " + data.action,
      message: data.message,
      sound:true,
      wait:true
    })
  })
})

// exp.post('/message', (req, res) => {
//     if(!req.query.content) return res.status(400).json({"status":400,"message":"No message content provided (Electron API)"});
//     // console.log(req.query);
//     notifier.notify ({
//       title: 'Spotify Website',
//       message: `${req.query.content}`,
//       sound: true,  // Only Notification Center or Windows Toasters
//       wait: true    // Wait with callback, until user action is taken 
   
//    }, function (err, response) {
//       // Response is response from notification
//    });

//    notifier.on('click', function (notifierObject, options) {
//       console.log("You clicked on the notification")
//    });

//    notifier.on('timeout', function (notifierObject, options) {
//       console.log("Notification timed out!")
//    });

//    return res.status(200).json({"status": 200,"message": "Electron notification sent"});
// });