const { app } = require('electron');
const electron = require('electron');
const { BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize()
var win
var updater
const createWindow = () => {
  updater = new BrowserWindow({
    autoHideMenuBar: true,
    frame: false,
    width:500,
    height:150,
    resizable: true,
    webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false, }
}) 
updater.loadFile('updater.html')


     win = new BrowserWindow({
        autoHideMenuBar: true,
        frame: false,
        show: false,
        width:1000,
        zoomToPageWidth:100,
        webPreferences: { nodeIntegration: true, contextIsolation: false }
    })
    setTimeout(function(){
      win.maximize();
      win.loadFile('index.html')
      win.show();
      updater.close();
   }, 500);
  }

  app.whenReady().then(() => {
    createWindow()
  })
  ipcMain.on('synchronous-message', (event, data) => {
      data = data.split(" ");
      console.log(data[0])
    if (data[0] == "close") {
        BrowserWindow.fromId(event.sender.id).close();
        event.returnValue = 'pong';
        return;
    }
    if (data[0] == "minimize") {
        BrowserWindow.fromId(event.sender.id).minimize();
        event.returnValue = 'pong';
        return;
    }
    if (data[0] == "restart") {
      win.close();
      createWindow();
      event.returnValue = 'pong';
      return;
  }
  if (data[0] == "license") {
    createSimpleWindow("License", {autoHideMenuBar: true, resizable:false, frame: false, width:700, height:700, webPreferences: { nodeIntegration: true, contextIsolation: false }}, "license.html");
    event.returnValue = 'pong';
    return;
}
})
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  



  function createSimpleWindow(title, properties, file) { 
    simpleWin = new BrowserWindow(properties)
    simpleWin.loadFile(file)
    simpleWin.setTitle(title)
  }