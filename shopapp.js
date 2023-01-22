//call elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmb;
//console.log(title,price,taxes,ads,discount,total,count,category,submit,);
// get total
function gettotel() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
//create producet
let datapro = [];
if (localStorage.producet != null) {
  datapro = JSON.parse(localStorage.producet);
} else {
  let datapro = [];
}
//submit
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[tmb] = newpro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }
  //save
  localStorage.setItem("producet", JSON.stringify(datapro));
  cleardata();
  showData();
};
//clear input data
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}
//read
function showData() {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="deleat">deleat</button></td>
        </tr>
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deletAll");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `

<button onclick="deletAll()" >Delete(${datapro.length}) producet</button>

`;
  } else {
    btnDelete.innerHTML = ``;
  }
}
showData();
//delete
function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.producet = JSON.stringify(datapro);
  showData();
}
//deletAll
function deletAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}
//count

//update
function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  gettotel();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmb = i;
  scroll({
    top: 0,
  });
}
//search
let search = document.getElementById("search");
let searchmood = "title";
function getsearchmood(id) {
  if (id == "searchTitle") {
    searchmood = "title";
    search.placeholder = "search by Title";
  } else {
    searchmood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchmood == "title") {
    for (let i = 0; i < datapro.length; i++)
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="deleat">deleat</button></td>
  </tr>
  `;
      }
  } else {
    for (let i = 0; i < datapro.length; i++)
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
  <tr>
  <td>${i}</td>
  <td>${datapro[i].title}</td>
  <td>${datapro[i].price}</td>
  <td>${datapro[i].taxes}</td>
  <td>${datapro[i].ads}</td>
  <td>${datapro[i].discount}</td>
  <td>${datapro[i].total}</td>
  <td>${datapro[i].category}</td>
  <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="deleat">deleat</button></td>
  </tr>
  `;
      }
  }
  document.getElementById("tbody").innerHTML = table;
}
