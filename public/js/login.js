const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");
const redirect = document.getElementById("rbtn");
const finalCheckobj = {};

function checkInputs() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (emailValue === "") {
    finalCheckobj.email = false;
    setErrorFor(email, "Email cannot be blank");
  } else if (!isEmail(emailValue)) {
    finalCheckobj.email = false;
    setErrorFor(email, "Not a valid email");
  } else {
    finalCheckobj.email = true;
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    finalCheckobj.password = false;
    setErrorFor(password, "Password cannot be blank");
  } else {
    finalCheckobj.password = true;
    setSuccessFor(password);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^([a-zA-Z0-9\+\_\.\-]+)@([a-zA-Z0-9\.\-]+)\.(com|net)$/.test(email);
}
