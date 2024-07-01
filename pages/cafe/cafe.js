// -- JAVASCRIPT CAFE! -- //

//----VARIABLES----//

// Cafe 
let cash = 0
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

// Order history //
orderHistory = []
let orderCounter = 0

// Customer
let customer = {
  order: [],
  money: 0
}
let minOrderSize = 1
let maxOrderSize = 5
let minCustomerMoney = 1000
let maxCustomerMoney = 100000
let productNames = Object.keys(products)



//----FUNCTIONS----//

// Page Setup //

function displayProducts() {

  let productNames = Object.keys(products)

  for (let i = 0; i < productNames.length; i++){
    
    let item = productNames[i]
    
    if(productIsInStock(item)){ 
      document.getElementById(item).classList.remove("outOfStock")
    } else {
      document.getElementById(item).classList.add("outOfStock")
    }
  }

  document.getElementById('whiteCoffee').innerHTML = `White Coffee: ${products.whiteCoffee.stock}`
  document.getElementById('blackCoffee').innerHTML = `Black Coffee: ${products.blackCoffee.stock}`
  document.getElementById('tea').innerHTML = `Tea: ${products.tea.stock}`
  document.getElementById('whiskey').innerHTML = `Whiskey: ${products.whiskey.stock}`
  document.getElementById('panini').innerHTML = `Toasted Panini: ${products.panini.stock}`
  document.getElementById('baconEggs').innerHTML = `Bacon & Eggs: ${products.baconEggs.stock}`

}



function createRestockButtons () {
  let parents = document.getElementsByClassName("menuItem")

  for (let i=0; i < parents.length; i++){

    let parent = parents[i]
    let childId = parent.childNodes[0].nextSibling.id
    let button = document.createElement("button")
    button.classList.add("button","restock")
    button.innerHTML = "Restock"
    button.addEventListener("click", () => {restock(childId)})
    parent.appendChild(button)

  }
}



function displayCustomerOrder () {
  document.getElementById("customerOrder").innerHTML = customer.order 
}
  


function displayCash () {
  document.getElementById("cash").innerHTML = `Cash: $${cash}`
}



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

  
// Cafe Functionality //

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



function fillOrder() {

  let total = 0
  let orderStatus = "PENDING"
  let filledProducts = []
  orderCounter++
  
  if(customerCanPay()){

    for (let i = 0; i < customer.order.length; i++) {
      
      let item = customer.order[i]
      
      if(productIsInStock(item)){
        
        total += products[item].price
        products[item].stock--
        filledProducts.push(item)
        
      } else {
        alert(`Yea nah, we're out of ${item}`)
      }
    }
    orderStatus = "PAID"
    
  } else {
    
    orderStatus = "REJECTED"
    alert(`I'm sorry, you can't afford this...`)
    
  }

  orderHistory.push({
    orderId: orderCounter,
    timestamp: new Date().toLocaleString(),
    productsOrdered: customer.order, 
    productsSold: filledProducts, 
    status: orderStatus,
    amountPaid: total
  })

  cash += total
  customer.order = []
  customer.money = 0

  displayCash()
  displayProducts()
  displayCustomerOrder()
  updateHistory()
  
}



function showHistory() {
  document.getElementById("orderHistory").classList.toggle("hidden")
}



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


// Utility //

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}



function productIsInStock(item){
  return products[item].stock > 0
}



function customerCanPay() {
  let total = 0
  
  for (let i = 0; i < customer.order.length; i++) {
    let productName = customer.order[i]
    total += products[productName].price
  }
  
  return total <= customer.money
}




//---INITIALISE PAGE---//

displayProducts()
displayCash()
createRestockButtons()

document.getElementById("generateOrder").onclick = generateCustomerOrder
document.getElementById("fillOrder").onclick = fillOrder
document.getElementById("showHistory").onclick = showHistory

