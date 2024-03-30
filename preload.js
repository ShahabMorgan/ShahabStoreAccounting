window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
const testmgr = require("./backend/testmgr")
const { contextBridge, ipcRenderer } = require("electron")

function getNames() {
  return testmgr.getNames()
}

contextBridge.exposeInMainWorld("api", {
  getNames: getNames,
})
