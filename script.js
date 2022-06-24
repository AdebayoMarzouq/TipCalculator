const bill = document.getElementById('billInput')
const people = document.getElementById('peopleInput')
const customTipPercent = document.getElementById('customInput')
const tipPercent = document.querySelectorAll('.btn-group input[type="button"')
const tipInputs = document.querySelectorAll('input[type="number"')
const updateVals = document.querySelectorAll('.tip-amount')
const reset = document.getElementById('reset')

let globalPercent = 0
let globalBill = 0
let globalPeople = 0
let error = false
let errorArray = []

resetVals()

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && error) {
    console.log('cannot evalutate, erorr')
    return
  }
  calculateTip(globalBill, globalPercent, globalPeople)
})

tipPercent.forEach((element) => {
  element.addEventListener('click', (e) => {
    globalPercent = +e.target.dataset.value
    if (error) {
      console.log('cannot evalutate, erorr')
      return
    }
    calculateTip(globalBill, globalPercent, globalPeople)
  })
})

bill.addEventListener('input', (e) => {
  let check = validate(e.target, +e.target.value)
  if (check) {
    return
  }
  globalBill = +e.target.value
  if (error) {
    console.log('cannot evalutate, erorr')
    return
  }
  calculateTip(globalBill, globalPercent, globalPeople)
})

people.addEventListener('input', (e) => {
  let check = validate(e.target, +e.target.value)
  if (check) {
    return
  }
  globalPeople = +e.target.value
  if (error) {
    console.log('cannot evalutate, erorr')
    return
  }
  calculateTip(globalBill, globalPercent, globalPeople)
})

customTipPercent.addEventListener('input', (e) => {
  let check = validate(e.target, +e.target.value)
  if (check) {
    return
  }
  globalPercent = +e.target.value
  if (error) {
    console.log('cannot evalutate, erorr')
    return
  }
  calculateTip(globalBill, globalPercent, globalPeople)
})

reset.addEventListener('click', () => resetVals())

function calculateTip(bill, percent, people) {
  if (error) {
    return
  }
  let tipAmount = (parseFloat(bill) / 100) * parseFloat(percent)
  let result = (parseFloat(bill) + tipAmount) / parseInt(people)
  if (tipAmount && result && isFinite(result)) {
    updateTip((tipAmount / people).toFixed(2), result.toFixed(2))
  }
  return
}

function updateTip(tipPerPerson, billPerPerson) {
  updateVals[0].innerText = `$${tipPerPerson}`
  updateVals[1].innerText = `$${billPerPerson}`
}

function resetVals() {
  bill.value = ''
  people.value = ''
  customTipPercent.value = ''
  updateVals[0].innerText = '$0.00'
  updateVals[1].innerText = '$0.00'
  globalPercent = 0
  globalBill = 0
  globalPeople = 0
  error = false
}

function validate(element, data) {
  let label = document.querySelector(`label[for=${element.id}] span.error`)
  console.log(label)
  if (data <= 0 || '' || !isFinite(data)) {
    error = true
    element.classList.remove('valid')
    element.classList.add('invalid')
    label.style.visibility = 'visible'
    return true
  }
  error = false
  element.classList.remove('invalid')
  element.classList.add('valid')
  label.style.visibility = 'hidden'
  return false
}
