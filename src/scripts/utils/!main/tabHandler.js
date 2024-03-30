export function tabHandler() {
  const tabContainer = [
    Array.from(document.querySelectorAll(".side-bar-pc a")),
    Array.from(document.querySelectorAll(".side-bar-mb a")),
  ]
  tabContainer.forEach((containers) => {
    containers.forEach((items) => {
      items.addEventListener("click", () => {
        if (event.ctrlKey) {
          event.preventDefault()
        }
      })
    })
  })
}
