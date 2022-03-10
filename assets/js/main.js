$(document).ready(function () {
  showAmountInCart();
});

//broj u korpi prikaz
function showAmountInCart() {
  let amountInCart = localStorage.getItem("amountInCart");
  if (amountInCart == null) {
    amountInCart = 0;
  }
  $("#amountInCart").html(amountInCart);
}

//preloader
$(window).ready(() => {
  setTimeout(() => {
      $('.loading').animate({
          opacity: 0
      }, 300)
  }, 3000)

  setTimeout(() => {
      $('.loading').remove()
  }, 3000)
})

//dinamicko ispisivanje navigacije
var html=` <nav class="navbar navbar-expand-lg navbar-light">
<a class="navbar-brand" href="index.html">
    <img src="assets/img/logo.png" alt="logo" class="im-logo" />
</a>
<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse text-uppercase" id="navbarNav">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item active navHover  mx-2 font-weight-bold">
            <a class="nav-link" href="index.html">Home</a>
        </li>
        <li class="nav-item navHover mx-2 font-weight-bold">
            <a class="nav-link" href="shop.html">Shop</a>
        </li>
        <li class="nav-item navHover mx-2 font-weight-bold">
            <a class="nav-link" href="jointheclub.html">Join the club</a>
        </li>
        <li class="nav-item mx-2 font-weight-bold" id="notli">
            <a class="nav-link" style="position: relative;" href="cart.html"><i
                    class="fas fa-shopping-cart"></i>
                <div class="amountInCart font-weight-bold im-radial" id="amountInCart"></div>
            </a>
        </li>
    </ul>
</div>
</nav>`
$("#navigation").html(html);

//dodavanje klase active
function activeClass(){
$(function() {
  var path = window.location.href.substring(window.location.href.lastIndexOf("/")+1);
  $("li.nav-item > a").each(function(){
       if($(this).attr("href") == path || $(this).attr("href") == '' ){
       $(this).addClass("active");
       $(this).addClass("im-radial");
      }
  })
});
}
activeClass();

//dinamicko ispisivanje footera
var html=`
<div class="container">
<div class="row align-items-center">
  <div class="col-12 col-md-6 im-center">
    <ul>
      <li class="p-2">Phone: +702565626</li>
      <li class="p-2">Address: 592 E Fremont St, Las Vegas</li>
      <li class="p-2">Open hours: 8:00 - 18:00</li>
      <li class="p-2">Email: beyondmonopoly@gmail.com</li>
    </ul>
  </div>
  <div class="col-12 col-md-6">
    <div class="wrapper">
      <a href="https://www.facebook.com/" target="_blank">
        <div class="icon Facebook">
          <div class="tooltip">Facebook</div>
          <span><i class="fab fa-facebook-f"></i></span>
        </div>
      </a>
      <a href="https://www.instagram.com/" target="_blank">
        <div class="icon Instagram">
          <div class="tooltip">Instagram</div>
          <span><i class="fab fa-instagram"></i></span>
        </div>
      </a>
      <a href="xml/sitemap.xml" target="_blank">
        <div class="icon Sitemap">
          <div class="tooltip">SiteMap</div>
          <span><i class="fas fa-sitemap"></i></span>
        </div>
      </a>
      <a href="xml/rss.xml" target="_blank">
        <div class="icon Rss">
          <div class="tooltip">Rss</div>
          <span><i class="fas fa-rss"></i></span>
        </div>
      </a>
      <a href="documentation.pdf" target="_blank">
        <div class="icon documentation">
          <div class="tooltip">Doc</div>
          <span><i class="fas fa-file"></i></span>
        </div>
      </a>
    </div>
  </div>
</div>
</div>
<div class="container-fluid footer-copyright p-2">
<div class="row">
  <div class="col-12 col-md-6 text-center">
    <p class="my-1">Ivana Maricic 40/20 | <a href="about.html" class="im-radial font-weight-bold">ABOUT</a></p>
  </div>
  <div class="col-12 col-md-6 text-center">
    <p class="my-1">&copy; 2022 Copyright : <a href="index.html" class="im-radial font-weight-bold">Beyond
        Monopoly</a></p>
  </div>
</div>
</div>
`
$("#footer").html(html);
