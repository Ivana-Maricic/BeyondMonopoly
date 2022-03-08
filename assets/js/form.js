// form validation

var imePrezime = document.getElementById("imePrezime");
var email = document.getElementById("email");
var number = document.getElementById("number");
var message = document.getElementById("message");

var reImePrezime = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,15}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,20})+$/;
var reEmail = /^[\w-\.]+@([\w-]{2,}\.)+[a-z]{2,}$/;
var reNumber =/^06[0-689][0-9]{6,7}$/;  
var reMessage = /.{4,200}/;  

var noErrors;
var errorName = document.getElementById("error-name");
var errorEmail =  document.getElementById("error-email");
var errorNumber = document.getElementById("error-number");
var errorMsg =  document.getElementById("error-message");


imePrezime.addEventListener("blur", checkName);
function checkName() {
  var check = reImePrezime.test(imePrezime.value);
  if(check) {
    errorName.innerHTML="Name is valid!";
    errorName.style.color="green";
 } 
  else {
  noErrors = false;
  errorName.innerHTML="Name is not valid!";
  errorName.style.color="red";
 }
}

email.addEventListener("blur", checkEmail);
function checkEmail() {
 var check = reEmail.test(email.value);
 if(check) {
  errorEmail.innerHTML="Email is valid!";
  errorEmail.style.color="green";
 } 
 else {
 noErrors = false;
  errorEmail.innerHTML="Email is not valid!";
  errorEmail.style.color="Red";
 }
}

number.addEventListener("blur", checkNumber);
function checkNumber(){
    var check = reNumber.test(number.value);
    if(check) {
        errorNumber.innerHTML="Number is valid!";
        errorNumber.style.color="green";
       } 
       else {
       noErrors = false;
       errorNumber.innerHTML="Number is not valid!";
       errorNumber.style.color="Red";
       }
}

message.addEventListener("blur", checkMsg);
function checkMsg() {
 if (message.value == "") {
  errorMsg.textContent = "Message can`t be empty";
  errorMsg.style.color="red";
}
  else {
  errorMsg.textContent = "Message is valid";
  errorMsg.style.color="green";
 }
}

 var btnSubmitMessage = document.getElementById("btnSubmitMessage");

  btnSubmitMessage.addEventListener("click", function() {
  noErrors = true;
  checkName();
  checkEmail();
  checkNumber();
  checkMsg();
  if(noErrors) {
  imePrezime.value = "";
  number.value = "";
  email.value = "";
  message.value = "";
  errorName.innerHTML='';
  errorEmail.innerHTML='';
  errorNumber.innerHTML='';
  errorMsg.innerHTML='';
}
})