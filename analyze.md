## Loan

- loanerId
- productId
- principal
- interest
- months
- startDate
- endDate
- total
- totalInterest
- status

## Loaner

- firstName
- lastName
- phoneNumber
- photo
- address
- city
- groupId
- status

## Group

- name
- status

## Product

- name
- thumbnail
- categoryId
- price
- description
- status

## Category

- name
- status

## Code Example

```js
function calculate() {
  //Look up the input and output elements in the document
  var amount = document.getElementById("amount")
  var apr = document.getElementById("apr")
  var years = document.getElementById("years")
  var zipcode = document.getElementById("zipcode")
  var payment = document.getElementById("payment")
  var total = document.getElementById("total")
  var totalinterest = document.getElementById("totalinterest")

  // Get the user's input from the input elements.
  // Convert interest from a percentage to a decimal, and convert from
  // an annual rate to a monthly rate. Convert payment period in years
  // to the number of monthly payments.
  var principal = 10000
  var interest = 5 / 100 / 12
  var payments = 6 // month

  // compute the monthly payment figure
  var x = Math.pow(1 + interest, payments) //Math.pow computes powers
  var monthly = (principal * x * interest) / (x - 1)

  // If the result is a finite number, the user's input was good and
  // we have meaningful results to display
  if (isFinite(monthly)) {
    // Fill in the output fields, rounding to 2 decimal places
    payment.innerHTML = monthly.toFixed(2)
    total.innerHTML = (monthly * payments).toFixed(2)
    totalinterest.innerHTML = (monthly * payments - principal).toFixed(2)
  } else {
    // Result was Not-a-Number or infinite, which means the input was
    // incomplete or invalid. Clear any previously displayed output.
    payment.innerHTML = "" // Erase the content of these elements
    total.innerHTML = ""
    totalinterest.innerHTML = ""
  }
}
```
