const {app,BrowserWindow,ipcMain} = require('electron');


let Mainwin;


function createMainWindow () {
    // Create the browser window.
    Mainwin = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    })
    Mainwin.webContents.openDevTools();
  
    // and load the index.html of the app.
    Mainwin.loadFile('main/show.html')

    Mainwin.on('closed', function() {
 
      mainWin = null;
      app.quit();
    });


}

function createExpandWindow () {

  let expandWin = new BrowserWindow({
  width: 600,
  height: 400,
  webPreferences: {
      nodeIntegration: true
  }
  })
  
  expandWin.webContents.openDevTools();

  expandWin.loadURL(`file://${__dirname}/main/expand.html`);

  return expandWin;
}

ipcMain.on('expand_flag',function(e,item){

  console.log(item);
  let expandWin =  createExpandWindow();

 
  expandWin.webContents.on('dom-ready', () => {
    expandWin.webContents.send('duplicate_flag',expandWin);
    expandWin.webContents.send('expand_flag',item);
    // expandWin.close();
  })

  expandWin.on('closed', function() {
 
    expandWin = null;
    
  });
  

})






app.on('window-all-closed', function() {
  
  app.quit();
});


app.on('ready', createMainWindow);

