const { app, BrowserWindow } = require("electron")

const path = require("path")
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    icon: "./assets/icons/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
      devTools: false,
    },
  })
  win.loadFile("./public/pages/index.html")
  win.setMenu(null)
}
app.whenReady().then(() => {
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
