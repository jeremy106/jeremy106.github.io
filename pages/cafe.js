// -- JAVASCRIPT CAFE! -- //

// PRODUCTS //
let products = {

  whiteCoffee: {
    stock: 4,
    price: 4,
    wholesaleCost: 1.5
  },

  blackCoffee: {
    stock: 7,
    price: 3.5,
    wholesaleCost: 1
  },
  
  tea: {
    stock: 10,
    price: 3.5,
    wholesaleCost: 0.5
  },

  whiskey: {
    stock: 1,
    price: 40,
    wholesaleCost: 35
  },

  panini: {
    stock: 3,
    price: 8.5,
    wholesaleCost: 6
  },

  baconEggs: {
    stock: 2,
    price: 21.50,
    wholesaleCost: 8
  }
}

function displayProducts() {

  //Check for out of stock
  let productNames = Object.keys(products)
  for (let i = 0; i < productNames.length; i++){
    let productName = productNames[i]
    if(products[productName].stock <= 0){
      document.getElementById(productName).classList.add("outOfStock")
    } else {
      document.getElementById(productName).classList.remove("outOfStock")
    }

  }

  document.getElementById('whiteCoffee').innerHTML = `White Coffee: ${products.whiteCoffee.stock}`
  document.getElementById('blackCoffee').innerHTML = `Black Coffee: ${products.blackCoffee.stock}`
  document.getElementById('tea').innerHTML = `Tea: ${products.tea.stock}`
  document.getElementById('whiskey').innerHTML = `Whiskey: ${products.whiskey.stock}`
  document.getElementById('panini').innerHTML = `Toasted Panini: ${products.panini.stock}`
  document.getElementById('baconEggs').innerHTML = `Bacon & Eggs: ${products.baconEggs.stock}`

}

displayProducts()

// RESTOCK //

function restock(productName) {

  if(products[productName].wholesaleCost <= cash){

    products[productName].stock++
    cash -= products[productName].wholesaleCost
    displayProducts()
    displayCash()
  } else {
    alert(`You can't afford to restock ${productName}`)
  }

}



// CUSTOMERS //

let customer = {
  order: [],
  money: 0
}

let minOrderSize = 1
let maxOrderSize = 5
let minCustomerMoney = 1
let maxCustomerMoney = 100
let productNames = Object.keys(products)

function generateCustomerOrder() {
  let orderSize = getRandomInt(minOrderSize, maxOrderSize)
  let randomMoney = getRandomInt(minCustomerMoney, maxCustomerMoney)
  let newOrder = []

  for (let i = 0; i < orderSize; i++) {

    let productIndex = getRandomInt(0,productNames.length -1)
    let productName = productNames[productIndex]
    newOrder.push(productName)
    }

    customer.order = newOrder
    customer.money = randomMoney
    displayCustomerOrder()

  }

function displayCustomerOrder () {
  document.getElementById("customerOrder").innerHTML = customer.order 
}

// document.getElementById("generateOrder").addEventListener('click', generateCustomerOrder)
document.getElementById("generateOrder").onclick = generateCustomerOrder


// TRANSACTIONS //


// Check order
function customerCanPay() {
  let total = 0
  
  for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i]
    total += products[productName].price
  }

  return total <= customer.money
}



let cash = 0

function displayCash () {
  document.getElementById("cash").innerHTML = `Cash: $${cash}`
}

displayCash()


let orderCounter = 0
orderHistory = []

function fillOrder() {

  let total = 0
  let orderStatus = "PENDING"
  let filledProducts = []
  orderCounter++
  

  if(!customerCanPay()){
    orderStatus = "REJECTED"
    alert(`I'm sorry, you can't afford this...`)

  } else {
   
    
    for (let i = 0; i < customer.order.length; i++) {
      
      let productName = customer.order[i]
      
      if(products[productName].stock > 0){
        
        total += products[productName].price
        products[productName].stock--
        filledProducts.push(productName)
        
      } else {
        alert(`Yea nah, we're out of ${productName}`)
      }
    }
    orderStatus = "PAID"
  }

  orderHistory.push({
    orderId: orderCounter,
    timestamp: new Date().toLocaleString(),
    productsOrdered: customer.order, 
    productsSold: filledProducts, 
    status: orderStatus,
    amountPaid: total
  })

  // updateHistory()

  cash += total

  customer.order = []
  customer.money = 0

  displayCash()
  displayProducts()
  displayCustomerOrder()
  updateHistory()
  
}

document.getElementById("fillOrder").onclick = fillOrder



// Show order history //


function updateHistory() {
  
  let orderNum = orderHistory.length - 1 

  let text = `<b>OrderID: ${orderHistory[orderNum].orderId}</b><br>
  Status: ${orderHistory[orderNum].status}<br>
  Items Ordered: ${orderHistory[orderNum].productsOrdered}<br>
  Amount Paid: $${orderHistory[orderNum].amountPaid}`

  let para = document.createElement("p")
  para.classList.add("history")
  para.innerHTML = text
  document.getElementById("orderHistory").appendChild(para)

}

function showHistory() {
  document.getElementById("orderHistory").classList.toggle("hidden")
}

document.getElementById("showHistory").onclick = showHistory


// OTHER FUNCTIONS //

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

