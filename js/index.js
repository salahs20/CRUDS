let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

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
    total.style.background = "#040";
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
  dataProduct.push(newProduct);
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
                    <td><button id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
   `;
    document.getElementById("tbody").innerHTML = table;
  }
}
shawData();
//*delete
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);
  shawData();

}
