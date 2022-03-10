window.onload = () => {
  showCart();
};
//prikazivanje korpe
function showCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let html = "";
  let totalPrice = 0;
  if (cart != null) {
    let products = JSON.parse(localStorage.getItem("allProducts"));

    for (let cartItem of cart) {
      let product = products.filter((x) => x.id == cartItem.id)[0];
      html += `<tr>
            <td class="cart-picture"><img src="assets/img/${
              product.img.src
            }" class="card-img-top" alt="${product.img.alt}"></td>
            <td class="font-weight-bold im-fontSize">${product.name}</td>
            <td  class="font-weight-bold">
            <button class="cartNumber" onclick=decreaseAmount(${product.id},${cartItem.amount})>
            <i class="fas fa-minus"></i>
            </button>
            ${cartItem.amount}
            <button class="cartNumber" onclick=increaseAmount(${product.id})>
            <i class="fas fa-plus"></i>
            </button></td>
            <td>$${product.price.newPrice}
            </td>
            <td class="font-weight-bold">$${(
              product.price.newPrice * cartItem.amount
            ).toFixed(2)}</td>
            <td><button onclick=removeFromCart(${
              product.id
            })><i class="fas fa-trash-alt"></i></button></td>
            </tr>
            `;
      totalPrice += product.price.newPrice * cartItem.amount;
    }
    $("#message").html(
      `<div class="font-weight-bold text-right im-fontSize pr-4">YOUR TOTAL IS : $${totalPrice.toFixed(
        2
      )}<button type="button" class="btn btn-dark ml-2">Checkout</button></div>`
    );
    $("#cartTable").html(html);
  } else {
    html = "Your cart is empty. Go shopping!";
    $("#cartTable").html("");
    $("#message").html(html);
  }
  let amount = Number(localStorage.getItem("amountInCart"));
  $("#amountInCart").html(amount);
}
//brisanje iz korpe
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    let filteredCart = cart.filter((x) => x.id != productId);

    if (filteredCart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(filteredCart));
    } else {
      localStorage.removeItem("cart");
    }

    let amount = 0;
    for (let cartItem of filteredCart) {
      amount += cartItem.amount;
    }
    localStorage.setItem("amountInCart", amount);
  }
  showCart();
}
//smanjivanje kolicine
function decreaseAmount(productId, oldAmount) {
  if (oldAmount == 1) {
    removeFromCart(productId);
  } else {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart != null) {
      for (let cartItem of cart)
        if (cartItem.id == productId) {
          cartItem.amount--;
          break;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    let amount = localStorage.getItem("amountInCart") - 1;
    localStorage.setItem("amountInCart", amount);
    showCart();
  }
}
//povecavanje kolicine
function increaseAmount(productId) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart != null) {
    for (let cartItem of cart)
      if (cartItem.id == productId) {
        cartItem.amount++;
        break;
      }
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  let amount = Number(localStorage.getItem("amountInCart")) + 1;
  localStorage.setItem("amountInCart", amount);
  showCart();
}
