// const bill = document.getElementById('billInput')
// const people = document.getElementById('peopleInput')
// const percentages = document.getQuerySelectorAll('.tip-content .btn')

const defaultPercent = 0

function calculateTip(bill, percent, people) {
  let tipAmount = (parseFloat(bill) / 100) * parseFloat(percent)

  let result = (parseFloat(bill) + tipAmount) / parseInt(people)

  return [(tipAmount / people).toFixed(2), result.toFixed(2)]
}

let [ans, ansb] = calculateTip(142.55, 15, 5)
console.log(ans, ansb)
