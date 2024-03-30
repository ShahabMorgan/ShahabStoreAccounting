import * as persianTolls from "../utils/persianTolls/persianTolls.js"
import * as fildes from "../utils/data/checkFields.js"
import * as modals from "../utils/modals/modal.js"
import * as dataStructre from "../utils/data/generateID.js"
import * as id from "../utils/data/generateID.js"
import * as calculate from "../utils/data/calculateProducts.js"
import * as actions from "../utils/actions/delete.js"
import * as handler from "../utils/!main/tabHandler.js"

let workspaceData = JSON.parse(localStorage.getItem("workspaceData")) || []
const storageData = JSON.parse(localStorage.getItem("storageData")) || []
const customereData = JSON.parse(localStorage.getItem("customerData")) || []
const proudctElment = document.querySelector("#proudct")
const customerElment = document.querySelector("#customer")
const sumbitWorkspace = document.querySelector("#sumbit-workspace-btn-js")
const dataTableElment = document.querySelector("#workspace-data-table-js")
const productQuantity = document.querySelector("#quantity")

// calling functions

modals.modalShowBtn("workspace")
modals.modalSetting("workspace")
fildes.rialText()
generateWorkspaceData(workspaceData)
exportInSelcet()
handler.tabHandler()

proudctElment.addEventListener("mouseup", () => {
  const proudctId = event.srcElement.value
  const product = storageData.find((v) => {
    return v.id === proudctId
  })
})

sumbitWorkspace.addEventListener("click", (event) => {
  const today = new Date().toLocaleDateString("fa-IR")
  workspaceData = JSON.parse(localStorage.getItem("workspaceData")) || []
  const data = fildes.getData(
    "workspace",
    [
      "proudct",
      "customer",
      "transportCost",
      "sellPrice",
      "checkNumber",
      "invoiceNumber",
      "quantity",
      "adresse",
    ],
    event,
    storageData,
  )
  if (data.check === false) {
    return alert(`${data.message}`)
  }
  data.id = id.generateId(storageData, data.type)
  data.date = today

  data.proudct = storageData.find((items) => {
    return items.id == data.proudct
  })
  data.customer = customereData.find((items) => {
    return items.id == data.customer
  })
  calculate.calculateProduct(storageData, data.proudct, data.quantity)
  workspaceData.push(data)
  localStorage.setItem("workspaceData", JSON.stringify(workspaceData))
  console.log(workspaceData)
  generateWorkspaceData(workspaceData)
})

function exportInSelcet() {
  let storageHtml = ``
  let customerHtml = ``

  storageData.forEach((v) => {
    storageHtml += `
    <option dir="rtl" value="${v.id}">${v.productName} تعداد  ${v.quantity} تا - ${v.type} - ${v.color}</option>
    `
  })

  customereData.forEach((v) => {
    customerHtml += `
    <option dir="rtl" value="${v.id}">${v.customerName} - ${v.customerIdNumber}</option>
    `
  })

  proudctElment.innerHTML = storageHtml
  customerElment.innerHTML = customerHtml
}

// genrate workspace data on tables

function generateWorkspaceData(data) {
  if (data.length < 1) {
    return
  }

  let html = ``
  console.log(data)
  data.forEach((v, i) => {
    // calculate net profit
    const netProfit = eval(
      v.sellPrice -
        (v.proudct.buyCost + v.proudct.transportCost + v.transportCost),
    )
    // Number(v.sellPrice) -
    // (Number(v.proudct.buyCost) +
    //   Number(v.proudct.transportCost) +
    //   Number(v.transportCost))

    // calculate total profit
    const totalProfit = eval(
      v.sellPrice * v.quantity -
        (v.proudct.buyCost + v.proudct.transportCost + v.transportCost) *
          v.quantity,
    )
    // Number(v.sellPrice) * Number(v.quantity) -
    // (Number(v.proudct.buyCost) +
    //   Number(v.proudct.transportCost) +
    //   Number(v.transportCost)) *
    //   Number(v.quantity)

    html += `
         <tr data-proudct="${v.id}">
                               <th class="px-[5px]">${i + 1}</th>
                                <th class=" px-5 ">${v.proudct.productName}</th>

                                <th class=" px-5 ">${
                                  v.customer.customerName
                                }</th>

                                
                                <th class=" px-5 ">${v.invoiceNumber}</th>
                                <th class=" px-5 ">${v.checkNumber}</th>
                                
                                <th class=" px-5 ">${fildes.cutCommas(
                                  v.quantity,
                                )}</th>
                                
                                <th class=" px-5 ">${fildes.addCommas(
                                  v.sellPrice,
                                )}</th>

                                 <th class=" px-5 ">${fildes.addCommas(
                                   v.transportCost,
                                 )}</th>

                                  <th class=" px-5 ">${fildes.addCommas(
                                    Number(v.sellPrice) +
                                      Number(v.transportCost),
                                  )}</th>

                                    <th class=" px-5 ">${fildes.addCommas(
                                      v.sellPrice * v.quantity +
                                        v.transportCost * v.quantity,
                                    )}</th>
  
                                    
                                    <th class=" px-5 ">${fildes.addCommas(
                                      netProfit,
                                    )}</th>
                                    
                                      
                                    
                                    <th class=" px-5 ">${fildes.addCommas(totalProfit)}</th>
                                      
                                      <th class=" px-5 ">${v.date}</th>
                                    <th>
                     <div class="table_button--linked" id="workspace-delete-button" data-proudct-id="${v.id}">
    حذف

                               </div>

                                 </th>


        </tr>
    `
  })
  dataTableElment.innerHTML = html
  actions.makeDeleteBtn("workspace", workspaceData)
}
