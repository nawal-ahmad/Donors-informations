`use strict`

let allDonors = [];
let total = 0;
// Constructor Function
function Donor(name, amount) {
  this.name = name;
  this.amount = amount;
  this.age = this.getAge()
  allDonors.push(this)
}

function randomInteger(min, max) {
  return Math.floor((Math.random() * max) + min);
}

Donor.prototype.getAge = function () {
  this.age = randomInteger(18, 30);
}

// Form
let form = document.getElementById('form')
form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  // event.preventDefault();
  const name = event.target.name.value;
  const amount = event.target.amount.value;
  let newDonor = new Donor(name, amount);
  let rowCount = table.rows.length;
  table.deleteRow(rowCount - 1)
  newDonor.getAge();
  newDonor.render();
  form.reset();
  saveLS();
}

// table
let table = document.getElementById('table')

Donor.prototype.render = function () {
  let donorRow = document.createElement('tr');
  table.appendChild(donorRow);
  let donorName = document.createElement('td');
  donorRow.appendChild(donorName);
  donorName.textContent = this.name;
  let donorAge = document.createElement('td');
  donorRow.appendChild(donorAge);
  donorAge.textContent = this.age;
  let donorAmount = document.createElement('td');
  donorRow.appendChild(donorAmount);
  donorAmount.textContent = this.amount;
}


// // total
// Donor.prototype.total=function(){
//   for(let i=0; i<allDonors.length;i++){
//     total+=this.amount
//   }
// }

// Save to local Storage
function saveLS() {
  let donorArr = JSON.stringify(allDonors)
  localStorage.setItem('donors', donorArr)
}

// Get from Local Storage
function getLS() {
  let donors = JSON.parse(localStorage.getItem('donors'))
  if (donors) {
    
    for (let i = 0; i < donors.length; i++) {
      let reInst = new Donor(donors[i].name, donors[i].amount)
      reInst.getAge();
      reInst.render();
      total = total + donors[i].amount
      console.log(total)
    }
  }
}
getLS();

// function tableFooter(){
//   let tablefooter = document.createElement('tr')
//   table.appendChild(tablefooter)
//   let totalLabel = document.createElement('td')
//   tablefooter.appendChild(totalLabel)
//   totalLabel.textContent = 'Total: ' + total
// }
