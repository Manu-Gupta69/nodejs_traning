const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');
const redirect = document.getElementById('rbtn');
const finalCheckobj = {};
redirect.addEventListener('click', () =>
  window.location.replace('http://127.0.0.1:5500/signup.html')
);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
  const flag = false;
  const values = Object.values(finalCheckobj);
  for (let value of values) {
    if (value == false) {
      flag = true;
      break;
    }
  }
  if (values.length == 2 && !flag) {
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => {
        localStorage.setItem('X-AUTH-TOKEN', res.headers.get('X-AUTH-TOKEN'));
        return res.json();
      })
      .then((data) => {
        if (!data.err) {
          window.location.replace('http://127.0.0.1:5500/profile.html');
        }
      })
      .catch((err) => console.log(err));
  }
});

function checkInputs() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

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
  } else {
    finalCheckobj.password = true;
    setSuccessFor(password);
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
