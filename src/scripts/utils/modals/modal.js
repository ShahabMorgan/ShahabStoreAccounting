export function modalSetting(section) {
  const modal = document.querySelector(`#${section}-modal-js`)
  modal.addEventListener("click", () => {
    event.target === modal ? modal.classList.add("hidden") : null
  })

  window.addEventListener("keydown", () => {
    if (!modal.classList.contains("hidden")) {
      event.key === "Escape" ? modal.classList.add("hidden") : null
    }
  })
}

export function modalShowBtn(section) {
  const elment = document.querySelector(`#add-to-${section}-btn-js`)
  elment.addEventListener("click", () => {
    const modal = document.querySelector(`#${section}-modal-js`)
    modal.classList.toggle("hidden")
  })
}
