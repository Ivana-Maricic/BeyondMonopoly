// validacija forme
function validation(e) {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var message = document.getElementById("message").value;
  var gender = document.getElementsByName("rbGender");
  var terms = document.getElementById("cbTerms");
  var successfullValidation = true;

  var reName = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,15}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,20})+$/;
  var reEmail = /^[\w-\.]+@([\w-]{2,}\.)+[a-z]{2,}$/;
  var reNumber = /^06[0-689][0-9]{6,7}$/;
  var reMessage = /.{4,200}/;

  if (reName.test(name)) {
    document.getElementById("nameerror").innerHTML = " ";
  } else {
    document.getElementById("nameerror").innerHTML =
      "** Name is required and can contain only letters";
    successfullValidation = false;
  }
  if (reEmail.test(email)) {
    document.getElementById("emailerror").innerHTML = " ";
  } else {
    document.getElementById("emailerror").innerHTML =
      "** Email is required and must be in a correct email format.";
    successfullValidation = false;
  }
  if (reNumber.test(number)) {
    document.getElementById("numbererror").innerHTML = " ";
  } else {
    document.getElementById("numbererror").innerHTML =
      "** Number is required and must be in a correct number format.";
    successfullValidation = false;
  }
  if (reMessage.test(message)) {
    document.getElementById("messageerror").innerHTML = " ";
  } else {
    document.getElementById("messageerror").innerHTML =
      "** Message is required and can contain max 250 characters.";
    successfullValidation = false;
  }
  if (!(gender[0].checked || gender[1].checked)) {
    document.getElementById("gendererror").innerHTML =
      "** Choose at least one option ";
    successfullValidation = false;
  } else {
    document.getElementById("gendererror").innerHTML = " ";
  }
  if (terms.checked) {
    document.getElementById("checkboxerror").innerHTML = " ";
  } else {
    document.getElementById("checkboxerror").innerHTML =
      "** You must check this box";
    successfullValidation = false;
  }
  if (successfullValidation) {
    document.getElementById("contact").reset();
  }
}
