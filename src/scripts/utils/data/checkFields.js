//check fildes is empty our not
export function checkFileds(section) {
  let result = {
    check: true,
    message: "عملیات با موفقیت انجام شد",
  }
  const elment = Array.from(document.querySelectorAll("[data-form]"))
  elment.forEach((v) => {
    if (!v.value && v.hasAttribute("required")) {
      result.check = false
      result.message = "لطفا تمامی فیلد ها را پر کنید "
      return result
    }
  })

  return result
}

function checkQuantity(proudct) {
  let result = {
    check: true,
    message: "عملیات با موفقیت انجام شد",
  }

  const reqQuantity = document.querySelector("#quantity").value

  if (proudct.quantity - reqQuantity < 0) {
    result = {
      check: false,
      message: "تعداد وارد شده بیشتر از تعداد موجود در انبار است",
    }
    return result
  } else if (reqQuantity < 1) {
    result = {
      check: false,
      message: "تعداد وارد شده باید بیشتر از 0 باشد",
    }

    return result
  }

  return result
}

export function getData(section, values, event, mainData) {
  let data = {}
  let proudct
  if (!checkFileds().check) {
    data = checkFileds()
    event.preventDefault()
    return data
  }
  if (values.includes("quantity")) {
    const quantity = document.querySelector("#quantity").value
    if (quantity < 1) {
      data = {
        check: false,
        message: "تعداد وارد شده باید بیشتر از 0 باشد",
      }
      return data
    }
  }
  values.forEach((v) => {
    data[`${v}`] = cutCommas(document.querySelector(`[data-form="${v}"]`).value)
  })

  if (mainData) {
    proudct = mainData.find((v) => {
      return v.id === data.proudct
    })
    if (!checkQuantity(proudct).check) {
      data = checkQuantity(proudct)
      event.preventDefault()

      return data
    }
  }

  return data
}

// cut all comos in value using regxap

export function cutCommas(value) {
  return value.replace(/,/g, "")
}

export function rialText(section) {
  const elment = document.querySelectorAll(`[data-text="rial"]`)
  elment.forEach((v) => {
    v.addEventListener("input", () => {
      const price = Number(cutCommas(event.srcElement.value))
      let result
      result = price ? (event.srcElement.value = addCommas(price)) : ""
      event.srcElement.value = result
    })
  })
}

export function addCommas(number) {
  if (!number) return

  number = "" + number

  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
