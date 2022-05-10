const { ipcRenderer } = require('electron');
window.$ = window.jQuery = require('jquery');
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


document.getElementById("search-in").addEventListener("keyup", function (e) {
  workProfiles(e);
});
document.getElementById("max-btn").addEventListener("click", function (e) {
     var window = remote.getCurrentWindow();
     if (!window.isMaximized()) {
         window.maximize();          
     } else {
         window.unmaximize();
     }
});



async function workProfiles(e) {
  const name = document.getElementById("search-in").value;
  if (e.code != "Enter") return;
  await fetch(`https://api.roblox.com/users/get-by-username?username=${name}`)
	.then(response => response.json())
	.then(data => {
    const id = data.Id;
    if (!data.Id) return;
    setAvatars(id);
    getFriends(id);
  });
}

async function setAvatars(id) {
   fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${id}&size=352x352&format=Png&isCircular=false`)
    .then(response => response.json())
    .then(avdata => {document.getElementById("fullAv").setAttribute("src",`${avdata.data[0].imageUrl}`); document.getElementById("full-av-2").setAttribute("src",`${avdata.data[0].imageUrl}`); document.getElementById("dl-fullbody").setAttribute("onclick",`require('electron').shell.openExternal("${avdata.data[0].imageUrl}")`);})
     fetch(`https://thumbnails.roblox.com/v1/users/avatar-bust?userIds=${id}&size=180x180&format=Png&isCircular=false`)
    .then(response => response.json())
    .then(avdata => {document.getElementById("av-bust").setAttribute("src",`${avdata.data[0].imageUrl}`); document.getElementById("dl-bust").setAttribute("onclick",`require('electron').shell.openExternal("${avdata.data[0].imageUrl}")`);})
    fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=180x180&format=Png&isCircular=false`)
    .then(response => response.json())
    .then(avdata => {document.getElementById("av-headshot").setAttribute("src",`${avdata.data[0].imageUrl}`); document.getElementById("dl-headshot").setAttribute("onclick",`require('electron').shell.openExternal("${avdata.data[0].imageUrl}")`);})
}
async function getFriends(id) {
  $("#friends-gallery").empty();
  $("#friends-count").text("0");
  fetch(`https://friends.roblox.com/v1/users/${id}/friends`)
  .then(response => response.json())
  .then(avdata => {
    var asco 
    avdata["data"].forEach((element, index) => {
      $("#friends-count").text(parseInt($("#friends-count").text()) + 1);
      fetch(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${element.id}&size=180x180&format=Png&isCircular=false`)
    .then(response => response.json())
    .then(ardata => { 
      $(`<div class="avatar-item-gallery"><img id="av-headshot" src="${ardata.data[0].imageUrl || "https://cdn.sinkcloud.com/digest/fullav?id=XXXAOFJ"}"> <span>${element.name}<a id="dl-headshot"><i class="fa-solid fa-map-pin"></i> Visit</a></span></div>`).appendTo("#friends-gallery");
    });
  });
  });
}



function license() {
  ipcRenderer.sendSync('synchronous-message', 'license');
}