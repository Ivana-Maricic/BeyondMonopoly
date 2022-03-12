window.onload = () => {
  years = [];
  moreInfo = [];
  categories = [];

  $("#categories").change(filterChange);
  $("#sort").change(filterChange);
  $("#years").change(filterChange);
  $("#searching").keyup(filterChange);
  fetchData("years", showYears);

  //Ajax zahtev
  function fetchData(file, callback) {
    $.ajax({
      url: "assets/data/" + file + ".json",
      method: "get",
      dataType: "json",
      success: function (response) {
        callback(response);
      },
      error: function (err) {
        $("#products").html("There was an error loading the data. Please try again later.")
        console.log(err);
      },
    });
  }

  //Ispisivanje proizvoda
  function showProducts(products) {
    localStorage.setItem("allProducts", JSON.stringify(products));
    
    products = categoryFilter(products);
    products = searchByName(products);
    products = filterByAge(products);
    products = sortByPrice(products);
    
    if(products.length == 0) {
      $("#products").empty();
      $("#shopMessage").show();
      return;
    }
    $("#shopMessage").hide();
    var html = "";  
    for (let product of products) {
      html += `
            <div class="col-12 col-md-6 col-lg-4 mb-3">
                <div class="card shadow h-100">
                  <img src="assets/img/${
                    product.img.src
                  }" class="card-img-top" alt="${product.img.alt}">
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${product.name}</h5>
                    <p class="card-text mb-2">${product.description}</p>
                    <p class="card-text mb-2 font-weight-bold">Category: ${getCategory(product.categoryId)}</p>
                    <button type="button" class="btn btn-sm btn-outline-dark mb-2" data-toggle="modal"
                      data-target="#${product.popupId}">Read
                      more</button>
                    <div class="d-flex justify-content-between align-items-center">
                      <p class="card-text font-weight-bold m-0">$${
                        product.price.newPrice
                      }</p>
                      <p class="card-text text-secondary"><s>$${
                        product.price.oldPrice
                      }</s></p>
                    </div>
                    <button type="button" class="btn im-btn px-3 mt-2" id="addToCart${
                      product.id
                    }" onclick="addToCart(${product.id})">Add to cart</button>
                  </div>
                </div>
              </div>
            `;
    }
    $("#products").html(html);
  }

  
  //Ispisivanje informacija
  function showMoreInfo(array) {
    let html = "";
    
    for (let info of array) {
      html += `
            <div class="modal fade" id="${
              info.popupId
            }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold" id="exampleModalLabel">${
                info.name
              }</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p class="font-weight-bold">Number of players: ${
                info.players.min
              }-${info.players.max}</p>
              <p class="font-weight-bold">Playing time: ${
                info.playingTime
              } Min</p>
              <p class="font-weight-bold">Age: ${getAge(info.yearId)}</p>
              <p>${info.moreInfo}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn im-btn" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
            `;
    }
    $("#modals").html(html);
    moreInfo = array;
    fetchData("products", showProducts);
  }

  //Ispis kategorija
  function showCategories(array) {
    let html = "";
    for (let category of array) {
      html += `<li class="list-group-item">
        <input type="checkbox" value="${category.id}" class="category" name="categories"/> ${category.name}
     </li>`;
    }
    $("#categories").html(html);
    categories = array;
    fetchData("products", showMoreInfo);
  }

  //Ispis godina
  function showYears(array) {
    let html = "";
    for (let year of array) {
      html += `
        <li class="list-group-item">
        <input type="checkbox" value="${year.id}" class="age" name="age"/> ${year.value}+
     </li>
        `;
    }
    $("#years").html(html);
    years = array;
    fetchData("categories", showCategories);
  }

  //Dohvatanje godina
  function getAge(yearId) {
    for (let age of years) {
      if (age.id == yearId) {
        return age.value + "+";
      }
    }
  }

  //Dohvatanje kategorija
  function getCategory(categoryId) {
    let name = "";
    for (let id of categoryId) {
      for (let category of categories) {
        if (id == category.id) {
          name += category.name + ", ";
        }
      }
    }
    return name.substring(0, name.length - 2);
  }

  function filterChange() {
    fetchData("products", showProducts);
  }

  //Filtriranje po kategorijama
  function categoryFilter(products) {
    let searchedCategories = [];
    $(".category:checked").each(function (el) {
      searchedCategories.push(parseInt($(this).val()));
    });
    if (searchedCategories.length > 0) {
      return products.filter((p) =>
        p.categoryId.some((category) => searchedCategories.includes(category))
      );
    } else return products;
  }
  
  //Sortiranje po ceni
  function sortByPrice(products) {
    let type = $("#sort").val();
    if (type == "asc") {
      products.sort();
      return products.sort((a, b) => a.price.newPrice - b.price.oldPrice);
    }
    if (type == "desc") {
      return products.sort((a, b) => b.price.newPrice - a.price.oldPrice);
    } else return products;
  }

  //Pretraga po nazivu
  function searchByName(products) {
    let typed = $("#searching").val().toLowerCase();
    let filtered = products.filter(
      (p) => p.name.toLowerCase().indexOf(typed) != -1
    );
    return filtered;
  }

  //Filtriranje po godinama
  function filterByAge(products) {
    let age = [];
    $(".age:checked").each(function (el) {
      age.push(parseInt($(this).val()));
    });
    if (age.length > 0) {
      return products.filter((p) => age.includes(p.yearId));
    } else return products;
  }
};

//dodavanje u korpu
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
  }
  if (cart.filter((x) => x.id == productId).length == 0) {
    cart.push({
      id: productId,
      amount: 1,
    });
  } else {
    for (let product of cart) {
      if (product.id == productId) {
        product.amount++;
        break;
      }
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  let amountInCart = localStorage.getItem("amountInCart");
  if (amountInCart == null) {
    amountInCart = 0;
  }
  amountInCart++;
  $("#amountInCart").html(amountInCart); 
  localStorage.setItem("amountInCart", amountInCart);
    $( "#popUp" ).show(); 
    setTimeout(function() {
       $( "#popUp" ).hide();
     }, 1200);
}
