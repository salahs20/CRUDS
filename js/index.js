let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "Create";
let tmp;
// console.log(
//   title,
//   price,
//   taxes,
//   ads,
//   adsdiscount,
//   total,
//   count,
//   category,
//   submit
// );
//*get total
function getTotal() {
  // console.log("done");
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#00ff00";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}
//*create

let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mood === "Create") {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    dataProduct[tmp] = newProduct;
    mood = "Create";
    submit.innerHTML = "Create";
    count.style.display = "block";
  }

  localStorage.setItem("product", JSON.stringify(dataProduct));
  clear();
  shawData();

  // console.log(dataProduct);
};
//* clear

function clear() {
  (title.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
}
//*read

function shawData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
   <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button id="update" onclick="Update(${i})">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
   `;
    document.getElementById("tbody").innerHTML = table;
  }
  let btndelete = document.getElementById("deleteAll");
  if (dataProduct.length > 0) {
    btndelete.innerHTML = `
  
  <button onclick="deleteall()">delete all (${dataProduct.length})</button>`;
  } else {
    btndelete.innerHTML = "";
  }
}
shawData();
//*delete
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  shawData();
}
function deleteall() {
  dataProduct.splice(0);
  localStorage.clear();

  shawData();
}

function Update(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchByTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
}

function searchDta(value) {
  if (searchMood == "title") {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value)) {
        console.log(i);
        table += `
        <tr>
                         <td>${i + 1}</td>
                         <td>${dataProduct[i].title}</td>
                         <td>${dataProduct[i].price}</td>
                         <td>${dataProduct[i].taxes}</td>
                         <td>${dataProduct[i].ads}</td>
                         <td>${dataProduct[i].discount}</td>
                         <td>${dataProduct[i].total}</td>
                         <td>${dataProduct[i].category}</td>
                         <td><button id="update" onclick="Update(${i})">update</button></td>
                         <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                     </tr>
        `;
        document.getElementById("tbody").innerHTML = table;
      }
    }
  } else {
    table = "";
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value)) {
        console.log(i);
        table += `
        <tr>
                         <td>${i + 1}</td>
                         <td>${dataProduct[i].title}</td>
                         <td>${dataProduct[i].price}</td>
                         <td>${dataProduct[i].taxes}</td>
                         <td>${dataProduct[i].ads}</td>
                         <td>${dataProduct[i].discount}</td>
                         <td>${dataProduct[i].total}</td>
                         <td>${dataProduct[i].category}</td>
                         <td><button id="update" onclick="Update(${i})">update</button></td>
                         <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                     </tr>
        `;
        document.getElementById("tbody").innerHTML = table;
      }
    }
  }
}
