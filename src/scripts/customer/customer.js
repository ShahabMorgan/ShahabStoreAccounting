import * as persianTolls from "../utils/persianTolls/persianTolls.js"
import * as fildes from "../utils/data/checkFields.js"
import * as modals from "../utils/modals/modal.js"
import * as dataStructre from "../utils/data/generateID.js"
import * as id from "../utils/data/generateID.js"
import * as actions from "../utils/actions/delete.js"
import * as handler from "../utils/!main/tabHandler.js"

let customerData = JSON.parse(localStorage.getItem("customerData")) || []
const proudctListElment = document.querySelector("#proudctList")
const sumbitCustomer = document.querySelector("#sumbit-customer-btn-js")
const dataTableElment = document.querySelector("#customer-data-table-js")

// calling functions

modals.modalShowBtn("customer")
modals.modalSetting("customer")
generateStorageData(customerData)
handler.tabHandler()

sumbitCustomer.addEventListener("click", (event) => {
  customerData = JSON.parse(localStorage.getItem("customerData")) || []
  const data = fildes.getData(
    "customer",
    [
      "customerName",
      "customerPhone",
      "customerCard",
      "customerIdNumber",
      "customerAdresse",
    ],
    event,
  )
  if (data.check === false) {
    return alert(`${data.message}`)
  }
  data.id = id.generateId(customerData, data.type)
  // save data
  customerData.push(data)
  localStorage.setItem("customerData", JSON.stringify(customerData))
  generateStorageData(customerData)
})

function generateStorageData(data) {
  if (data.length < 1) {
    return
  }
  let html = ``
  console.log(data)
  data.forEach((v) => {
    html += `
           <tr data-proudct="${v.id}">
                                  <th class=" px-5 ">${v.customerName}</th>
                                  <th class=" px-5 ">${v.customerPhone}</th>
                                  <th class=" px-5 ">${v.customerCard}</th>
                                  <th class=" px-5 ">${v.customerIdNumber}</th>
                                  <th class=" px-5 ">${v.customerAdresse}</th>
                                     <div class="h-4">
                              <th class="px-[30px]">

                     <div class="table_button--linked" id="customer-delete-button" data-proudct-id="${v.id}">
    حذف

                               </div>

                                 </th>
      `
  })

  dataTableElment.innerHTML = html
  actions.makeDeleteBtn("customer", customerData)
}
