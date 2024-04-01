export function makeDeleteBtn(section) {
  const modal = document.querySelector(`#${section}-modal-delete-js`)
  const elment = document.querySelectorAll(`#${section}-delete-button`)
  elment.forEach((items) => {
    const proudctId = items.dataset.proudctId
    items.addEventListener("click", () => {
      showModal(proudctId, section, modal)
    })
  })
}

function showModal(proudctId, section, modal) {
  let data = JSON.parse(localStorage.getItem(`${section}Data`))
  modal.classList.remove("hidden")
  modal.addEventListener("click", deleteItem)
  window.addEventListener("keydown", closeModal)
  window.addEventListener("keydown", acceptWithKey)

  // close modal with Escape key

  function closeModal() {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden")
      window.removeEventListener("keydown", closeModal)
    }
  }

  // accept with Entre key

  function acceptWithKey() {
    if (event.key === "Enter" && !modal.classList.contains("hidden")) {
      deleteItem(true)
    }
    window.removeEventListener("keydown", acceptWithKey)
  }

  // delete item with click

  function deleteItem(key) {
    modal.classList.remove("hidden")
    if (event.target.dataset.delete === "accept" || key === true) {
      data = data.filter((v) => {
        return v.id != proudctId
      })
      localStorage.setItem(`${section}Data`, JSON.stringify(data))
      document.querySelector(`[data-proudct="${proudctId}"]`).remove()
      console.log(data)
    }
    modal.classList.add("hidden")
    modal.removeEventListener("click", deleteItem)
  }
}

