const { app, BrowserWindow } = require('electron')
const notifier = require('node-notifier');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const exp = express();
exp.use(express.json());
exp.use(bodyParser());

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

exp.post('/message', (req, res) => {
    if(!req.body) return res.status(400).json({"status": 400});
    // console.log(req.query);
    notifier.notify ({
      title: 'Spotify Website',
      message: `${req.query.message}`,
      sound: true,  // Only Notification Center or Windows Toasters
      wait: true    // Wait with callback, until user action is taken 
   
   }, function (err, response) {
      // Response is response from notification
   });

   notifier.on('click', function (notifierObject, options) {
      console.log("You clicked on the notification")
   });

   notifier.on('timeout', function (notifierObject, options) {
      console.log("Notification timed out!")
   });
});

exp.listen(3000, () => {
  console.log(`Express active`);
})