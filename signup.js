const form = document.getElementById('form');
const username = document.getElementById('username');
const realname = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const finalCheckobj = {};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
  const formValues = Object.values(finalCheckobj);
  let flag = false;
  for (const value of formValues) {
    if (value == false) {
      flag = true;
      break;
    }
  }
  if ((formValues.length = 5 && !flag)) {
    fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: realname.value,
        confirm: password2.value,
        username: username.value,
        password: password.value,
        email: email.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const nameValue = realname.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  if (usernameValue === '') {
    finalCheckobj.username = false;
    setErrorFor(username, 'Username cannot be blank');
  } else if (usernameValue.length < 4 || usernameValue.length > 30) {
    finalCheckobj.username = false;
    setErrorFor(username, 'Username must have 4-30 characters');
  } else {
    finalCheckobj.username = true;
    setSuccessFor(username);
  }

  if (nameValue === '') {
    finalCheckobj.name = false;
    setErrorFor(username, 'Name cannot be blank');
  } else if (nameValue.length < 3 || nameValue.length > 30) {
    finalCheckobj.name = false;
    setErrorFor(realname, 'Name must have 3-30 characters');
  } else {
    finalCheckobj.name = true;
    setSuccessFor(username);
  }

  if (emailValue === '') {
    finalCheckobj.email = false;
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    finalCheckobj.email = false;
    setErrorFor(email, 'Not a valid email');
  } else {
    finalCheckobj.email = true;
    setSuccessFor(email);
  }

  if (passwordValue === '') {
    finalCheckobj.password = false;
    setErrorFor(password, 'Password cannot be blank');
  } else if (!isPassword(passwordValue)) {
    finalCheckobj.password = false;
    setErrorFor(
      password,
      '8 Charters long and contains A-Z,a-z,0-9,{@$!%*#?&}'
    );
  } else {
    finalCheckobj.password = true;
    setSuccessFor(password);
  }

  if (password2Value === '') {
    finalCheckobj.password2 = false;
    setErrorFor(password2, 'Password2 cannot be blank');
  } else if (passwordValue !== password2Value) {
    console.log(password2Value);
    finalCheckobj.password2 = false;
    setErrorFor(password2, 'Passwords does not match');
  } else {
    finalCheckobj.password2 = true;
    setSuccessFor(password2);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isEmail(email) {
  return /^([a-zA-Z0-9\+\_\.\-]+)@([a-zA-Z0-9\.\-]+)\.(com|net)$/.test(email);
}
function isPassword(password) {
  return /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/.test(
    password
  );
}
