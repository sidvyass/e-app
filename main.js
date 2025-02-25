const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  var win = new BrowserWindow({
    width: 800,
    height: 600
  })

  //win.setMenuBarVisibility(false);

  win.loadFile('C:/js_projects/my-app/frontend/index.html');
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
