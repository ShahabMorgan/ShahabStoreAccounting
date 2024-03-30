import * as persianTolls from "../utils/persianTolls/persianTolls.js"
import * as fildes from "../utils/data/checkFields.js"
import * as modals from "../utils/modals/modal.js"
import * as id from "../utils/data/generateID.js"
import * as actions from "../utils/actions/delete.js"
import * as handler from "../utils/!main/tabHandler.js"

let storageData = JSON.parse(localStorage.getItem("storageData")) || []
const sumbitStorage = document.querySelector("#sumbit-storage-btn-js")
const rialTextElments = Array.from(document.querySelectorAll(".rial-text"))
const dataTableElment = document.querySelector("#storage-data-table-js")

// calling functions

fildes.rialText()
modals.modalShowBtn("storage")
modals.modalSetting("storage")
generateStorageData(storageData)
handler.tabHandler()

sumbitStorage.addEventListener("click", (event) => {
  storageData = JSON.parse(localStorage.getItem("storageData")) || []
  const today = new Date().toLocaleDateString("fa-IR")
  const data = fildes.getData(
    "storage",
    [
      "productName",
      "buyCost",
      "transportCost",
      "quantity",
      "type",
      "color",
      "size",
    ],
    event,
  )
  if (data.check === false) {
    return alert(`${data.message}`)
  }
  data.id = id.generateId(storageData, data.type)
  data.date = today
  // save data
  storageData.push(data)
  localStorage.setItem("storageData", JSON.stringify(storageData))
  generateStorageData(storageData)
})

// funcitons

function generateStorageData(data) {
  if (data.length < 1) {
    return
  }
  let html = ``
  data.forEach((v, i) => {
    html += `
         <tr data-proudct="${v.id}" >
           <th class="px-[5px]">${i + 1}</th>
                                <th class="px-[5px]">${v.productName}</th>
                                <th class="px-[5px]">${v.type}</th>
                                <th class="px-[5px]">${v.size}</th>
                                <th class="px-[5px]">${v.color}</th>
                                <th class="px-[5px]">${v.quantity}</th>
                                <th class="px-[5px]">${fildes.addCommas(v.buyCost)}</th>
                                <th class="px-[5px]">${fildes.addCommas(
                                  v.transportCost,
                                )}</th>
                                <th class="px-[5px]">${fildes.addCommas(
                                  Number(v.buyCost) + Number(v.transportCost),
                                )}</th>
                                <th class="" class="">${fildes.addCommas(
                                  v.buyCost * v.quantity +
                                    v.transportCost * v.quantity,
                                )}</th>
                                
                                <th class="px-[5px]" class="">${v.date}</th>
                         <th class="px-[5px]">

                     <div class="table_button--linked" id="storage-delete-button" data-proudct-id="${
                       v.id
                     }">
    حذف

                               </div>

        </tr>
    `
  })
  dataTableElment.innerHTML = html
  actions.makeDeleteBtn("storage", storageData)
}

function rialText() {
  const elment = document.querySelectorAll('[data-text="rial"]')
  elment.forEach((v) => {
    v.addEventListener("input", () => {
      const price = Number(fildes.cutCommas(event.srcElement.value))
      let result
      result = price ? (event.srcElement.value = fildes.addCommas(price)) : ""
      event.srcElement.value = result
    })
  })
}
