const { ipcRenderer } = require('electron');

document.getElementById("close-btn").addEventListener("click", function (e) {
  ipcRenderer.sendSync('synchronous-message', 'close')
}); 

document.getElementById("min-btn").addEventListener("click", function (e) {
  ipcRenderer.sendSync('synchronous-message', 'minimize');
});
document.getElementById("restart-btn").addEventListener("click", function (e) {
  ipcRenderer.sendSync('synchronous-message', 'restart');
});
document.getElementById("restart-menu-btn").addEventListener("click", function (e) {
  ipcRenderer.sendSync('synchronous-message', 'restart');
});